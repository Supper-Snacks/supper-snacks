// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getMessaging } from "firebase/messaging";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
    REACT_APP_apiKey,
    REACT_APP_authDomain,
    REACT_APP_projectId,
    REACT_APP_storageBucket,
    REACT_APP_messagingSenderId,
    REACT_APP_appId,
    REACT_APP_measurementId,
} from '@env';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: REACT_APP_apiKey,
    authDomain: REACT_APP_authDomain,
    projectId: REACT_APP_projectId,
    storageBucket: REACT_APP_storageBucket,
    messagingSenderId: REACT_APP_messagingSenderId,
    appId: REACT_APP_appId,
    measurementId: REACT_APP_measurementId,
};

// Initialize Firebase
// https://firebase.google.com/docs/web/setup
// https://docs.expo.dev/guides/using-firebase/
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);
//const messaging = getMessaging(app);
//messaging.getToken({vapidKey: "BDGGnJytH87x6d886c7RfRvftpPViuXWxHb4ev9rGP72YuvmvuXCJ7XxaPDsFo9_IX7JlTGSvByeifflY6DOpHM"});

export { auth, db, };
