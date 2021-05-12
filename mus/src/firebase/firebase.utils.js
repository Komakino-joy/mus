import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBsNmhm_e8BlIcD-xMPde5IMSfzsPuEnu4",
    authDomain: "mus-shop-db.firebaseapp.com",
    projectId: "mus-shop-db",
    storageBucket: "mus-shop-db.appspot.com",
    messagingSenderId: "1050618654548",
    appId: "1:1050618654548:web:5d16f6d08afa7c7c3ee2c1"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
//TODO: select_account will always trigger the google popup when we sign in.
//TODO: signInWithPopup is where we can choose 'Facebook, Twitter, Github, etc.', after enabling it in firebase site
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;