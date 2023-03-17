// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzM8-Nj-AZfhRd69X_WH60pOiFrNcKllk",
  authDomain: "filmyflix-898c9.firebaseapp.com",
  projectId: "filmyflix-898c9",
  storageBucket: "filmyflix-898c9.appspot.com",
  messagingSenderId: "360696824129",
  appId: "1:360696824129:web:75daf9ee0d8aef75a121c0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const moviesRef =collection(db, "movies");
export const reviewsRef =collection(db, "reviews");
export const usersRef =collection(db, "users");

export default app;