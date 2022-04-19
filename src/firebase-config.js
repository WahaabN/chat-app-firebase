// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKpSEcKATVyHR6oFQXyP9yz8WQtfh6dq4",
  authDomain: "chat-app-678c7.firebaseapp.com",
  projectId: "chat-app-678c7",
  storageBucket: "chat-app-678c7.appspot.com",
  messagingSenderId: "213383653560",
  appId: "1:213383653560:web:27446f03e67802428fac4d",
  measurementId: "G-ES5NDQRZ5T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);