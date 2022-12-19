import styled from "styled-components";
import BackgroundImage from "../assets/Game-bg.jpg";

export const StyledApp = styled.div`
  color: white;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background-image: linear-gradient(rgba(0, 0, 0, 0.525), rgba(0, 0, 0, 0.8)),
    url(${BackgroundImage});
  background-repeat: no-repeat;
  background-size: cover;
`;
