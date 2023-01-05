import styled from "styled-components";

export const StyledPlayTime = styled.div`
  z-index: 10;
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: flex;
  position: fixed;
  align-items: center;
  background: #000000ad;
  font-family: monospace;
  justify-content: center;
  & > div {
    width: 100%;
    padding: 0 10px;
    max-width: 350px;
    background: #222;
    border-radius: 5px;

    & > div:first-of-type {
      font-size: 1rem;
      font-weight: bold;
      padding: 10px 0px;
      text-align: center;
    }

    & > div:last-of-type {
      border-top: 1px solid white;

      p {
        font-weight: 900;
        padding: 10px 0px;
        font-size: 0.85rem;
      }

      & form > div:first-of-type {
        display: flex;
        flex-direction: column;
      }

      & form > div:last-child {
        display: flex;
        padding: 10px 0px;
        margin-top: 20px;
        justify-content: flex-end;
        border-top: 1px solid white;
      }

      form button {
        padding: 5px;
        color: white;
        border: none;
        cursor: pointer;
        margin-left: 5px;
        background-color: #eb3d3d;
      }

      form button:last-child {
        background-color: #414141;
      }

      form input {
        color: white;
        padding: 10px;
        outline: none;
        margin-top: 5px;
        background-color: #222;
        border: 1px solid white;
      }

      form a {
        color: white;
        text-decoration: none;
      }

      form span {
        color: yellow;
      }

      form input:not(:placeholder-shown) {
        background-color: #222;
      }

      form label {
        font-weight: bold;
        font-size: 0.8rem;
      }
    }
  }
`;
