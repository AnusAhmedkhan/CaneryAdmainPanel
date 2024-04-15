import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../Firebase/firebase.config";

export const adminLogin = async (email, password) => {
  const collectRef = collection(db, "admin");
  const adminQuery = query(
    collectRef,
    where("email", "==", email),
    where("pass", "==", password)
  );
  try {
    const doc = await getDocs(adminQuery);
    if (doc.size === 1) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error, "error");
    return false;
  }
};
