// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
