import { db } from "../../../utilities/firebase";
import { collection, getDocs } from "firebase/firestore";

interface fetchTargetFolksCoordinatesProps {
  imageName: string;
  folkName: string;
  setCorrectCoords: React.Dispatch<
    React.SetStateAction<{
      height: {
        max: number;
        min: number;
      };
      width: {
        max: number;
        min: number;
      };
    }>
  >;
}

export const fetchTargetFolkCoordinates = async ({
  imageName,
  folkName,
  setCorrectCoords,
}: fetchTargetFolksCoordinatesProps) => {
  const pathToCoords = collection(db, "coords", imageName, folkName);
  const coordsDoc = await getDocs(pathToCoords);
  const coordsArr = coordsDoc.docs.map((doc) => ({ [doc.id]: doc.data() }));

  setCorrectCoords({
    height: { max: coordsArr[0].height.max, min: coordsArr[0].height.min },
    width: { max: coordsArr[1].width.max, min: coordsArr[1].width.min },
  });
};
