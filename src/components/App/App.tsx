import "./App.css";
import {
  getHiddenFolksURL,
  getHiddenFolksURLType,
  getImageURL,
} from "../utilities/firebaseCRUD";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { SignIn } from "../Main/SignIn/SignIn";
import { SignUp } from "../Main/SignUp/SignUp";
import { Route, Routes } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import SwipeEffect from "../Main/SwipeEffect/SwipeEffect";
import MapImage from "../Main/SwipeEffect/MapImage/MapImage";
import { LeaderBoard } from "../Main/LeaderBoard/LeaderBoard";
import { ResetPassword } from "../Main/ResetPassword/ResetPassword";
import { PageNotFound } from "../utilities/PageNotFound/PageNotFound";

export type hiddenFolksType = {
  url: string;
  Name: string;
  checked: boolean;
  imageName: string;
};

interface GameImageProps {
  name: string;
  url: string;
}
interface LeaderboardName {
  data: DocumentData;
  id: string;
}

function App() {
  const [consoleName, setConsoleName] = useState("");
  const [gameImage, setGameImage] = useState<GameImageProps[]>([]);
  const [playerName, setPlayerName] = useState<LeaderboardName[]>([]);
  const [hiddenFolks, setHiddenFolks] = useState<hiddenFolksType[]>([]);
  const [userData, setUserData] = useState({ name: "", profileUrl: "" });
  const [folksArray, setFolksArray] = useState<getHiddenFolksURLType>([]);

  useEffect(() => {
    getHiddenFolksURL(setFolksArray);
    getImageURL("game-console", setGameImage);
  }, []);

  // This function sets the hidden characters to search for.
  const handleDisplayHiddenFolks = (alt: string): void => {
    folksArray.forEach((image) => {
      if (image.Card === alt) {
        const folksCopy = [...image.Folks].map((folk) => ({
          ...folk,
          checked: false,
          imageName: alt,
        }));
        setHiddenFolks(folksCopy);
      }
    });
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn setUserData={setUserData} />} />
        <Route path="/sign-up" element={<SignUp setUserData={setUserData} />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <SwipeEffect
              userData={userData}
              hiddenFolks={hiddenFolks}
              setPlayerName={setPlayerName}
              setHiddenFolks={setHiddenFolks}
              setConsoleName={setConsoleName}
              handleDisplayHiddenFolks={handleDisplayHiddenFolks}
            />
          }
        />
        <Route
          path="/leader-board"
          element={
            <LeaderBoard
              gameImage={gameImage}
              playerName={playerName}
              consoleName={consoleName}
              setPlayerName={setPlayerName}
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
                playerName={playerName}
                consoleName={consoleName}
                hiddenFolks={hiddenFolks}
                setPlayerName={setPlayerName}
                setConsoleName={setConsoleName}
                setHiddenFolks={setHiddenFolks}
              />
            }
          />
        ))}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
