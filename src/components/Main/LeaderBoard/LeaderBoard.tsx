import {
  getAllNamesFromDatabase,
  getNamesFromDatabase,
} from "../../utilities/firebaseCRUD";
import { consoleImages } from "../Main";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import { StyledMain } from "../Main.styled";
import { DocumentData } from "firebase/firestore";
import { StyledHeaderTag, StyledTable } from "./LeaderBoard.style";
import { FormatTimeToString } from "../../FormatTimeToString/FormatTimeToString";

interface DisplayLeaderboardButtonsProps {
  setConsoleName: React.Dispatch<React.SetStateAction<string>>;
  setNames: React.Dispatch<
    React.SetStateAction<{ data: DocumentData; id: string }[]>
  >;
}
// This displays table for each consoles depending on the button clicked
const DisplayLeaderboardButtons = ({
  setNames,
  setConsoleName,
}: DisplayLeaderboardButtonsProps) => {
  return (
    <>
      <div>
        {consoleImages.map((image) => (
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
}

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
        <DisplayLeaderboardButtons
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
      <Header>
        <StyledHeaderTag>
          <Link to={"/dashboard"}>Home</Link>
        </StyledHeaderTag>
      </Header>
      <Table
        names={names}
        setNames={setNames}
        consoleName={consoleName}
        setConsoleName={setConsoleName}
      />
    </>
  );
};