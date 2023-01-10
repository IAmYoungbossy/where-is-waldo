/* eslint-disable react-hooks/exhaustive-deps */
import "../../Main.css";
import "./MapImage.css";
import {
  mousePositionOnImage,
  MouseTarget,
  StyledPointer,
} from "./MouseTarget/MouseTarget";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { validateTarget } from "./validateTarget";
import { auth } from "../../../utilities/firebase";
import { hiddenFolksType } from "../../../App/App";
import { displayTargetMenu } from "./displayTargetMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import Header, { FolksAndTimer } from "../../../Header/Header";
import { fetchTargetFolkCoordinates } from "./folkCoordinates";
import { ReportPlayTime } from "./ReportPlayTime/ReportPlayTime";
import { checkIfFoundAllCharacters } from "./checkIfFoundAllCharactersProps";
import React from "react";

interface ImageMapProps {
  src: string;
  alt: string;
  hiddenFolks: hiddenFolksType[];
  setBackground: React.Dispatch<React.SetStateAction<string>>;
  setCheckStatus: React.Dispatch<React.SetStateAction<string>>;
  setHiddenFolks: React.Dispatch<React.SetStateAction<hiddenFolksType[]>>;
}

const ImageMap = React.memo(
  ({
    src,
    alt,
    hiddenFolks,
    setBackground,
    setCheckStatus,
    setHiddenFolks,
  }: ImageMapProps) => {
    const [clickedTargetInPercentage, setClickedTargetInPercentage] = useState({
      width: 0,
      height: 0,
    });
    const [cursorLocation, setCursorLocation] = useState({
      top: "0px",
      left: "10px",
    });
    const [clickedTarget, setClickedTarget] = useState({
      top: "0px",
      left: "10px",
    });
    const [correctCoords, setCorrectCoords] = useState({
      height: { max: 0, min: 0 },
      width: { max: 0, min: 0 },
    });
    const [showClickedTarget, setShowClickedTarget] = useState(false);
    const [showCustomCursor, setShowCustomCursor] = useState(true);
    const [updateUseEffect, setUpdateUseEffect] = useState(false);
    const [cursorStyle, setCursorStyle] = useState("none");
    const [folkName, setFolkName] = useState("");

    useEffect(() => {
      displayTargetMenu(
        clickedTargetInPercentage,
        setShowCustomCursor,
        setClickedTarget,
        cursorLocation,
        setShowClickedTarget,
        showClickedTarget,
        setCursorStyle,
        cursorStyle
      );
    }, [updateUseEffect]);

    useEffect(() => {
      validateTarget({
        folkName,
        hiddenFolks,
        correctCoords,
        setBackground,
        setHiddenFolks,
        setCheckStatus,
        clickedTargetInPercentage,
      });
    }, [correctCoords]);

    useEffect(() => {
      document.documentElement.style.setProperty(
        "--cursor-pointer",
        `${cursorStyle}`
      );
    }, [cursorStyle]);

    const {
      getMouseLocationInPercent,
      getMousePositionOnClick,
      updateMousePosition,
    } = mousePositionOnImage(
      showClickedTarget,
      setCursorStyle,
      setShowCustomCursor,
      setClickedTargetInPercentage,
      setCursorLocation
    );

    const getHiddenFolksCoords = (imageName: string, folkName: string) =>
      fetchTargetFolkCoordinates({ imageName, folkName, setCorrectCoords });

    return (
      <div
        className="image-wrapper"
        onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
          updateMousePosition(e);
          getMouseLocationInPercent(e);
        }}
        onMouseDown={updateMousePosition}
        onClick={(e) => {
          getMousePositionOnClick(e);
          setUpdateUseEffect(updateUseEffect ? false : true);
          setShowCustomCursor(false);
        }}
      >
        {showClickedTarget && (
          <MouseTarget
            setFolkName={setFolkName}
            hiddenFolks={hiddenFolks}
            clickedTarget={clickedTarget}
            setCheckStatus={setCheckStatus}
            getCoords={getHiddenFolksCoords}
            updateUseEffect={updateUseEffect}
            setUpdateUseEffect={setUpdateUseEffect}
            setShowCustomCursor={setShowCustomCursor}
          />
        )}
        {showCustomCursor && <StyledPointer cursorLocation={cursorLocation} />}
        <img src={src} alt={alt} />
      </div>
    );
  }
);

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

export default React.memo(function MapImage({
  src,
  alt,
  hiddenFolks,
  setPlayerName,
  setHiddenFolks,
  setConsoleName,
}: ImageProps): JSX.Element {
  const [checkStatus, setCheckStatus] = useState("");
  const [background, setBackground] = useState("black");
  const [foundAllFolks, setFoundAllFolks] = useState(false);
  const [playTime, setPlayTime] = useState({ hr: 0, min: 0, sec: 0 });

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/");
  }, []);

  useEffect(() => {
    // Triggers a pop up modal if all characters are found
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
              background={background}
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
              setBackground={setBackground}
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
});
