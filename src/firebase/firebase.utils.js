import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyAqyZ-rtLkw_2U_WtjyjIHaH3SA_nM2v04",
    authDomain: "crwn-db-81134.firebaseapp.com",
    projectId: "crwn-db-81134",
    storageBucket: "crwn-db-81134.appspot.com",
    messagingSenderId: "648033175982",
    appId: "1:648033175982:web:f683a3829b93e4f9bd603f",
    measurementId: "G-P289VN3VP4"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    // if the spanshot does not exit, we are creating new data -> new user using the data from the userAuth
    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
        await userRef.set({
            displayName,
            email,
            createdAt,
            ...additionalData
        });
        } catch (error) {
        console.log('error creating user', error.message);
        }
    }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;