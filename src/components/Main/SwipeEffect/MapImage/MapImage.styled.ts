import styled from "styled-components";

// export const ImageWrapper = styled.div<{ position: { X: number; Y: number } }>`
//   width: 100%;
//   position: relative;
//   div {
//     width: 50px;
//     height: 50px;
//     position: absolute;
//     border: 1px solid black;
//     transform: translate(
//       ${({ position }) => position.X}px,
//       ${({ position }) => position.Y}px
//     );
//     top: -20px;
//     left: -20px;
//   }
//   img {
//     width: 100%;
//   }
// `;

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  cursor: none;

  img {
    width: 100%;
  }
`;

export const StyledMousePointer = styled.div.attrs<{ X: number; Y: number }>(
  ({ X, Y }: { X: number; Y: number }) => {
    return {
      style: {
        top: `${Y - 105}px`,
        left: `${X - 30}px`,
      },
    };
  }
)`
  border: 2px dotted #fbfbfb;
  background-color: #ffffff1f;
  position: absolute;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    background-color: red;
    border-radius: 50%;
    width: 5px;
    height: 5px;
  }
`;
