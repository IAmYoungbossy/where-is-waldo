/* eslint-disable react-hooks/exhaustive-deps */
import "../../Main.css";
import "./MapImage.css";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { validateTarget } from "./validateTarget";
import { auth } from "../../../utilities/firebase";
import { hiddenFolksType } from "../../../App/App";
import { displayNameList } from "./displayTargetMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import Header, { FolksAndTimer } from "../../../Header/Header";
import { fetchTargetFolkCoordinates } from "./folkCoordinates";
import { ReportPlayTime } from "./ReportPlayTime/ReportPlayTime";
import { checkIfFoundAllCharacters } from "./checkIfFoundAllCharactersProps";
import { mousePositionOnImage, MouseTarget } from "./MouseTarget/MouseTarget";

interface ImageMapProps {
  src: string;
  alt: string;
  hiddenFolks: hiddenFolksType[];
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  setCheckStatus: React.Dispatch<React.SetStateAction<string>>;
  setHiddenFolks: React.Dispatch<React.SetStateAction<hiddenFolksType[]>>;
}

const ImageMap =
  ({
    src,
    alt,
    hiddenFolks,
    setBackgroundColor,
    setCheckStatus,
    setHiddenFolks,
  }: ImageMapProps) => {
    const [nameList, setNameList] = useState(false);
    const [clickedCoords, setClickedCoords] = useState({
      top: "0px",
      left: "0px",
    });
    const [correctCoords, setCorrectCoords] = useState({
      height: { max: 0, min: 0 },
      width: { max: 0, min: 0 },
    });
    const [coordsToPercent, setCoordsToPercent] = useState({
      width: 0,
      height: 0,
    });
    const [foundFolkName, setFoundFolkName] = useState("");
    const [customCursor, setCustomCursor] = useState("custom");

    useEffect(() => {
      displayNameList(coordsToPercent, setNameList, nameList);
      if (customCursor === "custom")
        document.documentElement.style.setProperty("--display", "none");
    }, [customCursor]);

    useEffect(() => {
      validateTarget({
        foundFolkName,
        hiddenFolks,
        correctCoords,
        setBackgroundColor,
        setHiddenFolks,
        setCheckStatus,
        coordsToPercent,
      });
    }, [correctCoords]);

    useEffect(() => {
      if (customCursor === "default")
        document.documentElement.style.setProperty("--display", "flex");
    }, [clickedCoords]);

    const { getMousePositionOnClick, updateMousePosition } =
      mousePositionOnImage(setCoordsToPercent, setClickedCoords);

    const getHiddenFolksCoords = (imageName: string, foundFolkName: string) =>
      fetchTargetFolkCoordinates({
        imageName,
        foundFolkName,
        setCorrectCoords,
      });

    return (
      <div
        className={`image-wrapper ${customCursor}`}
        onClick={(e) => {
          updateMousePosition(e);
          getMousePositionOnClick(e);
          setCustomCursor(customCursor === "default" ? "custom" : "default");
        }}
      >
        <MouseTarget
          setFoundFolkName={setFoundFolkName}
          setNameList={setNameList}
          hiddenFolks={hiddenFolks}
          clickedCoords={clickedCoords}
          setCheckStatus={setCheckStatus}
          getCoords={getHiddenFolksCoords}
          setCustomCursor={setCustomCursor}
        />
        <img src={src} alt={alt} />
      </div>
    );
  }


interface ImageProps {
  src: string;
  alt: string;
  setPlayerName: React.Dispatch<
    React.SetStateAction<
      {
        data: DocumentData;
        id: string;
      }[]
    >
  >;
  playerName: {
    data: DocumentData;
    id: string;
  }[];
  consoleName: string;
  hiddenFolks: hiddenFolksType[];
  setConsoleName: React.Dispatch<React.SetStateAction<string>>;
  setHiddenFolks: React.Dispatch<React.SetStateAction<hiddenFolksType[]>>;
}

export default function MapImage({
  src,
  alt,
  hiddenFolks,
  setPlayerName,
  setHiddenFolks,
  setConsoleName,
}: ImageProps): JSX.Element {
  const [checkStatus, setCheckStatus] = useState("");
  const [foundAllFolks, setFoundAllFolks] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [playTime, setPlayTime] = useState({ hr: 0, min: 0, sec: 0 });

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/");
  }, []);

  useEffect(() => {
    // Triggers a pop up modal if true
    checkIfFoundAllCharacters({
      hiddenFolks,
      setFoundAllFolks,
    });
  }, [hiddenFolks]);

  return (
    <>
      {user && (
        <>
          <Header>
            <FolksAndTimer
              setPlayTime={setPlayTime}
              backgroundColor={backgroundColor}
              hiddenFolks={hiddenFolks}
              checkStatus={checkStatus}
              foundAllFolks={foundAllFolks}
            />
          </Header>
          <main>
            <ImageMap
              src={src}
              alt={alt}
              hiddenFolks={hiddenFolks}
              setBackgroundColor={setBackgroundColor}
              setHiddenFolks={setHiddenFolks}
              setCheckStatus={setCheckStatus}
            />
          </main>
          {foundAllFolks && (
            <ReportPlayTime
              alt={alt}
              hours={playTime.hr}
              minutes={playTime.min}
              seconds={playTime.sec}
              hiddenFolks={hiddenFolks}
              setPlayerName={setPlayerName}
              setConsoleName={setConsoleName}
            />
          )}
        </>
      )}
    </>
  );
}
