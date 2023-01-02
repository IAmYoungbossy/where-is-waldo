import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

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
