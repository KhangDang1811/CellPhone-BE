import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBj6U0qppRSpnWyvaUHHVpo5rMpnF4MOSk",
  authDomain: "facebook-ee822.firebaseapp.com",
  projectId: "facebook-ee822",
  storageBucket: "facebook-ee822.appspot.com",
  messagingSenderId: "179607943016",
  appId: "1:179607943016:web:acc7db2332740b624888dd",
  measurementId: "G-TDW6V19JZQ"
};

// Initialize Firebase
const app =  initializeApp(firebaseConfig);
export const authentications = getAuth(app);



