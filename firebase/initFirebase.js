import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA8n1xuB7BxHAuGxePeWz1CDLjk8x5Ps9k",
  authDomain: "trivia-app-764e4.firebaseapp.com",
  projectId: "trivia-app-764e4",
  storageBucket: "trivia-app-764e4.appspot.com",
  messagingSenderId: "550098693379",
  appId: "1:550098693379:web:8a0c582e4065dc47224d36",
  measurementId: "G-C22GVVLLVN",
};

export default function initFirebase() {
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  console.log("firebase successfully initialized");
  return firebase;
}
