/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { setGameTimer } from "./setGameTimer";
import { useNavigate } from "react-router-dom";
import { StyledMain } from "../../Main.styled";
import { DocumentData } from "firebase/firestore";
import { validateTarget } from "./validateTarget";
import { auth } from "../../../utilities/firebase";
import { hiddenFolksType } from "../../../App/App";
import { StyledImageWrapper } from "./MapImage.styled";
import { displayTargetMenu } from "./displayTargetMenu";
import { useAuthState } from "react-firebase-hooks/auth";
import Header, { FolksAndTimer } from "../../../Header/Header";
import { fetchTargetFolkCoordinates } from "./folkCoordinates";
import { ReportPlayTime } from "./ReportPlayTime/ReportPlayTime";
import { checkIfFoundAllCharacters } from "./checkIfFoundAllCharactersProps";
import { mousePositionOnImage, MouseTarget } from "./MouseTarget/MouseTarget";

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
    left: "0px",
  });
  const [correctCoords, setCorrectCoords] = useState({
    height: { max: 0, min: 0 },
    width: { max: 0, min: 0 },
  });
  const [folkName, setFolkName] = useState("");
  const [checkStatus, setCheckStatus] = useState("");
  const [background, setBackground] = useState("black");
  const [foundAllFolks, setFoundAllFolks] = useState(false);
  const [updateUseEffect, setUpdateUseEffect] = useState(false);
  const [showClickedTarget, setShowClickedTarget] = useState(true);
  const [nameList, setNameList] = useState({ top: "0px", left: "0px" });
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  // Handles all mouse movements
  const { getMousePositionOnClick, updateMousePosition } = mousePositionOnImage(
    setClickedTargetInPercentage,
    setCursorLocation
  );

  useEffect(() => {
    if (!user) return navigate("/");
  }, []);

  useEffect(() => {
    displayTargetMenu(
      setNameList,
      cursorLocation,
      setShowClickedTarget,
      showClickedTarget
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
    checkIfFoundAllCharacters({
      hiddenFolks,
      setFoundAllFolks,
    });
  }, [hiddenFolks]);

  useEffect(() => {
    if (foundAllFolks) return;
    const setTimer = setGameTimer.bind(null, { setTime, time });
    const interval = setInterval(setTimer, 1000);
    return () => clearInterval(interval);
  }, [time, foundAllFolks]);

  const getHiddenFolksCoords = (imageName: string, folkName: string) =>
    fetchTargetFolkCoordinates({ imageName, folkName, setCorrectCoords });

  // Shows dropdown menu with names of hidden characters
  const namesOfFolks = showClickedTarget && (
    <MouseTarget
      setFolkName={setFolkName}
      hiddenFolks={hiddenFolks}
      nameList={nameList}
      setCheckStatus={setCheckStatus}
      getCoords={getHiddenFolksCoords}
    />
  );

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
          <StyledMain>
            <StyledImageWrapper
              onClick={(e) => {
                updateMousePosition(e);
                getMousePositionOnClick(e);
                setUpdateUseEffect(updateUseEffect ? false : true);
              }}
            >
              {namesOfFolks}
              <img src={src} alt={alt} />
            </StyledImageWrapper>
          </StyledMain>
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
