import styled from "styled-components";

// Div container that wraps the image where hidden folks are searched for
export const StyledImageWrapper = styled.div`
  width: 100%;
  position: relative;

  img {
    width: 100%;
  }
`;

interface ComponentInt {
  style: { top: string; left: string };
}

// This is target pointer used in clicking where the hidden folks are
export const StyledMousePointer = styled.div.attrs(
  ({ style }: ComponentInt) => ({
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

/**Note To Self:
 *
 * Whenever I'm using the attrs method from styled component for dynamic
 * styling with TypeScript always remember to make the type of returned
 * value from the callback function to be the same with the Props passed
 * to it from whee it's being used.
 */
