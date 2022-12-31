/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { hiddenFolksType } from "../App/App";
import { StyledHeader } from "./Header.styled";
import { CheckStatus } from "../Main/SwipeEffect/MapImage/MapImage";

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
};

export const StyledTimer = styled.h2<{ padding: string }>`
  padding: ${({ padding }) => padding};

  & span {
    font-size: 0.8rem;
    color: #00a2ff;
  }
`;

interface TimerProps {
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

interface TimeStringProps {
  hours: number;
  minutes: number;
  seconds: number;
}

export const TimeString = ({ hours, minutes, seconds }: TimeStringProps) => {
  const formatTime = (timeUnit: number) =>
    timeUnit < 10 ? `0${timeUnit}` : `${timeUnit}`;
  const hour = formatTime(hours);
  const minute = formatTime(minutes);
  const second = formatTime(seconds);
  return (
    <p>
      {`${hour}`}
      <span>hr</span>
      {`${minute}`}
      <span>min</span>
      {`${second}`}
      <span>sec</span>
    </p>
  );
};

const Timer = ({ time }: TimerProps) => {
  return (
    <StyledTimer padding="20px">
      {
        <TimeString
          hours={time.hours}
          minutes={time.minutes}
          seconds={time.seconds}
        />
      }
    </StyledTimer>
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
}: FolksProps): JSX.Element {
  const StatusLoading = () => {
    if (checkStatus !== undefined && background !== undefined)
      return <CheckStatus status={checkStatus} background={background} />;
    else return null;
  };

  const DisplayTime = () => {
    if (time !== undefined) {
      return <Timer time={time} />;
    } else return null;
  };

  return (
    <StyledHeader spaceBetween={hiddenFolks ? "space-evenly" : "space-between"}>
      <h1>Hidden Folks</h1>
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

function Folks({ hiddenFolks }: FolksProps): JSX.Element {
  const HiddenFolks = hiddenFolks?.map(
    (folk, index): JSX.Element => (
      <div key={index}>
        <img
          src={folk.url}
          alt={folk.Name}
          width={folk.Name === "Tommy" || folk.Name === "Aurthur" ? 26 : 40}
        />
        <p>{folk.Name}</p>
      </div>
    )
  );

  return <div>{HiddenFolks}</div>;
}
