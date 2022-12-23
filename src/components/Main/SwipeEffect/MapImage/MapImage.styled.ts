import styled from "styled-components";

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;

  img {
    width: 100%;
  }
`;

interface ComponentInt {
  style: { top: string; left: string };
}

export const TargetPointer = styled.div.attrs(({ style }: ComponentInt) => ({
  style: {
    top: style.top,
    left: style.left,
  },
}))`
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
