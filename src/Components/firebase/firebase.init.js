// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3CeQmu_TdztOZtH3elaJAnPcmWH7pKaI",
  authDomain: "khan-bari-fund.firebaseapp.com",
  projectId: "khan-bari-fund",
  storageBucket: "khan-bari-fund.firebasestorage.app",
  messagingSenderId: "861326923183",
  appId: "1:861326923183:web:6011f3dfe04607a13a0b5a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
