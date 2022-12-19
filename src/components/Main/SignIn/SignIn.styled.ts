import styled from "styled-components";

export const StyledForm = styled.form`
  gap: 5px;
  width: 100%;
  margin: auto;
  padding: 25px;
  display: flex;
  margin-top: 10vh;
  max-width: 350px;
  font-family: cursive;
  flex-direction: column;
  box-shadow: 0px 2px 20px 2px black;
  background-color: rgb(25 48 209 / 20%);

  input {
    width: 100%;
    margin: auto;
    padding: 10px;
    max-width: 300px;
  }

  button {
    width: 100%;
    border: none;
    margin: auto;
    padding: 10px;
    color: #7777a7;
    font-size: 1rem;
    max-width: 300px;
  }

  button:last-of-type {
    color: black;
    font-weight: 900;
    background-color: #ffc107;
  }

  button:first-of-type {
    color: white;
    font-weight: 600;
    background-color: #0d6efd;
  }

  p {
    margin: auto;
    margin-top: 10px;
    font-size: 1.1rem;

    span {
      color: #0d6efd;
    }
  }
`;
