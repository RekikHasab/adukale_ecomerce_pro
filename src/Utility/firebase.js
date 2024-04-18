import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaWHlB3liAd2_ZF1HQ1rDsNQv_OkUSA1c",
  authDomain: "adukale-ecommerce.firebaseapp.com",
  projectId: "adukale-ecommerce",
  storageBucket: "adukale-ecommerce.appspot.com",
  messagingSenderId: "394761814886",
  appId: "1:394761814886:web:c43bdaa1a666e806fafea7"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore();