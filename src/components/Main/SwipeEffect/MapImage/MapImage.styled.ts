import styled from "styled-components";

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

/**Note To Self:
 *
 * Whenever I'm using the attrs method from styled component for dynamic
 * styling with TypeScript always remember to make the type of returned
 * value from the callback function to be the same with the Props passed
 * to it from where it's being used.
 */
