import styled from "styled-components";
import { useEffect, useState } from "react";
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
};

const StyledTimer = styled.h2`
  padding: 20px;

  & span {
    font-size: 0.8rem;
    color: #00a2ff;
  }
`;

const Timer = () => {
  // Declare a new state variable, which we'll call "time"
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
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
  }, [time]);

  const formatTime = (timeUnit: number) =>
    timeUnit < 10 ? `0${timeUnit}` : `${timeUnit}`;
  const hour = formatTime(time.hours);
  const minute = formatTime(time.minutes);
  const second = formatTime(time.seconds);
  const TimeString = () => {
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

  return <StyledTimer>{<TimeString />}</StyledTimer>;
};

export default function Header({
  hiddenFolks,
  name,
  signOut,
  avatar,
  checkStatus,
  background,
}: FolksProps): JSX.Element {
  const StatusLoading = () => {
    if (checkStatus !== undefined && background !== undefined)
      return <CheckStatus status={checkStatus} background={background} />;
    else return null;
  };

  return (
    <StyledHeader spaceBetween={hiddenFolks ? "space-evenly" : "space-between"}>
      <h1>Hidden Folks</h1>
      <Folks hiddenFolks={hiddenFolks} />
      {avatar && (
        <div>
          <div>
            <img src={avatar} alt="Avatar" />
          </div>
          <p>{name}</p>
          {name && <button onClick={signOut}>Log Out</button>}
        </div>
      )}
      {hiddenFolks && <Timer />}
      {checkStatus !== "" && <StatusLoading />}
    </StyledHeader>
  );
}

function Folks({ hiddenFolks }: FolksProps): JSX.Element {
  const HiddenFolks = hiddenFolks?.map(
    (folk, index): JSX.Element => (
      <div key={index}>
        <img src={folk.url} alt={folk.Name} />
        <p>{folk.Name}</p>
      </div>
    )
  );

  return <div>{HiddenFolks}</div>;
}
