import styled from "styled-components";

const ImageWrapper = styled.div`
  width: 100%;

  img {
    width: 100%;
  }
`;

export default function MapImage({ src, alt }: { src: string; alt: string }) {
  return (
    <ImageWrapper>
      <img src={src} alt={alt} />
    </ImageWrapper>
  );
}
