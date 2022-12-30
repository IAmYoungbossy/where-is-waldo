/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useEffect } from "react";
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
  foundAllFolks?: boolean;
  time?: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  setTime?: React.Dispatch<
    React.SetStateAction<{
      hours: number;
      minutes: number;
      seconds: number;
    }>
  >;
};

export const StyledTimer = styled.h2<{ padding: string }>`
  padding: ${({ padding }) => padding};

  & span {
    font-size: 0.8rem;
    color: #00a2ff;
  }
`;

interface TimerProps {
  foundAllFolks?: boolean;
  time: {
    hours: number;
    minutes: number;
    seconds: number;
  };
  setTime: React.Dispatch<
    React.SetStateAction<{
      hours: number;
      minutes: number;
      seconds: number;
    }>
  >;
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

const Timer = ({ foundAllFolks, time, setTime }: TimerProps) => {
  useEffect(() => {
    if (foundAllFolks) return;
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
  setTime,
  background,
  hiddenFolks,
  checkStatus,
  foundAllFolks,
}: FolksProps): JSX.Element {
  const StatusLoading = () => {
    if (checkStatus !== undefined && background !== undefined)
      return <CheckStatus status={checkStatus} background={background} />;
    else return null;
  };

  const DisplayTime = () => {
    if (time !== undefined && setTime !== undefined) {
      return (
        <Timer foundAllFolks={foundAllFolks} time={time} setTime={setTime} />
      );
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
