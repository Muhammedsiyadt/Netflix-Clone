
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAvGhdpIAQcscMdOVgLyqadYynUyYysw8A",
  authDomain: "netflix-clone-3a1fe.firebaseapp.com",
  projectId: "netflix-clone-3a1fe",
  storageBucket: "netflix-clone-3a1fe.appspot.com",
  messagingSenderId: "510733082639",
  appId: "1:510733082639:web:3963704caa9d12bc6b437a"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

const db = getFirestore(app)

const signUp = async (name,email,password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "))
        
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" ")) 
    }
}

const logout = () => {
    signOut(auth) 
}

export  {auth, db, login, signUp, logout}