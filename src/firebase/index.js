import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDl89cqH7DKQ_cMAu9T6eKHNSNxC2ULul4",
  authDomain: "setup-465ff.firebaseapp.com",
  projectId: "setup-465ff",
  storageBucket: "setup-465ff.firebasestorage.app",
  messagingSenderId: "204883233343",
  appId: "1:204883233343:web:0c9bd5fb9e7a8ea541868a"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
