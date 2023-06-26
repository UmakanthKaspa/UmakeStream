import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBlWyWi807P02xRUxLdvyAtcmr2g-kQPbc",
    authDomain: "react-netflix-clone-d2d65.firebaseapp.com",
    projectId: "react-netflix-clone-d2d65",
    storageBucket: "react-netflix-clone-d2d65.appspot.com",
    messagingSenderId: "212251581787",
    appId: "1:212251581787:web:1aea7a2e0ce850a85ace7e",
    measurementId: "G-QBTWXM9C80"
  };

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);