import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCQt27zF0DS_f8VLEbvAChiB178ngAIGtc",
  authDomain: "todo-9bc80.firebaseapp.com",
  databaseURL: "https://todo-9bc80.firebaseio.com",
  projectId: "todo-9bc80",
  storageBucket: "todo-9bc80.appspot.com",
  messagingSenderId: "479724294146",
  appId: "1:479724294146:web:30861848fff457d50b971b"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
