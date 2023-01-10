import "./LeaderBoard.css";
import {
  getAllNamesFromDatabase,
  getNamesFromDatabase,
} from "../../utilities/firebaseCRUD";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import { DocumentData } from "firebase/firestore";
import { FormatTimeToString } from "../../FormatTimeToString/FormatTimeToString";
import React from "react";

interface DisplayLeaderboardButtonsProps {
  setConsoleName: React.Dispatch<React.SetStateAction<string>>;
  setNames: React.Dispatch<
    React.SetStateAction<{ data: DocumentData; id: string }[]>
  >;
  gameImage: {
    name: string;
    url: string;
  }[];
}
// This displays table for each consoles depending on the button clicked
const DisplayLeaderboardButtons = React.memo(
  ({ setNames, gameImage, setConsoleName }: DisplayLeaderboardButtonsProps) => {
    return (
      <>
        <div>
          {gameImage.map((image) => (
            <button
              key={`${image.name}`}
              onClick={() => {
                getNamesFromDatabase(`${image.name}`, setNames);
                setConsoleName(`${image.name}`);
              }}
            >
              {image.name}
            </button>
          ))}
        </div>
        <div>
          <button
            onClick={() => {
              getAllNamesFromDatabase(setNames);
              setConsoleName("Overall");
            }}
          >
            Overall
          </button>
        </div>
      </>
    );
  }
);

interface TableProps {
  consoleName: string;
  setConsoleName: React.Dispatch<React.SetStateAction<string>>;
  setPlayerName: React.Dispatch<
    React.SetStateAction<
      {
        data: DocumentData;
        id: string;
      }[]
    >
  >;
  playerName: {
    data: DocumentData;
    id: string;
  }[];
  gameImage: {
    name: string;
    url: string;
  }[];
}

const Table = React.memo(
  ({
    playerName,
    setPlayerName,
    gameImage,
    consoleName,
    setConsoleName,
  }: TableProps) => {
    return (
      <main>
        <div className="table-container">
          <h3>Global Leader Board</h3>
          <DisplayLeaderboardButtons
            gameImage={gameImage}
            setNames={setPlayerName}
            setConsoleName={setConsoleName}
          />
          <table>
            <thead>
              <tr>
                <th>
                  Place <span>({consoleName})</span>
                </th>
                <th>Name</th>
                <th>
                  Score <span>(Time)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {playerName.map((name, index) => (
                <tr key={name.id}>
                  <td>{index + 1}</td>
                  <td>{name.data.Name}</td>
                  <td>
                    <FormatTimeToString
                      seperator="yes"
                      hours={parseInt(name.data.Hours)}
                      minutes={parseInt(name.data.Minutes)}
                      seconds={parseInt(name.data.Seconds)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    );
  }
);

export const LeaderBoard = React.memo(
  ({
    playerName,
    setPlayerName,
    gameImage,
    consoleName,
    setConsoleName,
  }: TableProps) => {
    return (
      <>
        <Header>
          <h1 className="header-tag">
            <Link to={"/dashboard"}>Home</Link>
          </h1>
        </Header>
        <Table
          playerName={playerName}
          gameImage={gameImage}
          setPlayerName={setPlayerName}
          consoleName={consoleName}
          setConsoleName={setConsoleName}
        />
      </>
    );
  }
);
