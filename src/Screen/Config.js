// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyA2gHdjP8rAJZcnB-PIONnF9ZfGP0AIlCY',
  authDomain: 'learn-react-native-dee20.firebaseapp.com',
  databaseURL: 'https://learn-react-native-dee20-default-rtdb.firebaseio.com',
  projectId: 'learn-react-native-dee20',
  storageBucket: 'learn-react-native-dee20.appspot.com',
  messagingSenderId: '52184306944',
  appId: '1:52184306944:web:2ab511895262af459e4fe5',
  measurementId: 'G-L6EQQKLN3C',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
