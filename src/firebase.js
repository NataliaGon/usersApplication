import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyBwwffZl09OqzQvu9GtOynqibef2Qh8dXc',
  authDomain: 'test-db-e095e.firebaseapp.com',
  databaseURL: 'https://test-db-e095e.firebaseio.com',
  projectId: 'test-db-e095e',
  storageBucket: 'test-db-e095e.appspot.com',
  messagingSenderId: '182747176288'
};

firebase.initializeApp(config);

export default firebase;

