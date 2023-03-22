// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjjF0yJ23Lqaa9FuuZJ_PvWJmBRwaRq2I",
  authDomain: "hawke-inventory.firebaseapp.com",
  projectId: "hawke-inventory",
  storageBucket: "hawke-inventory.appspot.com",
  messagingSenderId: "522626125556",
  appId: "1:522626125556:web:221ee18da929cc1f5558a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };