import styled from "styled-components";
import { hiddenFolksType } from "../../../../App/App";

export const StyledMouseTarget = styled.div<{
  top: string;
  left: string;
  hiddenFolks?: hiddenFolksType[] | null;
}>`
  z-index: 10;
  width: 70px;
  height: 70px;
  display: flex;
  cursor: default;
  position: absolute;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  border: 5px dotted white;
  top: ${({ top }) => top};
  left: ${({ left }) => left};
  background-color: #00000054;

  div:first-of-type {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: red;
  }

  div:last-of-type {
    left: -9px;
    width: 75px;
    height: 110px;
    bottom: -117px;
    border-radius: 5px;
    position: absolute;
    border: 1px solid white;
    background-color: #0000008c;

    ul {
      height: 100%;
      padding: 5px;
      display: flex;
      list-style: none;
      flex-direction: column;
      justify-content: space-between;
    }

    & li {
      flex: 1;
    }

    & button {
      width: 100%;
      height: 100%;
      padding: 2px;
      color: #a50101;
      cursor: pointer;
      font-weight: bold;
      font-size: 0.75rem;
    }

    & button:hover {
      color: white;
      border-radius: 1px;
      background-color: black;
      border: 1px solid black;
    }

    button:disabled {
      cursor: default;
      pointer-events: none;
    }

    & button:disabled:hover {
      cursor: default;
      pointer-events: none;
    }
  }
`;

interface StyledMousePointerProps {
  style: { top: string; left: string };
}

// This is target pointer used in clicking where the hidden folks are
export const StyledMousePointer = styled.div.attrs(
  ({ style }: StyledMousePointerProps) => ({
    style: {
      transform: `translate(${style.left}px, ${style.top}px)`,
    },
  })
)`
  width: 70px;
  height: 70px;
  display: flex;
  border-radius: 50%;
  position: absolute;
  align-items: center;
  pointer-events: none;
  justify-content: center;
  border: 5px dotted black;
  background-color: #00000054;

  div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: white;
  }
`;