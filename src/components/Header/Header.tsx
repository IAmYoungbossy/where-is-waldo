import { hiddenFolksType } from "../App/App";
import { CheckStatus } from "../Main/SwipeEffect/MapImage/MapImage";
import { StyledHeader } from "./Header.styled";

type FolksProps = {
  hiddenFolks?: hiddenFolksType[];
  name?: string;
  signOut?: () => void;
  avatar?: string | null | undefined;
  checkStatus?: string;
  background?: string;
};

export default function Header({
  hiddenFolks,
  name,
  signOut,
  avatar,
  checkStatus,
  background,
}: FolksProps): JSX.Element {
  const StatusLoading = () => {
    if (checkStatus !== undefined && background !== undefined)
      return <CheckStatus status={checkStatus} background={background} />;
    else return null;
  };

  return (
    <StyledHeader>
      <h1>Hidden Folks</h1>
      <Folks hiddenFolks={hiddenFolks} />
      <div>
        <div>{avatar && <img src={avatar} alt="Avatar" />}</div>
        <p>{name}</p>
        {name && <button onClick={signOut}>Log Out</button>}
      </div>
      {checkStatus !== "" && <StatusLoading />}
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
