import styled from "styled-components";
import BackgroundImage from "../assets/Game-bg.jpg";

export const StyledApp = styled.div`
  color: white;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${BackgroundImage});
`;
