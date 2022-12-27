import styled from "styled-components";

export const StyledForm = styled.form`
  gap: 5px;
  width: 100%;
  margin: auto;
  padding: 25px;
  display: flex;
  /* margin-top: 10vh; */
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

    a {
      text-decoration: none;
    }
  }

  button:first-of-type {
    color: white;
    font-weight: 600;
    background-color: #0d6efd;
  }

  button:nth-of-type(2),
  button:nth-of-type(3) {
    gap: 10px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: flex-start;
    span {
      padding: 0 0 0 50px;
    }
    svg {
      position: absolute;
      left: 10px;
      height: 2.5rem;
      width: 2.5rem;
    }
  }

  p {
    margin: auto;
    font-size: 1rem;

    a {
      color: white;
      text-decoration: none;
    }

    span {
      color: #0d6efd;

      a {
        color: cadetblue;
        text-decoration: underline;
      }
    }
  }

  div {
    display: flex;
    padding-top: 5px;
    background-color: #00008b36;

    button {
      width: 100px;
      padding: 0;
      background-color: #02122a00 !important;

      svg {
        height: 2.5rem;
        width: 2.5rem;
        border-radius: 50%;
        box-shadow: 1px 1px 7px 0px black;
      }

      svg:last-of-type {
        color: white;
      }
    }
  }
`;
