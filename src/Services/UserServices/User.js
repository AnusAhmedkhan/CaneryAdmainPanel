import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase.config";
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
