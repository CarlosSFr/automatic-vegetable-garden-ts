import { initializeApp } from "firebase/app"
import { getDatabase, ref, onValue } from "firebase/database"
import { getAuth } from "firebase/auth"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyDXcJgq_AMT5vlylZS2_rliSZ1r9xT18xw",
    authDomain: "automatic-garden-824cc.firebaseapp.com",
    databaseURL: "https://automatic-garden-824cc-default-rtdb.firebaseio.com",
    projectId: "automatic-garden-824cc",
    storageBucket: "automatic-garden-824cc.appspot.com",
    messagingSenderId: "290415846546",
    appId: "1:290415846546:web:58e21b91641b094090724b"
};

//Initialize firebase
const FIREBASE_APP = initializeApp(firebaseConfig);
const db = getDatabase(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export { db, ref, onValue };
