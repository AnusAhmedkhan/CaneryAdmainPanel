import { collection, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
export const getAllUsers = async () => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    temp.push({
      data: doc.data(),
      id: doc.id,
    });
  });
  return temp;
};

export const deleteUserByUid = async (id) => {
  await deleteDoc(doc(db, "users", id));
};

export const updateUserDoc = async (item) => {
  const washingtonRef = doc(db, "users", item.id);

  await updateDoc(washingtonRef, item.data);
};

//services
const fetchUserName = async (providerId) => {
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
