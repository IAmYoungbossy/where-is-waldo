/* eslint-disable react-hooks/exhaustive-deps */
import { Link } from "react-router-dom";
import { hiddenFolksType } from "../App/App";
import {
  StyledHeader,
  StyledStatusChecker,
  StyledTimer,
} from "./Header.styled";
import { FormatTimeToString } from "../FormatTimeToString/FormatTimeToString";

type FolksProps = {
  hiddenFolks?: hiddenFolksType[];
  name?: string;
  signOut?: () => void;
  avatar?: string | null | undefined;
  checkStatus?: string;
  background?: string;
  time?: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  leaderboard?: string;
};

interface TimerProps {
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const Timer = ({ time }: TimerProps) => {
  return (
    <StyledTimer padding="20px">
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

export default function Header({
  name,
  time,
  avatar,
  signOut,
  background,
  hiddenFolks,
  checkStatus,
  leaderboard,
}: FolksProps): JSX.Element {
  // This handles when a character is clicked, it shows the three stages
  // of validating the character. Checking, Error Msg or Success Msg
  const StatusLoading = () => {
    if (checkStatus !== undefined && background !== undefined)
      return <CheckStatus status={checkStatus} background={background} />;
    else return null;
  };

  // This makes sure the timer appears only when image is loaded and ready to play
  const DisplayTime = () => {
    if (time !== undefined) {
      return <Timer time={time} />;
    } else return null;
  };

  // This controls what appears in the h1 tag.
  const HeaderContent = () => {
    if (avatar)
      return (
        <h1>
          <Link to="/leader-board">Leaderboard</Link>
        </h1>
      );
    else if (hiddenFolks || leaderboard)
      return (
        <h1>
          <Link to="/dashboard">Home</Link>
        </h1>
      );
    else return <h1>HiddenFolks</h1>;
  };

  return (
    <StyledHeader spaceBetween={hiddenFolks ? "space-evenly" : "space-between"}>
      {<HeaderContent />}
      <Folks hiddenFolks={hiddenFolks} />
      {avatar && (
        <div>
          <div>
            <img
              src={avatar}
              alt="Avatar"
              width="40px"
              style={{ borderRadius: "50px" }}
            />
          </div>
          <p>{name}</p>
          {name && <button onClick={signOut}>Log Out</button>}
        </div>
      )}
      {hiddenFolks && <DisplayTime />}
      {checkStatus !== "" && <StatusLoading />}
    </StyledHeader>
  );
}

// This component is responsible for displaying the hidden character in header
function Folks({ hiddenFolks }: FolksProps): JSX.Element {
  const HiddenFolks = hiddenFolks?.map(
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

  return <div>{HiddenFolks}</div>;
}
