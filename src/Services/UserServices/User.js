import {
  Timestamp,
  addDoc,
  collection,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../Firebase/firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
export const getAllUsers = async () => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    temp.push({
      data: doc.data(),
      id: doc.id,
    });
  });
  return temp;
};
export const getAllClients = async () => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "client"));
  querySnapshot.forEach((doc) => {
    temp.push({
      data: doc.data(),
      id: doc.id,
    });
  });
  return temp;
};
// export const deleteUserByUid = async (id) => {
//   await deleteDoc(doc(db, "users", id));
// };

export const deleteUserByUid = async (id, val) => {
  const userDocRef = doc(db, "users", id);

  try {
    await updateDoc(userDocRef, {
      isShow: val, // Set isShow to false
    });

    console.log(`User with ID ${id} show status updated successfully.`);
  } catch (error) {
    console.error("Error updating user show status:", error);
    // Handle error appropriately (e.g., show error message to user)
  }
};

export const updateUserDoc = async (item) => {
  const washingtonRef = doc(db, "users", item.id);

  await updateDoc(washingtonRef, item.data);
};

//services
export const fetchUserName = async (providerId) => {
  try {
    const userDocRef = doc(db, "users", providerId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      return userData.name;
    } else {
      return "Unknown";
    }
  } catch (error) {
    console.error("Error fetching username:", error);
    return "Unknown";
  }
};
export const getServices = async () => {
  const collectionRef = collection(db, "service");
  const docData = await getDocs(collectionRef);

  const data = docData.docs.map(async (doc) => {
    const docData = doc.data();
    const username = await fetchUserName(docData.providerId);
    return { ...docData, username };
  });
  return Promise.all(data);
};

export const getAllDataDashboard = async () => {
  try {
    // Array to store collection data
    const collectionData = {};

    // Array of collection names
    const collectionNames = [
      "service",
      "users",
      "client",
      "remainder",
      "notification",
      "invoice",
    ];

    // Iterate over each collection name
    for (const collectionName of collectionNames) {
      // Reference to the collection
      const collectionRef = collection(db, collectionName);

      // Get documents in the collection
      const querySnapshot = await getDocs(collectionRef);

      // Count the number of documents in the collection
      const totalCount = querySnapshot.size;

      // Push collection data to the array
      collectionData[collectionName] = totalCount;
    }

    // Return the collection data array
    return collectionData;
  } catch (error) {
    console.error("Error fetching collection data:", error);
    throw error;
  }
};

export const getAllRemainders = async () => {
  const collRef = collection(db, "remainder");
  try {
    const docRef = await getDocs(collRef);
    const docData = docRef.docs.map(async (document) => {
      let clientName = "Unknown"; // Initialize clientName

      // Check if clientId is not null
      if (document.data().clientId) {
        const docc1 = await getDoc(doc(db, "client", document.data().clientId));
        clientName = docc1.data().firstName; // Assign clientName if clientId is not null
      }

      const id = document.data().providerId;
      const userDocRef = doc(db, "users", id);
      const userDocSnap = await getDoc(userDocRef);

      return {
        ...document.data(),
        clientName: clientName,
        sellerName: userDocSnap.data().name,
      };
    });

    return Promise.all(docData);
  } catch (error) {
    return error;
  }
};

export const createRemainder = async (form) => {
  const collRef = collection(db, "remainder");
  try {
    const resp = addDoc(collRef, {
      clientId: form.clientId,
      date: Timestamp.now(),
      description: form.description,
      providerId: form.sellerId,
    });
    return resp;
  } catch (error) {
    return error;
  }
};
