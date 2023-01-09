import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db, storage } from "./firebase";
import {
  getDownloadURL,
  listAll,
  ref,
  StorageReference,
} from "firebase/storage";

// This function once triggered adds name and score (time) to firebase database
export const addNameToDatabase = async (
  gameConsoleName: string,
  name: string,
  hours: string,
  minutes: string,
  seconds: string,
  timeInSeconds: number
) => {
  const mainCollection = "leader-board";
  const subCollection = "Name";
  await addDoc(collection(db, mainCollection, gameConsoleName, subCollection), {
    Name: name,
    Hours: hours,
    Minutes: minutes,
    Seconds: seconds,
    "Time In Seconds": timeInSeconds,
  });
};

// This function is used in getting all names in a subcollection
export const getNamesFromDatabase = async (
  gameConsoleName: string,
  setNames: React.Dispatch<
    React.SetStateAction<{ data: DocumentData; id: string }[]>
  >
) => {
  const getConsoleSubCollection = collection(
    db,
    "leader-board",
    gameConsoleName,
    "Name"
  );
  const getAllDocsInSubCollection = await getDocs(getConsoleSubCollection);
  const dataArray = getAllDocsInSubCollection.docs
    .map((doc) => ({
      data: doc.data(),
      id: doc.id,
    }))
    .sort((a, b) => a.data["Time In Seconds"] - b.data["Time In Seconds"]);
  setNames(dataArray);
};

// This function used in getting file path to a subcollection under main
// collection (leader-board).
const getSubCollectionPath = (doc: QueryDocumentSnapshot<DocumentData>) =>
  (async () =>
    await getDocs(collection(db, "leader-board", `${doc.id}`, "Name")))();

// This gets overall subcollection under documents from leader-board collection
export const getAllNamesFromDatabase = async (
  setNames: React.Dispatch<
    React.SetStateAction<{ data: DocumentData; id: string }[]>
  >
) => {
  const mainCollection = collection(db, "leader-board");
  const docs = await getDocs(mainCollection);
  const docsArray = docs.docs.map(getSubCollectionPath);
  const result = await Promise.all(docsArray);
  const allDocs = result
    .map((subCol) =>
      subCol.docs.map((doc) => ({ data: doc.data(), id: doc.id }))
    )
    .filter((doc) => doc.length > 0)
    .flat(1)
    .sort((a, b) => a.data["Time In Seconds"] - b.data["Time In Seconds"]);
  setNames(allDocs);
};

// Get images from cloud storage
type urlListType = {
  name: string;
  url: string;
}[];

export const getImageURL = async (
  folderName: string,
  setUrlList: (urlList: urlListType) => void
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
    const urlList = await Promise.all(imageURL);
    setUrlList(urlList);
  } catch (error) {
    console.log(error);
  }
};

const getImageNameAndUrl = async (image: StorageReference) => {
  const imageURL = await getDownloadURL(ref(storage, image.fullPath));
  const imageName = image.name.split(".")[0];
  return { Name: imageName, url: imageURL };
};

const getImageDetails = (image: StorageReference) => getImageNameAndUrl(image);

const getImagesInSubFolder = async (folder: StorageReference) => {
  const folderRef = ref(storage, `${folder.fullPath}`);
  const list = await listAll(folderRef);
  const folderImages = list.items.map(getImageDetails);
  return await Promise.all(folderImages);
};

const getSubFolderNameAndImages = async (subFolder: StorageReference) => {
  const folderName = subFolder.name;
  return {
    Card: folderName,
    Folks: await getImagesInSubFolder(subFolder),
  };
};

const getSubFoldersItems = (subFolder: StorageReference) =>
  getSubFolderNameAndImages(subFolder);

export type getHiddenFolksURLType = {
  Card: string;
  Folks: {
    Name: string;
    url: string;
  }[];
}[];

export const getHiddenFolksURL = async (
  setHiddenFolksArray: (hiddenFolksArray: getHiddenFolksURLType) => void
) => {
  try {
    const folderRef = ref(storage, "console-folks");
    const allSubFolders = await listAll(folderRef);
    const subFolderArray = allSubFolders.prefixes.map(getSubFoldersItems);
    const hiddenFolksArray = await Promise.all(subFolderArray);
    setHiddenFolksArray(hiddenFolksArray);
  } catch (error) {
    console.log(error);
  }
};

// Just got the direct links instead of using state since they're just two links.
export const profilePic =
  "https://firebasestorage.googleapis.com/v0/b/photo-tagging-app-3344.appspot.com/o/bg-and-icons%2Fdp.png?alt=media&token=1b0f80b8-e9b5-46dc-ae49-38d3cb92ca65";
export const home =
  "https://firebasestorage.googleapis.com/v0/b/photo-tagging-app-3344.appspot.com/o/bg-and-icons%2Fhome.png?alt=media&token=18d0cace-15aa-4001-ada4-961b35c3594e";
