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

export const StyledPlayTime = styled.div`
  width: 100vw;
  height: 100vh;
  padding: 10px;
  display: flex;
  position: fixed;
  align-items: center;
  background: #000000ad;
  font-family: monospace;
  justify-content: center;
  & > div {
    background: #222;
    width: 100%;
    max-width: 350px;
    padding: 10px;

    & > div:first-of-type {
      text-align: center;
      padding: 10px 0px;
      font-weight: bold;
      font-size: 1rem;
    }

    & > div:last-of-type {
      border-top: 1px solid white;

      p {
        padding: 10px 0px;
      }

      & form > div:first-of-type {
        display: flex;
        flex-direction: column;
      }

      & form > div:last-child {
        display: flex;
        padding: 10px 0px;
        margin-top: 20px;
        justify-content: flex-end;
        border-top: 1px solid white;
      }

      form button {
        padding: 5px;
        color: white;
        border: none;
        margin-left: 5px;
        background-color: #eb3d3d;
      }

      form button:last-child {
        background-color: #414141;
      }

      form input {
        color: white;
        padding: 10px;
        outline: none;
        margin-top: 5px;
        background-color: #222;
        border: 1px solid white;
      }

      form input:not(:placeholder-shown) {
        background-color: #222;
      }

      form label {
        font-weight: bold;
        font-size: 0.8rem;
      }
    }
  }
`;

/**Note To Self:
 *
 * Whenever I'm using the attrs method from styled component for dynamic
 * styling with TypeScript always remember to make the type of returned
 * value from the callback function to be the same with the Props passed
 * to it from where it's being used.
 */
