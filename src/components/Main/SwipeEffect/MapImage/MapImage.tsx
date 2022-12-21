import styled from "styled-components";

const ImageWrapper = styled.div`
  width: 100%;

  img {
    width: 100%;
  }
`;

interface ImageProps {
  src: string;
  alt: string;
}

export default function MapImage({ src, alt }: ImageProps) {
  return (
    <ImageWrapper>
      <img src={src} alt={alt} />
    </ImageWrapper>
  );
}
