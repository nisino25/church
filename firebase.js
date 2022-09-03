import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


const firebaseConfig = {
  apiKey: "AIzaSyCCmiqhoC4t-EfCF8S6We_Vmdo1n7rLraA",
  authDomain: "church-77077.firebaseapp.com",
  projectId: "church-77077",
  storageBucket: "church-77077.appspot.com",
  messagingSenderId: "1004976784692",
  appId: "1:1004976784692:web:b7f9691825348570a51161",
  measurementId: "G-PQ1XFZMLSZ"
};
 
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export default db;