import styled from "styled-components";

export const StyledTable = styled.div`
  width: 100%;
  display: flex;
  overflow-x: auto;
  max-width: 800px;
  margin-bottom: 50px;
  align-items: center;
  align-self: self-start;
  flex-direction: column;
  font-family: sans-serif;

  & > h3 {
    padding: 5px;
    text-decoration: underline;
    text-decoration-thickness: 4px;
    text-decoration-color: darkseagreen;
  }

  & > div:last-of-type > button {
    margin-bottom: 25px;
  }

  & > div:first-of-type {
    gap: 10px;
    width: 100%;
    padding: 2px;
    display: flex;
    flex-wrap: wrap;
    margin: 50px 0 0 0;

    & > button:first-of-type {
      background-color: #bd3b39;
    }
    & > button:nth-child(2) {
      background-color: #48428a;
    }
    & > button:nth-child(3) {
      background-color: #359e4a;
    }
    & > button:nth-child(4) {
      background-color: #007aff;
    }
    & > button:nth-child(5) {
      background-color: #6c757d;
    }
    & > button:nth-child(6) {
      background-color: #218cb8;
    }
  }

  & > div:nth-child(2) {
    margin: 25px 0;
  }

  & button {
    flex: 1;
    color: white;
    border: none;
    margin: auto;
    padding: 10px;
    min-width: 95px;
    cursor: pointer;
    max-width: 132px;
    font-weight: bold;
    border-radius: 10px;
    outline: 1px solid black;
    background-color: darkmagenta;
  }

  & button:active {
    outline: 2px solid white;
  }
  & button:hover {
    background-color: black !important;
  }

  table {
    width: 100%;
    border-spacing: 0;
    border: 1px solid #ddd;
    border-collapse: collapse;
    background-color: #000318bd;

    th,
    td {
      padding: 8px;
      text-align: left;
    }

    th {
      color: #a9ff8d;
      background-color: #301c1c;
    }

    td span {
      font-weight: 900;
      font-size: 1.1rem;
    }

    td sup {
      font-size: 0.7rem;
    }

    tr:nth-child(even) {
      background-color: #301c1c;
    }
  }

  table span {
    color: #20e7d5;
  }
`;

export const StyledHeaderTag = styled.h1`
  padding: 20px;
  & > a {
    color: white;
    text-decoration: none;
  }
`;
