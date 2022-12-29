import styled from "styled-components";
import { hiddenFolksType } from "../../../App/App";

interface StyledImageWrapperProps {
  cursorPointer: string;
}

// Div container that wraps the image where hidden folks are searched for.
export const StyledImageWrapper = styled.div<StyledImageWrapperProps>`
  width: 100%;
  position: relative;
  &:hover {
    cursor: ${({ cursorPointer }) => cursorPointer};
  }
  img {
    width: 100%;
    pointer-events: all;
    &:hover {
      cursor: ${({ cursorPointer }) => cursorPointer};
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
      top: style.top,
      left: style.left,
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

export const StyledTargetFolks = styled.div<{
  top: string;
  left: string;
  hiddenFolks?: hiddenFolksType[] | null;
}>`
  z-index: 10;
  width: 70px;
  height: 70px;
  display: flex;
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
  }
`;

export const StyledStatusChecker = styled.div<{ background: string }>`
  top: 83px;
  left: 41vw;
  color: white;
  padding: 2px 15px;
  font-weight: bold;
  border-radius: 5px;
  position: absolute;
  font-family: monospace;
  background-color: ${({ background }) => background};
`;

/**Note To Self:
 *
 * Whenever I'm using the attrs method from styled component for dynamic
 * styling with TypeScript always remember to make the type of returned
 * value from the callback function to be the same with the Props passed
 * to it from where it's being used.
 */
