import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyA8J6tN30jJye-5Cj8yODtvm3cDOvznUxQ",
  authDomain: "react-todo-app-b3cc7.firebaseapp.com",
  projectId: "react-todo-app-b3cc7",
  storageBucket: "react-todo-app-b3cc7.appspot.com",
  messagingSenderId: "936912445266",
  appId: "1:936912445266:web:f6a86513280eb3c34ae48b",
  measurementId: "G-SSPJRKNWYD"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();


export default db;
export { auth, provider };