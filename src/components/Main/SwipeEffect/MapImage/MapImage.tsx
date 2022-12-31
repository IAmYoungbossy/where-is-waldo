/* eslint-disable react-hooks/exhaustive-deps */
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { hiddenFolksType } from "../../../App/App";
import Header from "../../../Header/Header";
import { auth, db } from "../../../utilities/firebase";
import { StyledMain } from "../../Main.styled";
import {
  StyledImageWrapper,
  StyledMousePointer,
  StyledStatusChecker,
  StyledTargetFolks,
} from "./MapImage.styled";
import { ReportPlayTime } from "./ReportPlayTime/ReportPlayTime";

interface ImageProps {
  src: string;
  alt: string;
  hiddenFolks: hiddenFolksType[];
  setHiddenFolks: React.Dispatch<React.SetStateAction<hiddenFolksType[]>>;
}

interface StyledPointerProps {
  cursorLocation: { top: string; left: string };
}

interface StyledTargetProps {
  clickedTarget: {
    top: string;
    left: string;
  };
  updateUseEffect: boolean;
  hiddenFolks?: hiddenFolksType[];
  setCheckStatus: (status: string) => void;
  setUpdateUseEffect: (status: boolean) => void;
  setShowCustomCursor: (status: boolean) => void;
  getCoords: (imageName: string, folkName: string) => void;
  setFolkName: React.Dispatch<React.SetStateAction<string>>;
}

interface CheckStatusProps {
  status: string;
  background: string;
}

const StyledTarget = ({
  getCoords,
  hiddenFolks,
  setFolkName,
  clickedTarget,
  setCheckStatus,
  updateUseEffect,
  setUpdateUseEffect,
  setShowCustomCursor,
}: StyledTargetProps): JSX.Element => {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    folk: hiddenFolksType
  ) => {
    e.stopPropagation();
    setFolkName(folk.Name);
    setShowCustomCursor(false);
    setCheckStatus("Checking...");
    getCoords(folk.imageName, folk.Name);
    setUpdateUseEffect(updateUseEffect ? false : true);
  };

  const nameOfHiddenFolks = hiddenFolks?.map((folk, index) => {
    return (
      <li key={index}>
        {!folk.checked && (
          <button onClick={(e) => handleClick(e, folk)}>{folk.Name}</button>
        )}
        {folk.checked && (
          <button disabled onClick={(e) => handleClick(e, folk)}>
            {folk.Name}
          </button>
        )}
      </li>
    );
  });

  return (
    <StyledTargetFolks top={clickedTarget.top} left={clickedTarget.left}>
      <div />
      <div>
        <ul>{nameOfHiddenFolks}</ul>
      </div>
    </StyledTargetFolks>
  );
};

const StyledPointer = ({ cursorLocation }: StyledPointerProps): JSX.Element => (
  <StyledMousePointer style={cursorLocation}>
    <div />
  </StyledMousePointer>
);

export const CheckStatus = ({ status, background }: CheckStatusProps) => {
  return (
    <StyledStatusChecker background={background}>
      <p>{status}</p>
    </StyledStatusChecker>
  );
};

export default function MapImage({
  src,
  alt,
  hiddenFolks,
  setHiddenFolks,
}: ImageProps): JSX.Element {
  // State for clicked target in percentage. Use for backend validation
  const [clickedTargetInPercentage, setClickedTargetInPercentage] = useState({
    width: 0,
    height: 0,
  });

  // State for whether to show the clicked target
  const [showClickedTarget, setShowClickedTarget] = useState(false);

  // State for whether to show custom cursor
  const [showCustomCursor, setShowCustomCursor] = useState(true);

  // State for updating the useEffect hook
  const [updateUseEffect, setUpdateUseEffect] = useState(false);

  // State for location of custom cursor
  const [cursorLocation, setCursorLocation] = useState({
    top: "0px",
    left: "10px",
  });

  // State for cursor style
  const [cursorStyle, setCursorStyle] = useState("none");

  // State for clicked target location
  const [clickedTarget, setClickedTarget] = useState({
    top: "0px",
    left: "10px",
  });

  const [correctCoords, setCorrectCoords] = useState({
    height: { max: 0, min: 0 },
    width: { max: 0, min: 0 },
  });

  // Declare a new state variable, which we'll call "time"
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [checkStatus, setCheckStatus] = useState("");
  const [background, setBackground] = useState("black");
  const [folkName, setFolkName] = useState("");
  const [foundAllFolks, setFoundAllFolks] = useState(false);

  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  // Prevents custom cursor from going off the image
  const preventCustomCursorFromGoingOffImage = (
    percentWidth: number,
    percentHeight: number
  ) => {
    if (
      percentWidth > 97 ||
      percentWidth < 3 ||
      percentHeight > 98 ||
      percentHeight < 1
    ) {
      setShowCustomCursor(false);
      setCursorStyle("default");
    } else if (showClickedTarget) {
      setShowCustomCursor(false);
    } else {
      setShowCustomCursor(true);
      setCursorStyle("none");
    }
  };

  const mousePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    const image = e.currentTarget;
    const imageHeight = image.offsetHeight;
    const imageWidth = image.offsetWidth;
    const clickedHeight = e.nativeEvent.offsetY;
    const clickedWidth = e.nativeEvent.offsetX;
    const percentHeight = (clickedHeight * 100) / imageHeight;
    const percentWidth = (clickedWidth * 100) / imageWidth;
    return { percentHeight, percentWidth };
  };

  const getMouseLocationInPercent = (e: React.MouseEvent<HTMLDivElement>) => {
    const { percentHeight, percentWidth } = mousePosition(e);
    preventCustomCursorFromGoingOffImage(percentWidth, percentHeight);
  };

  const getMousePositionOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { percentHeight, percentWidth } = mousePosition(e);
    preventCustomCursorFromGoingOffImage(percentWidth, percentHeight);
    setClickedTargetInPercentage({
      width: percentWidth,
      height: percentHeight,
    });
  };

  // This function gets the X and Y coordinates for the style mouse pointer.
  const updateMousePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    // Subtracts 118 and 40 from the Y and X coordinates to center the custom
    // mouse pointer at the tip of the mouse arrow
    setCursorLocation({
      top: `${e.pageY - 118}px`,
      left: `${e.pageX - 40}px`,
    });
  };

  useEffect(() => {
    if (!user) return navigate("/");

    // Prevents the cursor from going off the image in the target
    if (
      clickedTargetInPercentage.width > 97 ||
      clickedTargetInPercentage.width < 3 ||
      clickedTargetInPercentage.height > 98 ||
      clickedTargetInPercentage.height < 1
    ) {
      setShowCustomCursor(false);
      return;
    }

    setClickedTarget({
      top: cursorLocation.top,
      left: cursorLocation.left,
    });

    // Toggles the cursor style and whether to show the clicked target
    setCursorStyle(cursorStyle === "none" ? "default" : "none");
    setShowClickedTarget(!showClickedTarget);
  }, [updateUseEffect]);

  useEffect(() => {
    const clickedTarget = clickedTargetInPercentage;
    if (
      clickedTarget.width >= correctCoords.width.min &&
      clickedTarget.width <= correctCoords.width.max &&
      clickedTarget.height >= correctCoords.height.min &&
      clickedTarget.height <= correctCoords.height.max &&
      clickedTarget.width !== 0
    ) {
      hiddenFolks.forEach((folk, index) => {
        if (folk.Name === folkName) {
          const hiddenFolksCopy = [...hiddenFolks];
          hiddenFolksCopy[index] = { ...folk, checked: true };
          setHiddenFolks(hiddenFolksCopy);
        }
      });
      setBackground("green");
      setCheckStatus(`Congrats! You found ${folkName}`);
      setTimeout(() => {
        setCheckStatus("");
        setBackground("black");
      }, 5000);
    } else if (clickedTarget.width !== 0) {
      setBackground("red");
      setCheckStatus("Keep searching");
      setTimeout(() => {
        setCheckStatus("");
        setBackground("black");
      }, 5000);
    }
  }, [correctCoords]);

  useEffect(() => {
    if (hiddenFolks.length === 0) return;
    const allTrue = hiddenFolks.every((folk) => folk.checked);
    if (allTrue) setFoundAllFolks(true);
  }, [hiddenFolks]);

  useEffect(() => {
    if (foundAllFolks) {
      return;
    }
    const interval = setInterval(() => {
      // Increment the seconds by 1
      setTime((prevTime) => ({
        ...prevTime,
        seconds: prevTime.seconds + 1,
      }));

      if (time.seconds === 59) {
        setTime((prevTime) => ({
          ...prevTime,
          seconds: 0,
          minutes: prevTime.minutes + 1,
        }));
      }

      if (time.minutes === 59) {
        setTime((prevTime) => ({
          ...prevTime,
          minutes: 0,
          hours: prevTime.hours + 1,
        }));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [time, foundAllFolks]);

  const getHiddenFolksCoords = async (imageName: string, folkName: string) => {
    const pathToCoords = collection(db, "coords", imageName, folkName);
    const coordsDoc = await getDocs(pathToCoords);
    const coordsArr = coordsDoc.docs.map((doc) => ({ [doc.id]: doc.data() }));

    setCorrectCoords({
      height: { max: coordsArr[0].height.max, min: coordsArr[0].height.min },
      width: { max: coordsArr[1].width.max, min: coordsArr[1].width.min },
    });
  };

  // This maps the clicked area and displays possible name there
  const namesOfFolks = showClickedTarget && (
    <StyledTarget
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

  return (
    <>
      {user && (
        <>
          <Header
            time={time}
            background={background}
            hiddenFolks={hiddenFolks}
            checkStatus={checkStatus}
          />
          <StyledMain>
            <StyledImageWrapper
              cursorPointer={cursorStyle}
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
            </StyledImageWrapper>
          </StyledMain>
          {foundAllFolks && (
            <ReportPlayTime
              hours={time.hours}
              minutes={time.minutes}
              seconds={time.seconds}
              hiddenFolks={hiddenFolks}
            />
          )}
        </>
      )}
    </>
  );
}
