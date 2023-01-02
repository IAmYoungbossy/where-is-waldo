interface setGameTimerProps {
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

// This calculates how long a game takes to find all characters
export const setGameTimer = ({ setTime, time }: setGameTimerProps) => {
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
};
