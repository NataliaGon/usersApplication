import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyAJuNO0AZpb_pKbBPMXIzEgno4iJMQHq40",
    authDomain: "user-226b9.firebaseapp.com",
    databaseURL: "https://user-226b9.firebaseio.com",
    projectId: "user-226b9",
    storageBucket: "user-226b9.appspot.com",
    messagingSenderId: "8824259312"
  };

export default firebase.initializeApp(config);
export const firebaseDatabaseUsersRef = firebase.database().ref('users');


