// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADMVSVGmu5_mS8hGvnCIrc-o2KZ67cTwA",
  authDomain: "beyondwords-3a02f.firebaseapp.com",
  projectId: "beyondwords-3a02f",
  storageBucket: "beyondwords-3a02f.appspot.com",
  messagingSenderId: "661917297155",
  appId: "1:661917297155:web:34c244587d2880d9327c36",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
