import firebase from 'firebase/app';
import 'firebase/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyAmSz95s0ztqBp0-VgvXpFmcaGcE3Lt1pA",
  authDomain: "nextplaylink.firebaseapp.com",
  projectId: "nextplaylink",
  storageBucket: "nextplaylink.appspot.com",
  messagingSenderId: "299190070422",
  appId: "1:299190070422:web:dd61377ec220ca23cfe6b7",
  measurementId: "G-376W3QMYFQ"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
  // firebase.analytics();