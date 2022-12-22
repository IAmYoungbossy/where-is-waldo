import styled from "styled-components";
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

const FolkCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  img {
    width: 20px;
  }
`;

const FolksWrapper = styled.div`
  display: flex;
`;

function Folks({ hiddenFolks }: FolksProps): JSX.Element {
  const HiddenFolks = hiddenFolks.map(
    (folk, index): JSX.Element => (
      <FolkCard key={index}>
        <img src={folk.url} alt={folk.Name} />
        <h3>{folk.Name}</h3>
      </FolkCard>
    )
  );

  return <FolksWrapper>{HiddenFolks}</FolksWrapper>;
}
