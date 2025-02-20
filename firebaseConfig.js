// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKE1W7Z3GN-anlYHGa2CJOZ6hYIUgtoBQ",
  authDomain: "reactnativefirebaseapp-6da2b.firebaseapp.com",
  projectId: "reactnativefirebaseapp-6da2b",
  storageBucket: "reactnativefirebaseapp-6da2b.firebasestorage.app",
  messagingSenderId: "182908678803",
  appId: "1:182908678803:web:40f8a9f6f2283d244ad366",
  measurementId: "G-JH2J5MWLJN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);