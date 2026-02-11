
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
const firebaseConfig = {
  apiKey: "AIzaSyCEddJiL2uBgpFqnODAtNcgChES6p4hwm8",
  authDomain: "bitehub-885a7.firebaseapp.com",
  projectId: "bitehub-885a7",
  storageBucket: "bitehub-885a7.firebasestorage.app",
  messagingSenderId: "1044543460131",
  appId: "1:1044543460131:web:a6747f57972c0b4447f296",
  measurementId: "G-TNFRKPT6RQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 

export { db };