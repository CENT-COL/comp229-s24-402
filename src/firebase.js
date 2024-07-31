// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUUP8njWn73-qIyN90oGg-ireUl2H5gd0",
  authDomain: "comp229-s24.firebaseapp.com",
  projectId: "comp229-s24",
  storageBucket: "comp229-s24.appspot.com",
  messagingSenderId: "290503028428",
  appId: "1:290503028428:web:0d78e82de996a53e221c69"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

export {auth, db, storage};