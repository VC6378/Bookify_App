import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithPopup,

    GoogleAuthProvider,
    signOut,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCuPiaLCldNXdJks2K8gryqy1n8LzNdNsM",
    authDomain: "bookify-aa958.firebaseapp.com",
    projectId: "bookify-aa958",
    storageBucket: "bookify-aa958.appspot.com",
    messagingSenderId: "724717587008",
    appId: "1:724717587008:web:4354d795623cfaef806da5"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);

const provider = new GoogleAuthProvider();
const FirebaseContext = createContext(null);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
    const signupUserWithEmailAndPassword = (email, password) => {
        createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                alert("Successfully signed up")
            })
            .catch((err) => {
                if (err.code === "auth/email-already-in-use") {
                    alert("Email already in use");
                }
                console.log(err);
            });
    };

    const signIn = (email, password) => {
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                alert("Successfully signed in");
            })
            .catch((err) => {
                alert("Invalid email or password");
            });
    };

    const signInWithGoogle = () => {

        signInWithPopup(firebaseAuth, provider)
            .then((userCredential) => {
                alert("Successfully signed in");
            })
            .catch((err) => {
                alert(err);
            });
    };

    const signout = () => {
        signOut(firebaseAuth)
            .then((userCredential) => {
                alert("Successfully signed out");
            })
            .catch((err) => {
                alert(err);
            });
    };

    const makeSubCollection = async (userId, newBook) => {
        const bookCollectionRef = collection(db, "books/" + userId);
        addDoc(bookCollectionRef, newBook);
    }

    return (
        <>
            <FirebaseContext.Provider
                value={{
                    signupUserWithEmailAndPassword,
                    signInWithGoogle,
                    signout,
                    signIn,
                    makeSubCollection,

                }}
            >
                {props.children}
            </FirebaseContext.Provider>
        </>
    );
};