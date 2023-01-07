/* eslint-disable react-hooks/exhaustive-deps */
import "../../Main.css";
import "./MapImage.css";
import {
  mousePositionOnImage,
  MouseTarget,
  StyledPointer,
} from "./MouseTarget/MouseTarget";
import { useEffect, useState } from "react";
import Header, { FolksAndTimer } from "../../../Header/Header";
import { setGameTimer } from "./setGameTimer";
import { useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { validateTarget } from "./validateTarget";
import { auth } from "../../../utilities/firebase";
import { hiddenFolksType } from "../../../App/App";
import { displayTargetMenu } from "./displayTargetMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import { fetchTargetFolkCoordinates } from "./folkCoordinates";
import { ReportPlayTime } from "./ReportPlayTime/ReportPlayTime";
import { checkIfFoundAllCharacters } from "./checkIfFoundAllCharactersProps";

interface ImageProps {
  src: string;
  alt: string;
  setNames: React.Dispatch<
    React.SetStateAction<
      {
        data: DocumentData;
        id: string;
      }[]
    >
  >;
  names: {
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
  setNames,
  hiddenFolks,
  setHiddenFolks,
  setConsoleName,
}: ImageProps): JSX.Element {
  const [clickedTargetInPercentage, setClickedTargetInPercentage] = useState({
    width: 0,
    height: 0,
  });
  const [cursorLocation, setCursorLocation] = useState({
    top: "0px",
    left: "10px",
  });
  const [correctCoords, setCorrectCoords] = useState({
    height: { max: 0, min: 0 },
    width: { max: 0, min: 0 },
  });
  const [clickedTarget, setClickedTarget] = useState({
    top: "0px",
    left: "10px",
  });
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [showClickedTarget, setShowClickedTarget] = useState(false);
  const [showCustomCursor, setShowCustomCursor] = useState(true);
  const [updateUseEffect, setUpdateUseEffect] = useState(false);
  const [foundAllFolks, setFoundAllFolks] = useState(false);
  const [cursorStyle, setCursorStyle] = useState("none");
  const [background, setBackground] = useState("black");
  const [checkStatus, setCheckStatus] = useState("");
  const [folkName, setFolkName] = useState("");
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Handles all mouse movements
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

  useEffect(() => {
    // Redirects to login page if user not valid
    if (!user) return navigate("/");
    // Makes sure dropdown menu doesnt show if
    // mouse is at extreme end of image
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
    // This checks if coordinates of selected character
    // matches with coordinates in backend
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
    // Triggers a pop up modal if all characters are found
    checkIfFoundAllCharacters({
      hiddenFolks,
      setFoundAllFolks,
    });
  }, [hiddenFolks]);

  useEffect(() => {
    // Stops timer if all characters are found
    if (foundAllFolks) {
      return;
    }
    // This sets the time while game is still on
    const interval = setInterval(
      setGameTimer.bind(null, { setTime, time }),
      1000
    );
    return () => clearInterval(interval);
  }, [time, foundAllFolks]);

  const getHiddenFolksCoords = (imageName: string, folkName: string) =>
    fetchTargetFolkCoordinates({ imageName, folkName, setCorrectCoords });

  // Shows dropdown menu with names of hidden characters
  const namesOfFolks = showClickedTarget && (
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
  );

  // This controls when to show a customizes mouse pointer
  const customizedCursor = showCustomCursor && (
    <StyledPointer cursorLocation={cursorLocation} />
  );

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--cursor-pointer",
      `${cursorStyle}`
    );
  }, [cursorStyle]);

  return (
    <>
      {user && (
        <>
          <Header>
            <FolksAndTimer
              time={time}
              background={background}
              hiddenFolks={hiddenFolks}
              checkStatus={checkStatus}
            />
          </Header>
          <main>
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
              {namesOfFolks}
              {customizedCursor}
              <img src={src} alt={alt} />
            </div>
          </main>
          {foundAllFolks && (
            <ReportPlayTime
              alt={alt}
              hours={time.hours}
              minutes={time.minutes}
              seconds={time.seconds}
              hiddenFolks={hiddenFolks}
              setNames={setNames}
              setConsoleName={setConsoleName}
            />
          )}
        </>
      )}
    </>
  );
}
