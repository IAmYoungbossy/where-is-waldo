import styled from "styled-components";

export const StyledHeader = styled.header<{
  spaceBetween: string;
  hoverWidth?: string;
}>`
  z-index: 1;
  display: flex;
  position: fixed;
  align-items: center;
  background-color: #222;
  width: -webkit-fill-available;
  border-bottom: 2px solid #909cff;
  justify-content: ${({ spaceBetween }) => spaceBetween};

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
    position: relative;
    padding: 0 20px 0 0;
    align-items: center;
  }

  h1 {
    padding: 20px;
  }

  h1 > a {
    color: white;
    text-decoration: none;
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
        transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        &:hover {
          width: ${({ hoverWidth }) => (hoverWidth ? hoverWidth : "90px")};
        }
      }
    }
  }

  @media screen and (max-width: 300px) {
    h1 {
      padding: 27px;
      font-size: 1.3rem;
    }
  }
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
  top: 40px;
  right: 23px;
  width: 75px;
  padding: 5px !important;
  display: flex !important;
  overflow-x: auto;
  position: absolute !important;
  border-radius: 5px;
  flex-direction: column !important;
  background-color: #333;
  box-shadow: 1px 1px 20px 0px black;

  p {
    color: bisque;
    font-size: 0.7rem;
    font-family: cursive;
  }

  button {
    padding: 5px;
    font-size: 0.8rem;
    color: darkturquoise;
    font-family: cursive;
    background-color: transparent;
  }
`;
