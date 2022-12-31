import { addDoc, collection, getDocs } from "firebase/firestore";
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
