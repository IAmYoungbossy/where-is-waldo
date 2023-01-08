import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, listAll, ref } from "firebase/storage";
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
import {
  query,
  where,
  addDoc,
  getDocs,
  collection,
  getFirestore,
} from "firebase/firestore";

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
const storage = getStorage(app);

const getImageURL = async (
  folderName: string,
  setUrlList: (
    URLList: {
      name: string;
      url: string;
    }[]
  ) => void
) => {
  try {
    // Create a reference under which you want to list
    const listRef = ref(storage, folderName);
    const list = await listAll(listRef);
    // let listArray: { name: string; url: string }[] = [];
    const imageURL = list.items.map((itemRef) =>
      // This is array with image name and URL
      (async () => {
        // Gets image URL
        const url = await getDownloadURL(ref(storage, itemRef.fullPath));
        // Gets just the name without its extension
        const name = itemRef.name.split(".")[0];
        // Image name and URL
        const listArray = { name, url };
        return listArray;
      })()
    );
    // Gets all url
    const URLList = await Promise.all(imageURL);
    setUrlList(URLList);
  } catch (error) {
    console.log(error);
  }
};

const getHiddenFolksURL = async () => {
  try {
    // Create a reference under which you want to list
    const listRef = ref(storage, "console-folks");
    const list = await listAll(listRef);
    const imageURL = list.prefixes.map((itemRef) =>
      // This is array with image name and URL
      (async () => {
        const gameImageName = itemRef.name;
        const getCardImages = async () => {
          const listRef = ref(storage, `${itemRef.fullPath}`);
          const list = await listAll(listRef);
          const folkURL = list.items.map((item) =>
            (async () => {
              const url = await getDownloadURL(ref(storage, item.fullPath));
              const name = item.name.split(".")[0];
              return { Name: name, url };
            })()
          );
          return await Promise.all(folkURL);
        };
        return {
          Card: gameImageName,
          Folks: await getCardImages(),
        };
      })()
    );
    // Gets all url
    const URLList = await Promise.all(imageURL);
    console.log(URLList);
  } catch (error) {
    console.log(error);
  }
};

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

const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  setUserData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      profileUrl: string;
    }>
  >
) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;
    getHiddenFolksURL();
    // Since this is local sign in, name was saved to firebase database
    // during registration so we query for that name here.
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    const name = data.name;

    // Photo will be null since it wasn't required during sign in.
    let avatar = user.photoURL;
    if (avatar === null) avatar = "";

    setUserData({
      name: name,
      profileUrl: avatar,
    });
  } catch (err) {
    console.error(err);
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
  setUserData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      profileUrl: string;
    }>
  >
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // Stores name to firebase database
    await addDoc(collection(db, "users"), {
      name,
      email,
      uid: user.uid,
      authProvider: "local",
    });

    // photoUrl will be null, so set it to empty strings
    let avatar = user.photoURL;
    if (avatar === null) avatar = "";

    // Update state with name from input field
    setUserData({
      name: name,
      profileUrl: avatar,
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
  getImageURL,
  signInWithGoogle,
  sendPasswordReset,
  signInWithFacebook,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
};
