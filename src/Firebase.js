import { firebase } from "@firebase/app";
import "@firebase/firestore";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC61AXsUVp7pI_yMiFOf7aTE0sf9RHkIUk",
  authDomain: "axphd-combinazioni-bd807.firebaseapp.com",
  databaseURL: "https://axphd-combinazioni-bd807.firebaseio.com",
  projectId: "axphd-combinazioni-bd807",
  storageBucket: "axphd-combinazioni-bd807.appspot.com",
  messagingSenderId: "387056493961"
});

export const db = firebaseApp.firestore();
