import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBRBq6gYnuf2gmjF_hxBvy6CtqsVNvNH04",
    authDomain: "react-to-do-app-b1329.firebaseapp.com",
    projectId: "react-to-do-app-b1329",
    storageBucket: "react-to-do-app-b1329.appspot.com",
    messagingSenderId: "403952486832",
    appId: "1:403952486832:web:fa823c2927c0df57756e75",
    measurementId: "G-CHFLYCJ8Y6"
  };
  
  const app = initializeApp(firebaseConfig);
  const firestore=getFirestore(app);