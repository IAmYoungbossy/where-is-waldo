/* eslint-disable react-hooks/exhaustive-deps */
import {
  mousePositionOnImage,
  MouseTarget,
  StyledPointer,
} from "./MouseTarget/MouseTarget";
import { useEffect, useState } from "react";
import Header, { FolksAndTimer } from "../../../Header/Header";
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

export default function MapImage({ src, alt }: ImageProps): JSX.Element {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirects to login page if user not valid
    if (!user) return navigate("/");
  }, []);

  return (
    <>
      {user && (
        <>
          <Header>
            <div>Hi</div>
          </Header>
          <StyledMain>
            <ImageWrap src={src} alt={alt} />
          </StyledMain>
        </>
      )}
    </>
  );
}

function ImageWrap({ src, alt }: { src: string; alt: string }) {
  const [cursorLocation, setCursorLocation] = useState({
    top: "0px",
    left: "10px",
  });

  // This function gets the X and Y coordinates for the style mouse pointer.
  const updateMousePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorLocation({
      top: `${e.pageY - 118}px`,
      left: `${e.pageX - 40}px`,
    });
  };

  return (
    <StyledImageWrapper
      cursorPointer={"default"}
      onMouseMove={(e: React.MouseEvent<HTMLDivElement>) => {
        updateMousePosition(e);
      }}
    >
      <StyledPointer cursorLocation={cursorLocation} />
      <img src={src} alt={alt} />
    </StyledImageWrapper>
  );
}
