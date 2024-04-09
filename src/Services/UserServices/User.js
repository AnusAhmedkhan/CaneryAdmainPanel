import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase.config";
import { doc, deleteDoc } from "firebase/firestore";
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
