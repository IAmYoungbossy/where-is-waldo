import { hiddenFolksType } from "../../../../App/App";
import { StyledTimer, TimeString } from "../../../../Header/Header";
import { addNameToTable } from "../../../../utilities/addToFirebase";
import { useState } from "react";
import { StyledPlayTime } from "./ReportPlayTime.style";

interface ReportPlayTimeProps {
  hours: number;
  minutes: number;
  seconds: number;
  hiddenFolks: hiddenFolksType[];
}

const getTotalTimeInSeconds = (
  hours: number,
  minutes: number,
  seconds: number
) => {
  const hr = hours !== 0 ? hours * 60 * 60 : 0;
  const min = minutes !== 0 ? minutes * 60 : 0;
  const sec = seconds;
  return hr + min + sec;
};

export const ReportPlayTime = ({
  hours,
  minutes,
  seconds,
  hiddenFolks,
}: ReportPlayTimeProps) => {
  const [name, setName] = useState("");

  const gameConsoleName = hiddenFolks[0].imageName;
  const totalTimeInSeconds = getTotalTimeInSeconds(hours, minutes, seconds);
  const handleSubmition = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addNameToTable(
      gameConsoleName,
      name,
      `${hours}`,
      `${minutes}`,
      `${seconds}`,
      totalTimeInSeconds
    );
    e.currentTarget.reset();
  };

  return (
    <StyledPlayTime>
      <div>
        <div>
          <div>
            You Finished in{" "}
            {
              <StyledTimer padding="0px">
                {
                  <TimeString
                    hours={hours}
                    minutes={minutes}
                    seconds={seconds}
                  />
                }
              </StyledTimer>
            }
          </div>
        </div>
        <div>
          <p>Submit your score on the global leaderboard!</p>
          <div>
            <form onSubmit={handleSubmition}>
              <div>
                <label htmlFor="name">Enter Name:</label>
                <input
                  type="name"
                  id="name"
                  placeholder="Letam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <button type="button">Cancel</button>
                <button type="submit">Submit Score</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </StyledPlayTime>
  );
};
