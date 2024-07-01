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
import axios from "axios";
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

export const getAllRequests = async () => {
  let temp = [];
  const querySnapshot = await getDocs(collection(db, "withdrwalRequests"));
  querySnapshot.forEach((doc) => {
    temp.push({
      data: doc.data(),
      id: doc.id,
    });
  });
  // console.log(temp, "temp");
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

export const getAllInvoices = async () => {
  const collRef = collection(db, "invoice");
  try {
    const docRef = await getDocs(collRef);
    const docData = docRef.docs.map(async (document) => {
      const id = document.data().providerId;
      const userDocRef = doc(db, "users", id);
      const userDocSnap = await getDoc(userDocRef);

      return {
        ...document.data(),

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

export const handleRequest = async (amount, userId, docId, rejectRequest) => {
  const userDocRef = doc(db, "users", userId);
  const requestDocRef = doc(db, "withdrwalRequests", docId);

  try {
    // Fetch user and request documents
    const [userDocSnap, requestDocSnap] = await Promise.all([
      getDoc(userDocRef),
      getDoc(requestDocRef),
    ]);

    if (!userDocSnap.exists()) {
      return {
        message: `User document with ID ${userId} does not exist.`,
        status: "error",
        statusCode: 404,
      };
    }
    if (!requestDocSnap.exists()) {
      return {
        message: `Request document with ID ${docId} does not exist.`,
        status: "error",
        statusCode: 404,
      };
    }

    // Handle request rejection
    if (rejectRequest) {
      await updateDoc(requestDocRef, { status: "rejected" });
      return {
        message: "Request rejected",
        status: "rejected",
        statusCode: 200,
      };
    }

    // Proceed with sending money
    try {
      const response = await axios.post(
        "https://www.canery.io:5000/vendor/connect/sendMoney",
        {
          amount: amount,
          accountId: userDocSnap.data().accountId,
        }
      );

      // Update the request status to "approved"
      const updatedAmount = userDocSnap.data().wallet - amount;
      await updateDoc(userDocRef, { wallet: updatedAmount });
      await updateDoc(requestDocRef, { status: "approved" });
      return {
        message: "Request approved and Money Sent",
        status: "approved",
        statusCode: 200,
      };
    } catch (axiosError) {
      // Update request status to "rejected" if the Axios request fails
      await updateDoc(requestDocRef, { status: "rejected" });
      return {
        message: "Either you have no money admin or account is not verified",
        status: "rejected",
        statusCode: 400,
      };
    }
  } catch (error) {
    console.error("Error handling request:", error);
    // Update request status to "rejected" if the overall process fails
    try {
      await updateDoc(requestDocRef, { status: "rejected" });
    } catch (updateError) {
      console.error("Error updating request status to rejected:", updateError);
    }
    return { message: error.message, status: "error", statusCode: 500 };
  }
};
