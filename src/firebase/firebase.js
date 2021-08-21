import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCndscRL87UCxx4-gZb8Ydp3kzncfSm0M4",
  authDomain: "vue-music-d21c5.firebaseapp.com",
  projectId: "vue-music-d21c5",
  storageBucket: "vue-music-d21c5.appspot.com",
  messagingSenderId: "445299278037",
  appId: "1:445299278037:web:c4d461cf822779eeeba25c",
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();
const usersCollection = db.collection('users');
const songsCollection = db.collection('songs');

export {
  auth,
  db,
  storage,
  usersCollection,
  songsCollection,
};
