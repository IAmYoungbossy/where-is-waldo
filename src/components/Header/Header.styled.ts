import styled from "styled-components";

export const StyledHeader = styled.header`
  z-index: 1;
  position: fixed;
  background-color: #222;
  width: -webkit-fill-available;
  border-bottom: 2px solid #909cff;
`;

export const StyledTimer = styled.h2<{ padding: string }>`
  padding: ${({ padding }) => padding};

  & span {
    font-size: 0.8rem;
    color: #00a2ff;
  }
`;

export const StyledStatusChecker = styled.div<{ background: string }>`
  top: 90px;
  width: 100%;
  color: white;
  padding: 2px 15px;
  font-weight: bold;
  border-radius: 5px;
  position: absolute;
  font-family: monospace;

  p {
    margin: auto;
    font-size: 1.1rem;
    padding: 5px 10px;
    border-radius: 5px;
    width: fit-content;
    background-color: ${({ background }) => background};
  }
`;

export const StyledLogout = styled.div`
  top: 42px;
  left: -23px;
  width: 90px;
  padding: 5px;
  display: flex;
  overflow-x: auto;
  text-align: center;
  position: absolute;
  border-radius: 5px;
  flex-direction: column;
  background-color: #333;
  box-shadow: 1px 1px 20px 0px black;
  p {
    color: bisque;
    font-size: 0.7rem;
    font-family: cursive;
  }
  button {
    padding: 5px;
    border: none;
    cursor: pointer;
    font-size: 0.8rem;
    color: darkturquoise;
    font-family: cursive;
    background-color: transparent;
  }
`;

export const StyledSignInHeader = styled.div`
  width: 100%;
  padding: 20px;
`;

export const StyledDashboardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  h1 {
    padding: 20px 0;
  }
  h1 > a {
    color: white;
    text-decoration: none;
  }
  @media screen and (max-width: 300px) {
    h1 {
      font-size: 1.2rem;
      padding: 28px 0;
    }
  }
`;

export const StyledLogoutWrapper = styled.div`
  position: relative;
  img {
    width: 40px;
    cursor: pointer;
    border-radius: 50%;
  }
`;

export const StyledFolksAndTimer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  h1 {
    padding: 20px 0;
  }
  h1 > a {
    color: white;
    text-decoration: none;
  }
  h1 > img {
    display: none;
  }
  & > div:first-of-type {
    display: none;
  }
  @media screen and (max-width: 600px) {
    & > div:first-of-type {
      display: flex;
      position: relative;
    }
    & > p {
      cursor: pointer;
      font-weight: 900;
      font-size: 1.3rem;
    }
    p:hover {
      color: grey;
    }
    h1 > img {
      display: block;
      padding: 4px;
    }
    h1 > a {
      display: none;
    }
    & > div:first-of-type > div {
      top: 20px;
      right: -45px;
      padding: 10px;
      position: absolute;
      border-radius: 5px;
      background-color: #333;
    }
    & > div:first-of-type > div > div:first-of-type {
      flex-direction: column;
    }
    & > div:first-of-type > div > h2 {
      font-size: 1rem;
      padding: 15px 0 5px 0;
    }
    & > div:last-of-type,
    & > h2 {
      display: none;
    }
  }
`;

export const StyledHiddenFolks = styled.div`
  gap: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  & img {
    transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    &:hover {
      width: 90px;
    }
  }
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
