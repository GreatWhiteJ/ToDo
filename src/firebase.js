import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyBSZ7NUCTYQA7wQP510iXuX0pZz-E1zJkY",
  authDomain: "authentication-b6f37.firebaseapp.com",
  databaseURL: "https://authentication-b6f37.firebaseio.com",
  projectId: "authentication-b6f37",
  storageBucket: "",
  messagingSenderId: "780615393858",
  appId: "1:780615393858:web:67c2a797d096e5516483db"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();
