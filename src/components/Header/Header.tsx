import styled from "styled-components";

const StyledHeader = styled.header`
  padding: 5px;
  display: flex;
  padding: 20px 25px;
  align-items: center;
  border-bottom: 2px solid;
  background-color: #292123;
  justify-content: space-between;
  
  button {
    border: none;
    height: 30px;
    color: white;
    padding: 0px 15px;
    border-radius: 5px;
    background-color: #6c757d;
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <h1>Where's Waldo</h1>
      <button>Log Out</button>
    </StyledHeader>
  );
}
