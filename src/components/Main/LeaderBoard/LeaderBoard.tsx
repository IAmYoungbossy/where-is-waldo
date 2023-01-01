import { useState } from "react";
import Header, { TimeString } from "../../Header/Header";
import { StyledMain } from "../Main.styled";
import { StyledTable } from "./LeaderBoard.style";
import { DocumentData } from "firebase/firestore";
import {
  getAllNamesFromDatabase,
  getNamesFromDatabase,
} from "../../utilities/addToFirebase";

interface ConsoleLeaderboardProps {
  setNames: React.Dispatch<
    React.SetStateAction<{ data: DocumentData; id: string }[]>
  >;
}

const ConsoleLeaderBoard = ({ setNames }: ConsoleLeaderboardProps) => {
  return (
    <>
      <div>
        <button onClick={() => getNamesFromDatabase("N64", setNames)}>
          N64
        </button>
        <button onClick={() => getNamesFromDatabase("PS1", setNames)}>
          PS1
        </button>
        <button onClick={() => getNamesFromDatabase("PS2", setNames)}>
          PS2
        </button>
        <button onClick={() => getNamesFromDatabase("PS4", setNames)}>
          PS4
        </button>
        <button onClick={() => getNamesFromDatabase("LocNar", setNames)}>
          Loc Nar
        </button>
        <button onClick={() => getNamesFromDatabase("Dreamcast", setNames)}>
          Dreamcast
        </button>
      </div>
      <div>
        <button onClick={() => getAllNamesFromDatabase(setNames)}>
          Overall
        </button>
      </div>
    </>
  );
};

const Table = () => {
  const [names, setNames] = useState<{ data: DocumentData; id: string }[]>([]);

  return (
    <StyledMain>
      <StyledTable>
        <h3>Global Leader Board</h3>
        <ConsoleLeaderBoard setNames={setNames} />
        <table>
          <thead>
            <tr>
              <th>
                Place <span>(N64)</span>
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
                  <TimeString
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

export const LeaderBoard = () => {
  return (
    <>
      <Header />
      <Table />
    </>
  );
};
