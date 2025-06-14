import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyBPlJCKvSZfIg5OXa7S0DmV8b5ZlqTq8rM",
authDomain: "agritech-8f5b4.firebaseapp.com",
projectId: "agritech-8f5b4",
storageBucket: "agritech-8f5b4.appspot.com",
messagingSenderId: "652371976382",
appId: "1:652371976382:web:455d6c76b827db28d37eef",
measurementId: "G-EY5EPGEBMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const firestore = getFirestore(app);