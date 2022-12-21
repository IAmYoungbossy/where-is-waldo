import styled from "styled-components";

export const StyledHeader = styled.header`
  z-index: 1;
  display: flex;
  position: fixed;
  padding: 20px 25px;
  align-items: center;
  border-bottom: 2px solid;
  background-color: #040610;
  width: -webkit-fill-available;
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
