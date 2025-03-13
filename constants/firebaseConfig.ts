import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "YAIzaSyAUcz8nnRZ3Y-DV0NVItAdzPa-tlnyGHf4",
  authDomain: "skill-test-mittraphaptech.firebaseapp.com",
  databaseURL: "https://skill-test-mittraphaptech-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "skill-test-mittraphaptech",
  storageBucket: "skill-test-mittraphaptech.firebasestorage.app",
  messagingSenderId: "729879601365",
  appId: "1:729879601365:web:ad364355ebe591e2a4025c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
