// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTmokpWRq5JEWxfVNohreYJ5eEpdmWI3Q",
  authDomain: "the-shopkeeper-abe38.firebaseapp.com",
  projectId: "the-shopkeeper-abe38",
  storageBucket: "the-shopkeeper-abe38.appspot.com",
  messagingSenderId: "654218568811",
  appId: "1:654218568811:web:5f77b8b2095d9f0a69fd2e",
  measurementId: "G-T1EE8BE0X0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);