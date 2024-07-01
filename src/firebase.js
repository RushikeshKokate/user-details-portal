// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAwnb0gKo1y-4JsnBlSxL-ebDm6p-J95K0",
  authDomain: "user-profile-management-653f6.firebaseapp.com",
  projectId: "user-profile-management-653f6",
  storageBucket: "user-profile-management-653f6.appspot.com",
  messagingSenderId: "842859376769",
  appId: "1:842859376769:web:97b6c8f686227e1e665d80",
  measurementId: "G-3TR3P39EZV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth}