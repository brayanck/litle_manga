
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyCdHV4I7tclY9HjgBKePsh7CEbHPP-T2iQ",
  authDomain: "litle-manga.firebaseapp.com",
  projectId: "litle-manga",
  storageBucket: "litle-manga.appspot.com",
  messagingSenderId: "626136000517",
  appId: "1:626136000517:web:c00c38b00f2494d09dd46c",
  measurementId: "G-DF0D00F1LX"
};
  
  const firebaseApp = initializeApp(firebaseConfig);

  export default firebaseApp;


