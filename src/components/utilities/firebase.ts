import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";

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
const signInWithGoogle = async (
  setUserData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      profileUrl: string;
    }>
  >
) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    if (user.displayName && user.photoURL) {
      setUserData({
        name: user?.displayName,
        profileUrl: user?.photoURL,
      });
    }
  } catch (err) {
    console.error(err);
  }
};

const facebookProvider = new FacebookAuthProvider();
const signInWithFacebook = async (
  setUserData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      profileUrl: string;
    }>
  >
) => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;

    // Used in getting facebook profile picture
    const credential = FacebookAuthProvider.credentialFromResult(res);
    const token = credential?.accessToken;
    let photoUrl = res.user.photoURL + "?height=500&access_token=" + token;

    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { photoURL: photoUrl });

      if (user.displayName && user.photoURL) {
        setUserData({
          name: user?.displayName,
          profileUrl: user?.photoURL,
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const logInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      name,
      email,
      uid: user.uid,
      authProvider: "local",
    });
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
  db,
  auth,
  logout,
  signInWithGoogle,
  sendPasswordReset,
  signInWithFacebook,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
};
