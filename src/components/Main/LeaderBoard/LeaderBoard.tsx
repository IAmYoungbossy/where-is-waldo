import Header from "../../Header/Header";
import { StyledMain } from "../Main.styled";
import { StyledTable } from "./LeaderBoard.style";
import { DocumentData } from "firebase/firestore";
import {
  getAllNamesFromDatabase,
  getNamesFromDatabase,
} from "../../utilities/firebaseCRUD";
import { FormatTimeToString } from "../../FormatTimeToString/FormatTimeToString";

interface ConsoleLeaderboardProps {
  setConsoleName: React.Dispatch<React.SetStateAction<string>>;
  setNames: React.Dispatch<
    React.SetStateAction<{ data: DocumentData; id: string }[]>
  >;
}

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
}

const ConsoleLeaderBoard = ({
  setNames,
  setConsoleName,
}: ConsoleLeaderboardProps) => {
  return (
    <>
      <div>
        <button
          onClick={() => {
            getNamesFromDatabase("N64", setNames);
            setConsoleName("N64");
          }}
        >
          N64
        </button>
        <button
          onClick={() => {
            getNamesFromDatabase("PS1", setNames);
            setConsoleName("PS1");
          }}
        >
          PS1
        </button>
        <button
          onClick={() => {
            getNamesFromDatabase("PS2", setNames);
            setConsoleName("PS2");
          }}
        >
          PS2
        </button>
        <button
          onClick={() => {
            getNamesFromDatabase("PS4", setNames);
            setConsoleName("PS4");
          }}
        >
          PS4
        </button>
        <button
          onClick={() => {
            getNamesFromDatabase("LocNar", setNames);
            setConsoleName("Loc Nar");
          }}
        >
          Loc Nar
        </button>
        <button
          onClick={() => {
            getNamesFromDatabase("Dreamcast", setNames);
            setConsoleName("Dreamcast");
          }}
        >
          Dreamcast
        </button>
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

const Table = ({
  names,
  setNames,
  consoleName,
  setConsoleName,
}: TableProps) => {
  return (
    <StyledMain>
      <StyledTable>
        <h3>Global Leader Board</h3>
        <ConsoleLeaderBoard
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
              <th>Date</th>
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
                <td>Nov 13 2022</td>
              </tr>
            ))}
          </tbody>
        </table>
      </StyledTable>
    </StyledMain>
  );
};

export const LeaderBoard = ({
  names,
  setNames,
  consoleName,
  setConsoleName,
}: TableProps) => {
  return (
    <>
      <Header leaderboard="yes" />
      <Table
        names={names}
        setNames={setNames}
        consoleName={consoleName}
        setConsoleName={setConsoleName}
      />
    </>
  );
};
