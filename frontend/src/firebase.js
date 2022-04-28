import { initializeApp } from "firebase/app"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBrwDvGtp_yHXy28JfhuvXdvXdCYvw8VPk",
    authDomain: "splitit-9bf30.firebaseapp.com",
    databaseURL: "https://splitit-9bf30-default-rtdb.firebaseio.com",
    projectId: "splitit-9bf30",
    storageBucket: "splitit-9bf30.appspot.com",
    messagingSenderId: "666696492061",
    appId: "1:666696492061:web:66aeb86f2cfe50833912f4",
    measurementId: "G-0G5TCLKYNS"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export {db}