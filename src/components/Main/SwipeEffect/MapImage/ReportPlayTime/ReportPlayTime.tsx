import { useEffect, useState } from "react";
import "../../../../Header/Header.css";
import "./ReportPlayTime.css";
import {
  addNameToDatabase,
  getNamesFromDatabase,
} from "../../../../utilities/firebaseCRUD";
import { DocumentData } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { hiddenFolksType } from "../../../../App/App";
import { FormatTimeToString } from "../../../../FormatTimeToString/FormatTimeToString";
import React from "react";

interface ReportPlayTimeProps {
  setConsoleName: React.Dispatch<React.SetStateAction<string>>;
  hours: number;
  minutes: number;
  seconds: number;
  hiddenFolks: hiddenFolksType[];
  setPlayerName: React.Dispatch<
    React.SetStateAction<
      {
        data: DocumentData;
        id: string;
      }[]
    >
  >;
  alt: string;
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

export const ReportPlayTime = React.memo(
  ({
    hours,
    minutes,
    seconds,
    hiddenFolks,
    setPlayerName,
    alt,
    setConsoleName,
  }: ReportPlayTimeProps) => {
    const [name, setName] = useState("");
    const [nameErrorMsg, setNameErrorMsg] = useState(false);

    const navigate = useNavigate();
    const gameConsoleName = hiddenFolks[0].imageName;
    const totalTimeInSeconds = getTotalTimeInSeconds(hours, minutes, seconds);

    const handleSubmition = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (name.trim() === "") {
        setNameErrorMsg(true);
        setTimeout(() => setNameErrorMsg(false), 2000);
        return;
      }

      addNameToDatabase(
        gameConsoleName,
        name,
        `${hours}`,
        `${minutes}`,
        `${seconds}`,
        totalTimeInSeconds
      );
      navigate("/leader-board", { replace: true });
      getNamesFromDatabase(alt, setPlayerName);
      setConsoleName(alt);
    };

    useEffect(() => {
      document.documentElement.style.setProperty("--padding", "0 20px");
    }, []);

    return (
      <div className="play-time">
        <div>
          <div>
            <div>
              You Finished in{" "}
              {
                <h2 className="timer">
                  {
                    <FormatTimeToString
                      hours={hours}
                      minutes={minutes}
                      seconds={seconds}
                    />
                  }
                </h2>
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
                  {nameErrorMsg && <span>Please enter a valid name</span>}
                </div>
                <div>
                  <button type="button">
                    <Link to="/dashboard">Cancel</Link>
                  </button>
                  <button type="submit">Submit Score</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
