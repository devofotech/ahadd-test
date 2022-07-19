// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
// import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAbPx_nphakqjTpgdPX_e_yN4Hdfdss2-w',
  authDomain: 'raise-285115.firebaseapp.com',
  databaseURL: 'https://raise-285115-default-rtdb.firebaseio.com',
  projectId: 'raise-285115',
  storageBucket: 'raise-285115.appspot.com',
  messagingSenderId: '879166198750',
  appId: '1:879166198750:web:919b1ca904762b5a61c34f',
  measurementId: 'G-X9L6KQ7EFF',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getDatabase();
