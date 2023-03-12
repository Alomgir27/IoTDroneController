import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAD8-WnvHzGBplB4gkWbP25SKGKASlD21A",
  authDomain: "dronecontroler-31466.firebaseapp.com",
  projectId: "dronecontroler-31466",
  storageBucket: "dronecontroler-31466.appspot.com",
  messagingSenderId: "967737329485",
  appId: "1:967737329485:web:3747b5ba5b4c2caf189904",
  measurementId: "G-W2LCGB8945"
};


firebase.initializeApp(firebaseConfig);

export default firebase;