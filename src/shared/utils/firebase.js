import firebase from "firebase/app";
import "firebase/auth";
import config from "../../config";

const firebaseApp = firebase.initializeApp(config.firebase);

const fireAuth = firebaseApp.auth();

const fireRegister = (email, password) => {
  if (email && password) {
    return firebaseApp.auth().createUserWithEmailAndPassword(email, password);
  }
};

const fireLogin = (email, password) => {
  if (email && password) {
    return firebaseApp.auth().signInWithEmailAndPassword(email, password);
  }
};

const fireLogout = () => firebaseApp.auth().signOut();

export { fireAuth, fireRegister, fireLogin, fireLogout };
