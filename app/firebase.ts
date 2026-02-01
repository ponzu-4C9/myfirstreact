// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxxclaxrLmbsxFsUv1PXH5KlzyEXHttDs",
  authDomain: "react-txtsave.firebaseapp.com",
  projectId: "react-txtsave",
  storageBucket: "react-txtsave.firebasestorage.app",
  messagingSenderId: "916204874238",
  appId: "1:916204874238:web:a25f1cb37433390f58b8af",
  measurementId: "G-R1843M9BPM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);