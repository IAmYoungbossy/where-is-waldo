import Header from "../../Header/Header";
import { StyledMain } from "../Main.styled";
import { StyledTable } from "./LeaderBoard.style";

const ConsoleLeaderBoard = () => {
  return (
    <>
      <div>
        <button>N64</button>
        <button>PS1</button>
        <button>PS2</button>
        <button>PS4</button>
        <button>Loc Nar</button>
        <button>Dreamcast</button>
      </div>
      <div>
        <button>Overall</button>
      </div>
    </>
  );
};

const Table = () => {
  return (
    <StyledMain>
      <StyledTable>
        <h3>Global Leader Board</h3>
        <ConsoleLeaderBoard />
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
            <tr>
              <td>1</td>
              <td>The Coded Boss</td>
              <td>00 : 02 : 21</td>
              <td>Nov 13 2022</td>
            </tr>
            <tr>
              <td>1</td>
              <td>The Coded Boss</td>
              <td>00 : 02 : 21</td>
              <td>Nov 13 2022</td>
            </tr>
            <tr>
              <td>1</td>
              <td>The Coded Boss</td>
              <td>00 : 02 : 21</td>
              <td>Nov 13 2022</td>
            </tr>
            <tr>
              <td>1</td>
              <td>The Coded Boss</td>
              <td>00 : 02 : 21</td>
              <td>Nov 13 2022</td>
            </tr>
            <tr>
              <td>1</td>
              <td>The Coded Boss</td>
              <td>00 : 02 : 21</td>
              <td>Nov 13 2022</td>
            </tr>
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
