import firebase from "firebase/compat/app";
import { getAuth } from 'firebase/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHK6x7EyyT8S0e3FPwoLNN6NjlqdjuGlY",
  authDomain: "clone-93b3c.firebaseapp.com",
  projectId: "clone-93b3c",
  storageBucket: "clone-93b3c.firebasestorage.app",
  messagingSenderId: "58508326361",
  appId: "1:58508326361:web:93e2828f7ae3f5bfaf95c8",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore()
