// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKyq8w6V3cQyVTVOj0dLl05AleVKULlrM",
  authDomain: "donate-for-people.firebaseapp.com",
  projectId: "donate-for-people",
  storageBucket: "donate-for-people.firebasestorage.app",
  messagingSenderId: "153268468202",
  appId: "1:153268468202:web:d4371959adb52862da1a93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;