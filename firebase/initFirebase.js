import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: proccess.env.API_KEY,
  authDomain: proccess.env.AUTH_DOMAIN,
  projectId: proccess.env.PROJECT_ID,
  storageBucket: proccess.env.STORAGE_BUCKET,
  messagingSenderId: proccess.env.MESSAGING_SENDER_ID,
  appId: proccess.env.APP_ID,
  measurementId: proccess.env.MEASUREMENT_ID,
};

export default function initFirebase() {
  // Initialize Firebase
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  return firebase;
}
