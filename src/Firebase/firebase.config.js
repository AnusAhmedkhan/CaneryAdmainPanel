// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAbWNX60ifX5rdVUcabmcmfGykN459KsQ4",
  authDomain: "canery-778fa.firebaseapp.com",
  projectId: "canery-778fa",
  storageBucket: "canery-778fa.appspot.com",
  messagingSenderId: "961311958716",
  appId: "1:961311958716:web:0a1bb1d4937d17fc7ad2b9",
  measurementId: "G-QHC8GM1PB6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
