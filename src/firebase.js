// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCx_zfV5TibAd5QeADJnC6mzKnh1tT9eVg",
    authDomain: "chat-app-6f5b3.firebaseapp.com",
    projectId: "chat-app-6f5b3",
    storageBucket: "chat-app-6f5b3.appspot.com",
    messagingSenderId: "638317673292",
    appId: "1:638317673292:web:0a93832b338eda5c7bade9"
  };
  
  // Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();