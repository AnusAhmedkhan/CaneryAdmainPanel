import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase.config";

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
export const deleteClientByUid = async (id, val) => {
  const userDocRef = doc(db, "client", id);

  try {
    await updateDoc(userDocRef, {
      isShow: val,
    });

    console.log(`User with ID ${id} show status updated successfully.`);
  } catch (error) {
    console.error("Error updating user show status:", error);
  }
};

export const updateClientDoc = async (item) => {
  const washingtonRef = doc(db, "client", item.id);

  await updateDoc(washingtonRef, item.data);
};
