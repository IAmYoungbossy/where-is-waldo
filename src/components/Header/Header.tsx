import { hiddenFolksType } from "../App/App";
import { StyledHeader } from "./Header.styled";

type FolksProps = {
  hiddenFolks: hiddenFolksType[];
};

export default function Header({ hiddenFolks }: FolksProps): JSX.Element {
  return (
    <StyledHeader>
      <h1>Hidden Folks</h1>
      <Folks hiddenFolks={hiddenFolks} />
      <button>Log Out</button>
    </StyledHeader>
  );
}

function Folks({ hiddenFolks }: FolksProps): JSX.Element {
  const HiddenFolks = hiddenFolks.map(
    (folk, index): JSX.Element => (
      <div key={index}>
        <img src={folk.url} alt={folk.Name} />
        <p>{folk.Name}</p>
      </div>
    )
  );

  return <div>{HiddenFolks}</div>;
}
