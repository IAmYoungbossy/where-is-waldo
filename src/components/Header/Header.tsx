import { hiddenFolksType } from "../App/App";
import { StyledHeader } from "./Header.styled";

type FolksProps = {
  hiddenFolks?: hiddenFolksType[];
  name?: string;
  signOut?: () => void;
  avatar?: string | null | undefined;
};

export default function Header({
  hiddenFolks,
  name,
  signOut,
  avatar,
}: FolksProps): JSX.Element {
  return (
    <StyledHeader>
      <h1>Hidden Folks</h1>
      <Folks hiddenFolks={hiddenFolks} />
      <div>
        <div>{avatar && <img src={avatar} alt="Avatar" />}</div>
        <p>{name}</p>
        {name && <button onClick={signOut}>Log Out</button>}
      </div>
    </StyledHeader>
  );
}

function Folks({ hiddenFolks }: FolksProps): JSX.Element {
  const HiddenFolks = hiddenFolks?.map(
    (folk, index): JSX.Element => (
      <div key={index}>
        <img src={folk.url} alt={folk.Name} />
        <p>{folk.Name}</p>
      </div>
    )
  );

  return <div>{HiddenFolks}</div>;
}
