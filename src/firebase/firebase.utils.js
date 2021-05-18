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

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title, 
      items
    };
  });
  //TODO: Study what this does exactly. 
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {})
};



if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
};

// check if their is a user then immediatly unsubscribe 
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth)
    }, reject)
  });
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;