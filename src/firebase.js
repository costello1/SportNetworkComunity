// src/firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// Import the functions you need from the SDKs you need
//import { getAnalytics } from 'firebase/analytics';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAE9RBfMQJqqtfwLNwhi2fgBeqRNLMlwpk",
  authDomain: "joinsportnetwork.firebaseapp.com",
  projectId: "joinsportnetwork",
  storageBucket: "joinsportnetwork.appspot.com",
  messagingSenderId: "697471449775",
  appId: "1:697471449775:web:42a97dc65a94167c56325a",
  measurementId: "G-MTV47QWD3X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
