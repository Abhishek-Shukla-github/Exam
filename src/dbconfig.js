import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDVSbAH5dFH5K10mSmNkkcGODluqh2js4I",
  authDomain: "examnet-2cbd6.firebaseapp.com",
  projectId: "examnet-2cbd6",
  storageBucket: "examnet-2cbd6.appspot.com",
  messagingSenderId: "434305281262",
  appId: "1:434305281262:web:f41c46a93f575c7300d7ff",
  measurementId: "G-B4PBSWJVH3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();
// const analytics = getAnalytics(app);
export {auth};
export default db;




