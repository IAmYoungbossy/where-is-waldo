import "./LeaderBoard.css";
import {
  getAllNamesFromDatabase,
  getNamesFromDatabase,
} from "../../utilities/firebaseCRUD";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import { DocumentData } from "firebase/firestore";
import { FormatTimeToString } from "../../FormatTimeToString/FormatTimeToString";

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
const DisplayLeaderboardButtons = ({
  setNames,
  gameImage,
  setConsoleName,
}: DisplayLeaderboardButtonsProps) => {
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
};

interface TableProps {
  consoleName: string;
  setConsoleName: React.Dispatch<React.SetStateAction<string>>;
  setNames: React.Dispatch<
    React.SetStateAction<
      {
        data: DocumentData;
        id: string;
      }[]
    >
  >;
  names: {
    data: DocumentData;
    id: string;
  }[];
  gameImage: {
    name: string;
    url: string;
  }[];
}

const Table = ({
  names,
  setNames,
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
          setNames={setNames}
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
            {names.map((name, index) => (
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
};

export const LeaderBoard = ({
  names,
  setNames,
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
        names={names}
        gameImage={gameImage}
        setNames={setNames}
        consoleName={consoleName}
        setConsoleName={setConsoleName}
      />
    </>
  );
};
