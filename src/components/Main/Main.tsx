import { useState, useEffect } from "react";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";
import { hiddenFolksType } from "../App/App";
import { Route, Routes } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import SwipeEffect from "./SwipeEffect/SwipeEffect";
import MapImage from "./SwipeEffect/MapImage/MapImage";
import { getImageURL } from "../utilities/firebaseCRUD";
import { LeaderBoard } from "./LeaderBoard/LeaderBoard";
import { ResetPassword } from "./ResetPassword/ResetPassword";
import { PageNotFound } from "../utilities/PageNotFound/PageNotFound";

export interface MainProps {
  handleDisplayHiddenFolks: (alt: string) => void;
  hiddenFolks: hiddenFolksType[];
  setHiddenFolks: React.Dispatch<React.SetStateAction<hiddenFolksType[]>>;
}

export function Main({ ...props }: MainProps): JSX.Element {
  const [gameImage, setGameImage] = useState<{ name: string; url: string }[]>(
    []
  );
  const [imageSlide, setImageSlide] = useState<{ name: string; url: string }[]>(
    []
  );
  const [userData, setUserData] = useState({ name: "", profileUrl: "" });
  const [consoleName, setConsoleName] = useState("");

  // This sets names of players with their score to leaderboard table
  const [names, setNames] = useState<{ data: DocumentData; id: string }[]>([]);

  useEffect(() => {
    getImageURL("game-console", setGameImage);
    getImageURL("console-slides", setImageSlide);
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn setUserData={setUserData} />} />
        <Route path="/sign-up" element={<SignUp setUserData={setUserData} />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <SwipeEffect
              userData={userData}
              imageSlide={imageSlide}
              setNames={setNames}
              setConsoleName={setConsoleName}
              {...props}
            />
          }
        />
        <Route
          path="/leader-board"
          element={
            <LeaderBoard
              names={names}
              setNames={setNames}
              gameImage={gameImage}
              consoleName={consoleName}
              setConsoleName={setConsoleName}
            />
          }
        />
        {gameImage.map((image) => (
          <Route
            key={image.name}
            path={`/dashboard/${image.name}`}
            element={
              <MapImage
                src={image.url}
                alt={image.name}
                names={names}
                setNames={setNames}
                consoleName={consoleName}
                setConsoleName={setConsoleName}
                {...props}
              />
            }
          />
        ))}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
