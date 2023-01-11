/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { hiddenFolksType } from "../App/App";
import { DocumentData } from "firebase/firestore";
import {
  getAllNamesFromDatabase,
  home,
  profilePic,
} from "../utilities/firebaseCRUD";
import { FormatTimeToString } from "../FormatTimeToString/FormatTimeToString";
import { setGameTimer } from "../Main/SwipeEffect/MapImage/setGameTimer";
import React from "react";

interface HeaderProps {
  children?: JSX.Element;
}
export default React.memo(function Header({ children }: HeaderProps) {
  return <header>{children}</header>;
});

export const SignInHeader = React.memo(() => {
  return (
    <div className="sign-in-header">
      <h1>HiddenFolks</h1>
    </div>
  );
});

interface CheckStatusProps {
  status: string;
  backgroundColor: string;
}

// This component shows the three stages of validation when you click a character.
// 1. Checking - when getting details from firebase
// 2. Keep Searching - If you make wrong selection.
// 3. Congrates, You found [Character Name] - If you pick correct character
export const CheckStatus = React.memo(
  ({ status, backgroundColor }: CheckStatusProps) => {
    useEffect(() => {
      document.documentElement.style.setProperty(
        "--background-color",
        `${backgroundColor}`
      );
    }, [backgroundColor]);
    return (
      <div className="status-checker">
        <p>{status}</p>
      </div>
    );
  }
);

interface LogoutProps {
  setNames: React.Dispatch<
    React.SetStateAction<
      {
        data: DocumentData;
        id: string;
      }[]
    >
  >;
  userData: {
    name: string;
    profileUrl: string;
  };
  signOut: () => void;
  setConsoleName: React.Dispatch<React.SetStateAction<string>>;
}

// Component displays an avatar from Google or Facebook of signed in user.
// Shows user first name and log out button if avatar is clicked.
export const Logout = React.memo(
  ({ userData, signOut, setNames, setConsoleName }: LogoutProps) => {
    const [toggleLogout, setToggleLogOut] = useState(false);
    const firstName = userData.name.split(" ")[0];

    return (
      <div className="dashboard-header">
        <h1>
          <Link
            to={"/leader-board"}
            onClick={() => {
              getAllNamesFromDatabase(setNames);
              setConsoleName("Overall");
            }}
          >
            Leaderboard
          </Link>
        </h1>
        <div className="logout-wrapper">
          <img
            src={
              userData.profileUrl && userData.profileUrl !== ""
                ? userData.profileUrl
                : profilePic
            }
            alt="Avatar"
            onClick={() => setToggleLogOut(toggleLogout ? false : true)}
          />
          {toggleLogout && (
            <div className="logout">
              <p>Hi, {firstName}.</p>
              <button onClick={signOut}>Log Out</button>
            </div>
          )}
        </div>
      </div>
    );
  }
);

interface HiddenFolksProps {
  hiddenFolks: hiddenFolksType[];
}
// This component is responsible for displaying the hidden character to search for in header
export const HiddenFolks = React.memo(
  ({ hiddenFolks }: HiddenFolksProps): JSX.Element => {
    const Folks = hiddenFolks?.map(
      (folk, index): JSX.Element => (
        <div key={index}>
          <img
            src={folk.url}
            alt={folk.Name}
            width={folk.Name === "Tommy" || folk.Name === "Aurthur" ? 25 : 40}
          />
          <p>{folk.Name}</p>
        </div>
      )
    );
    return <div className="hidden-folks">{Folks}</div>;
  }
);

interface FolksAndTimerProps {
  backgroundColor: string;
  checkStatus: string;
  foundAllFolks: boolean;
  hiddenFolks: hiddenFolksType[];
  setPlayTime: React.Dispatch<
    React.SetStateAction<{
      hr: number;
      min: number;
      sec: number;
    }>
  >;
}

export const FolksAndTimer = React.memo(
  ({
    backgroundColor,
    checkStatus,
    hiddenFolks,
    foundAllFolks,
    setPlayTime,
  }: FolksAndTimerProps) => {
    const [showInfo, setShowInfo] = useState(false);
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
      document.documentElement.style.setProperty("--padding", "20px 0");
    }, []);

    useEffect(() => {
      if (foundAllFolks) {
        setPlayTime({ hr: time.hours, min: time.minutes, sec: time.seconds });
        return;
      }
      const interval = setInterval(
        setGameTimer.bind(null, { setTime, time }),
        1000
      );
      return () => clearInterval(interval);
    }, [time, foundAllFolks]);

    return (
      <div className="folks-and-timer">
        <h1>
          <Link to={"/dashboard"}>
            <img src={home} alt="Home" />
          </Link>
          <Link to={"/dashboard"}>Home</Link>
        </h1>
        <div>
          <p onClick={() => setShowInfo(showInfo ? false : true)}>INFO</p>
          {showInfo && <PhoneMenu time={time} hiddenFolks={hiddenFolks} />}
        </div>
        {checkStatus !== "" && (
          <CheckStatus status={checkStatus} backgroundColor={backgroundColor} />
        )}
        <HiddenFolks hiddenFolks={hiddenFolks} />
        <h2 className="timer">
          <FormatTimeToString
            hours={time.hours}
            minutes={time.minutes}
            seconds={time.seconds}
          />
        </h2>
      </div>
    );
  }
);

interface PhoneMenuProps {
  hiddenFolks: hiddenFolksType[];
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}
// This displays a drop down menu with list of hidden characters to
// search for. This displays only on mobile view or devices with smaller
// screen size
const PhoneMenu = React.memo(({ hiddenFolks, time }: PhoneMenuProps) => {
  return (
    <div>
      <HiddenFolks hiddenFolks={hiddenFolks} />
      <h2 className="timer">
        <FormatTimeToString
          hours={time.hours}
          minutes={time.minutes}
          seconds={time.seconds}
        />
      </h2>
    </div>
  );
});
