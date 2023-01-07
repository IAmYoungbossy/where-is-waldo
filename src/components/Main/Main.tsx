import { useState } from "react";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";
import N64 from "../assets/P-N64-min.jpg";
import PS1 from "../assets/P-PS1-min.jpg";
import PS2 from "../assets/P-PS2-min.jpg";
import PS4 from "../assets/P-PS4-min.jpg";
import { hiddenFolksType } from "../App/App";
import LocNar from "../assets/P-Loc-Nar-min.jpg";
import { Route, Routes } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import SwipeEffect from "./SwipeEffect/SwipeEffect";
import Dreamcast from "../assets/P-Dreamcast-min.jpg";
import MapImage from "./SwipeEffect/MapImage/MapImage";
import { LeaderBoard } from "./LeaderBoard/LeaderBoard";
import { ResetPassword } from "./ResetPassword/ResetPassword";
import { PageNotFound } from "../utilities/PageNotFound/PageNotFound";

export const consoleImages = [
  { name: "N64", url: N64 },
  { name: "PS1", url: PS1 },
  { name: "PS2", url: PS2 },
  { name: "PS4", url: PS4 },
  { name: "LocNar", url: LocNar },
  { name: "Dreamcast", url: Dreamcast },
];

export interface MainProps {
  hiddenFolks: hiddenFolksType[];
  setHiddenFolks: React.Dispatch<React.SetStateAction<hiddenFolksType[]>>;
}

export function Main(): JSX.Element {
  // This sets names of players with their score to leaderboard table
  const [names, setNames] = useState<{ data: DocumentData; id: string }[]>([]);
  const [hiddenFolks, setHiddenFolks] = useState<hiddenFolksType[]>([]);
  const [consoleName, setConsoleName] = useState("");

  // This sets name of the console Image responsive for names on table
  const [userData, setUserData] = useState({
    name: "",
    profileUrl: "",
  });

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
              setNames={setNames}
              hiddenFolks={hiddenFolks}
              setConsoleName={setConsoleName}
              setHiddenFolks={setHiddenFolks}
            />
          }
        />
        <Route
          path="/leader-board"
          element={
            <LeaderBoard
              names={names}
              setNames={setNames}
              consoleName={consoleName}
              setConsoleName={setConsoleName}
            />
          }
        />
        {consoleImages.map((image) => (
          <Route
            key={image.name}
            path={`/dashboard/${image.name}`}
            element={
              <MapImage
                names={names}
                src={image.url}
                alt={image.name}
                setNames={setNames}
                consoleName={consoleName}
                hiddenFolks={hiddenFolks}
                setConsoleName={setConsoleName}
                setHiddenFolks={setHiddenFolks}
              />
            }
          />
        ))}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}
