import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCUUP8njWn73-qIyN90oGg-ireUl2H5gd0",
    authDomain: "comp229-s24.firebaseapp.com",
    projectId: "comp229-s24",
    storageBucket: "comp229-s24.appspot.com",
    messagingSenderId: "290503028428",
    appId: "1:290503028428:web:e2e507473cf959a5221c69"
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {auth, db, storage};