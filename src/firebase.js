import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyABGBOJYWy2i6UqguSvezhPs_kDeE_0iIE",
    authDomain: "mypro-4c526.firebaseapp.com",
    projectId: "mypro-4c526",
    storageBucket: "mypro-4c526.appspot.com",
    messagingSenderId: "536749827413",
    appId: "1:536749827413:web:9fd14b118cafe2caec7bdc",
    measurementId: "G-EV98MWCFZN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };