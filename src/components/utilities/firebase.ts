// Import the functions you need from the SDKs you need
import {
  getAuth,
  signOut,
  updateProfile,
  getRedirectResult,
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQtYZHU5VWQq7EnODzBM1oOJnzKu2vpf8",
  authDomain: "photo-tagging-app-3344.firebaseapp.com",
  projectId: "photo-tagging-app-3344",
  storageBucket: "photo-tagging-app-3344.appspot.com",
  messagingSenderId: "31059841854",
  appId: "1:31059841854:web:af60d2f0d5a9550a5d526f",
  measurementId: "G-JK0VXYS143",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (err) {
    console.error(err);
  }
};

const signInWithFacebook = async () => {
  try {
    const res = await getRedirectResult(auth);

    // Used in getting facebook profile picture
    const credential = FacebookAuthProvider.credentialFromResult(res!);
    const token = credential?.accessToken;
    let photoUrl = res?.user.photoURL + "?height=500&access_token=" + token;
    if (auth.currentUser)
      await updateProfile(auth.currentUser, { photoURL: photoUrl });
  } catch (err) {
    console.error(err);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert("User Not Found");
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
  }
};

const logout = () => {
  signOut(auth);
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithFacebook,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
