/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { hiddenFolksType } from "../App/App";
import {
  StyledDashboardHeader,
  StyledFolksAndTimer,
  StyledHeader,
  StyledHiddenFolks,
  StyledLogout,
  StyledLogoutWrapper,
  StyledSignInHeader,
  StyledStatusChecker,
  StyledTimer,
} from "./Header.styled";
import { FormatTimeToString } from "../FormatTimeToString/FormatTimeToString";
import { useState } from "react";
import HomePng from "../assets/home.png";

interface HeaderProps {
  children?: JSX.Element;
}

export default function Header({ children }: HeaderProps) {
  return <StyledHeader>{children}</StyledHeader>;
}

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

export const CheckStatus = ({ status, background }: CheckStatusProps) => {
  return (
    <StyledStatusChecker background={background}>
      <p>{status}</p>
    </StyledStatusChecker>
  );
};

interface LogoutProps {
  name: string;
  avatar: string | null | undefined;
  signOut: () => void;
}

export const Logout = ({ avatar, name, signOut }: LogoutProps) => {
  const [toggleLogout, setToggleLogOut] = useState(false);
  const firstName = name?.split(" ")[0];

  if (avatar !== null && avatar !== undefined)
    return (
      <StyledDashboardHeader>
        <h1>
          <Link to={"/leader-board"}>Leaderboard</Link>
        </h1>
        <StyledLogoutWrapper>
          <img
            src={avatar}
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
  else return null;
};

// This component is responsible for displaying the hidden character in header
export const HiddenFolks = ({
  hiddenFolks,
}: {
  hiddenFolks: hiddenFolksType[];
}): JSX.Element => {
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
        <img src={HomePng} alt="Home" />
        <Link to={"/dashboard"}>Home</Link>
      </h1>
      <div>
        <p onClick={() => setShowInfo(showInfo ? false : true)}>Info</p>
        {showInfo && <PhoneMenu time={time} hiddenFolks={hiddenFolks} />}
      </div>
      {/* <CheckStatus status={checkStatus} background={background} /> */}
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

const PhoneMenu = ({ time, hiddenFolks }: PhoneMenuProps) => {
  return (
    <div>
      <HiddenFolks hiddenFolks={hiddenFolks} />
      <Timer time={time} />
    </div>
  );
};
