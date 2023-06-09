// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpcJE-eTq93yrzeXaHCIrx2CvOGzGseVU",
  authDomain: "events-8639b.firebaseapp.com",
  projectId: "events-8639b",
  storageBucket: "events-8639b.appspot.com",
  messagingSenderId: "154041916580",
  appId: "1:154041916580:web:5b17247883107505545a31",
  databaseURL: "https://events-8639b-default-rtdb.europe-west1.firebasedatabase.app",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const database = getDatabase(app);
