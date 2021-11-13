import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDR78-iiIrwogpsjN8Rzz0kyPFBuM9aZ3c',
  authDomain: 'project-manager-e1f39.firebaseapp.com',
  projectId: 'project-manager-e1f39',
  storageBucket: 'project-manager-e1f39.appspot.com',
  messagingSenderId: '770616754526',
  appId: '1:770616754526:web:ea9cf1d7b23c760fef4fcf',
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const timestamp = firebase.firestore.Timestamp;

export { auth, db, timestamp };
