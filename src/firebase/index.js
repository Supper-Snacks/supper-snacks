// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
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

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.sendNotificationToTopic = functions.firestore.document('puppies/{uid}').onWrite(async (event) => {
    //let docID = event.after.id;
    let title = event.after.get('title');
    let content = event.after.get('content');
    var message = {
        notification: {
            title: title,
            body: content,
        },
        topic: 'namelesscoder',
    };

    let response = await admin.messaging().send(message);
    console.log(response);
});

exports.sendNotificationToFCMToken = functions.firestore.document('messages/{mUid}').onWrite(async (event) => {
    const uid = event.after.get('userUid');
    const title = event.after.get('title');
    const content = event.after.get('content');
    let userDoc = await admin.firestore().doc(`users/${uid}`).get();
    let fcmToken = userDoc.get('fcm');

    var message = {
        notification: {
            title: title,
            body: content,
        },
        token: fcmToken,
    }

    let response = await admin.messaging().send(message);
    console.log(response);
});

export { auth, db };
