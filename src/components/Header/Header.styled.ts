import styled from "styled-components";

export const StyledHeader = styled.header`
  z-index: 1;
  display: flex;
  position: fixed;
  min-height: 80px;
  align-items: center;
  background-color: #222;
  font-family: sans-serif;
  width: -webkit-fill-available;
  border-bottom: 2px solid #909cff;
`;

export const StyledTimer = styled.h2<{ padding: string }>`
  padding: ${({ padding }) => padding};
  & span {
    color: #8eff77;
    font-size: 0.8rem;
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
  left: -30px;
  width: 100px;
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
    font-size: 1rem;
    font-family: sans-serif;
  }
  button {
    padding: 5px;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 5px;
    border: 1px solid;
    color: darkturquoise;
    background-color: transparent;
    box-shadow: 1px 1px 20px 0px black;
    &:hover {
      color: white;
    }
  }
`;

export const StyledSignInHeader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  h1 {
    padding: 0 20px;
  }
`;

export const StyledDashboardHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
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
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  h1 {
    padding: 20px 0;
  }
  h1 > a:last-of-type {
    color: white;
    text-decoration: none;
  }
  h1 > a:first-of-type {
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
      cursor: pointer;
    }
    h1 > a:first-of-type {
      display: block;
      padding: 4px;
    }
    h1 > a:last-of-type {
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
      width: 85px;
      cursor: pointer;
    }
  }
  div {
    gap: 5px;
    width: 100%;
    padding: 2px;
    display: flex;
    font-size: 0.9rem;
    align-items: center;
    font-family: sans-serif;
    justify-content: space-between;
  }
`;
