import styled from "styled-components";

export const StyledHeader = styled.header<{ spaceBetween: string }>`
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
          width: 90px;
        }
      }
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
