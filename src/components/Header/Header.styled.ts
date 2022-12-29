import styled from "styled-components";

export const StyledHeader = styled.header`
  z-index: 1;
  display: flex;
  position: fixed;
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

  div {
    gap: 5px;
    display: flex;
    align-items: center;
  }

  h1 {
    padding: 20px;
  }

  /* Div container for all hidden folks */
  div {
    gap: 5px;
    display: flex;

    /* Div for each hidden folks */
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      /* Hidden folk image */
      img {
        width: 40px;
        transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        &:hover {
          width: 90px;
        }
      }
    }
  }
`;
