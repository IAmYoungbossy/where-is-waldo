import styled from "styled-components";

export const StyledForm = styled.form`
  gap: 5px;
  margin: auto;
  padding: 25px;
  display: flex;
  margin-top: 100px;
  width: fit-content;
  font-family: cursive;
  flex-direction: column;
  background-color: rgb(25 48 209 / 9%);
  box-shadow: 0px 2px 20px 2px black;

  input {
    width: 300px;
    margin: auto;
    padding: 10px;
  }

  button {
    border: none;
    width: 300px;
    margin: auto;
    padding: 10px;
    color: #7777a7;
    font-size: 1rem;
  }

  button:first-of-type {
    color: white;
    font-weight: 600;
    background-color: #0d6efd;
  }

  button:last-of-type {
    color: black;
    font-weight: 900;
    background-color: #ffc107;
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
