import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

export const firebaseAuth = firebase.auth;

const firebaseConfig = {
  apiKey: "AIzaSyC7CO7EpQtxL0QqiHY0z5roVDorj-pfOKo",
  authDomain: "makanpe-23a59.firebaseapp.com",
  databaseURL:
    "https://makanpe-23a59-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "makanpe-23a59",
  storageBucket: "makanpe-23a59.appspot.com",
  messagingSenderId: "1080546573798",
  appId: "1:1080546573798:web:2e192444d12076c03aea27",
  measurementId: "G-1SK4N6NRBQ",
};

const firebaseApp = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export default firebaseApp;
