import Footer from "../../Footer/Footer";
import Header from "../../Header/Header";

const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={2}>The table header</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>The table body</td>
          <td>with two columns</td>
        </tr>
      </tbody>
    </table>
  );
};

export const LeaderBoard = () => {
  return (
    <>
      <Header />
      <Table />
      <Footer />
    </>
  );
};
