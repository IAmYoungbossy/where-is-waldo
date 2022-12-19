import { StyledHeader } from "./Header.styled";

export default function Header():JSX.Element {
  return (
    <StyledHeader>
      <h1>Where's Waldo</h1>
      <button>Log Out</button>
    </StyledHeader>
  );
}
