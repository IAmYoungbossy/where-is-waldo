import {
  addDoc,
  collection,
  DocumentData,
  getDocs,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";

export const addNameToTable = async (
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

export const getNameFromTable = async (
  gameConsoleName: string,
  subCollection: string
) => {
  const getConsoleSubCollection = collection(
    db,
    "leader-board",
    gameConsoleName,
    subCollection
  );
  const getAllDocsInSubCollection = await getDocs(getConsoleSubCollection);
  const dataArray = getAllDocsInSubCollection.docs.map((doc) => [doc.data()]);
  console.log(dataArray);
};

const getSubCollectionPath = (doc: QueryDocumentSnapshot<DocumentData>) =>
  (async () =>
    await getDocs(collection(db, "leader-board", `${doc.id}`, "Name")))();

export const getAllNamesFromDatabase = async () => {
  const mainCollection = collection(db, "leader-board");
  const docs = await getDocs(mainCollection);
  const docsArray = docs.docs.map(getSubCollectionPath);
  const result = await Promise.all(docsArray);
  const allDocs = result
    .map((subCol) => subCol.docs.map((doc) => ({ [doc.id]: doc.data() })))
    .filter((doc) => doc.length > 0)
    .flat(1);
  console.log(allDocs);
};
