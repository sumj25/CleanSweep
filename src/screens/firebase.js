// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDycbzeEG27munJueQtLa72WDWrbfor_c0",
  authDomain: "cleansweep-60458.firebaseapp.com",
  projectId: "cleansweep-60458",
  storageBucket: "cleansweep-60458.appspot.com",
  messagingSenderId: "428174592230",
  appId: "1:428174592230:web:ddf9b90f74ba5cd2999327",
  measurementId: "G-VMPNDPF1M4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
