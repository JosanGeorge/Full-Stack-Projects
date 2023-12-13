import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAEaU0aamfuZN9VAHCSQH4mtuOtplO-TXk",
    authDomain: "todo-app-e61e0.firebaseapp.com",
    projectId: "todo-app-e61e0",
    storageBucket: "todo-app-e61e0.appspot.com",
    messagingSenderId: "1042987551188",
    appId: "1:1042987551188:web:a07f8a34a458ae8f1aae41",
    measurementId: "G-KT55WL3PH8"
})

const db = firebaseApp.firestore();

export default db;