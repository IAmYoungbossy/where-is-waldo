/* eslint-disable react-hooks/exhaustive-deps */
import {
  StyledTimer,
  StyledHeader,
  StyledLogout,
  StyledHiddenFolks,
  StyledSignInHeader,
  StyledLogoutWrapper,
  StyledFolksAndTimer,
  StyledStatusChecker,
  StyledDashboardHeader,
} from "./Header.styled";
import { useState } from "react";
import { Link } from "react-router-dom";
import HomePng from "../assets/home.png";
import { hiddenFolksType } from "../App/App";
import { DocumentData } from "firebase/firestore";
import { getAllNamesFromDatabase } from "../utilities/firebaseCRUD";
import { FormatTimeToString } from "../FormatTimeToString/FormatTimeToString";
import ProfilePic from "../assets/dp.png";

interface HeaderProps {
  children?: JSX.Element;
}
// Header container with general header styling for all pages
export default function Header({ children }: HeaderProps) {
  return <StyledHeader>{children}</StyledHeader>;
}

// Header content for sign in page with its styling.
export const SignInHeader = () => {
  return (
    <StyledSignInHeader>
      <h1>HiddenFolks</h1>
    </StyledSignInHeader>
  );
};

interface TimerProps {
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}
// This component displays time for play duration
export const Timer = ({ time }: TimerProps) => {
  return (
    <StyledTimer padding="20px 0">
      {
        <FormatTimeToString
          hours={time.hours}
          minutes={time.minutes}
          seconds={time.seconds}
        />
      }
    </StyledTimer>
  );
};

interface CheckStatusProps {
  status: string;
  background: string;
}
// This component shows the three stages of validation when you click a character.
// 1. Checking - when getting details from firebase
// 2. Keep Searching - If you make wrong selection.
// 3. Congrates, You found [Character Name] - If you pick correct character
export const CheckStatus = ({ status, background }: CheckStatusProps) => {
  return (
    <StyledStatusChecker background={background}>
      <p>{status}</p>
    </StyledStatusChecker>
  );
};

interface LogoutProps {
  setNames: React.Dispatch<
    React.SetStateAction<
      {
        data: DocumentData;
        id: string;
      }[]
    >
  >;
  name: string;
  signOut: () => void;
  avatar: string | null | undefined;
  setConsoleName: React.Dispatch<React.SetStateAction<string>>;
}
// Component displays an avatar from Google or Facebook of signed in user.
// Shows user first name and log out button if avatar is clicked.
export const Logout = ({
  avatar,
  name,
  signOut,
  setNames,
  setConsoleName,
}: LogoutProps) => {
  const [toggleLogout, setToggleLogOut] = useState(false);
  const firstName = name?.split(" ")[0];

  return (
    <StyledDashboardHeader>
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
      <StyledLogoutWrapper>
        <img
          src={avatar ? avatar : ProfilePic}
          alt="Avatar"
          onClick={() => setToggleLogOut(toggleLogout ? false : true)}
        />
        {toggleLogout && (
          <StyledLogout>
            <p>Hi, {firstName}.</p>
            <button onClick={signOut}>Log Out</button>
          </StyledLogout>
        )}
      </StyledLogoutWrapper>
    </StyledDashboardHeader>
  );
};

interface HiddenFolksProps {
  hiddenFolks: hiddenFolksType[];
}
// This component is responsible for displaying the hidden character to search for in header
export const HiddenFolks = ({ hiddenFolks }: HiddenFolksProps): JSX.Element => {
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
  return <StyledHiddenFolks>{Folks}</StyledHiddenFolks>;
};

interface FolksAndTimerProps {
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  background: string;
  checkStatus: string;
  hiddenFolks: hiddenFolksType[];
}

export const FolksAndTimer = ({
  time,
  background,
  checkStatus,
  hiddenFolks,
}: FolksAndTimerProps) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <StyledFolksAndTimer>
      <h1>
        <Link to={"/dashboard"}>
          <img src={HomePng} alt="Home" />
        </Link>
        <Link to={"/dashboard"}>Home</Link>
      </h1>
      <div>
        <p onClick={() => setShowInfo(showInfo ? false : true)}>INFO</p>
        {showInfo && <PhoneMenu time={time} hiddenFolks={hiddenFolks} />}
      </div>
      {checkStatus !== "" && (
        <CheckStatus status={checkStatus} background={background} />
      )}
      <HiddenFolks hiddenFolks={hiddenFolks} />
      <Timer time={time} />
    </StyledFolksAndTimer>
  );
};

interface PhoneMenuProps {
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  hiddenFolks: hiddenFolksType[];
}
// This displays a drop down menu with list of hidden characters to
// search for. This displays only on mobile view or devices with smaller
// screen size
const PhoneMenu = ({ time, hiddenFolks }: PhoneMenuProps) => {
  return (
    <div>
      <HiddenFolks hiddenFolks={hiddenFolks} />
      <Timer time={time} />
    </div>
  );
};
