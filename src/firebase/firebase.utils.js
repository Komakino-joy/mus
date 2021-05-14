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

export const createUserProfileDocument = async(userAuth, additionalData) => {
  
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if(!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    //TODO: checking if user exists, if not create new user object in collections.
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    }catch (error) {
      console.log('error creating user', error.message)
    };
  };

  return userRef;
};

//^ adding our new collections to the DB
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) =>{
  const collectionRef = firestore.collection(collectionKey);

  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  });

  return await batch.commit();
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
//TODO: select_account will always trigger the google popup when we sign in.
//TODO: signInWithPopup is where we can choose 'Facebook, Twitter, Github, etc.', after enabling it in firebase site
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;