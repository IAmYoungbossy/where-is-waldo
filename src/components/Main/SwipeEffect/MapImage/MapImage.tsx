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
  const onClickGetMousePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    // Gets current image element
    const image = e.currentTarget;

    // Gets total height and width of image.
    const imageHeight = image.offsetHeight;
    const imageWidth = image.offsetWidth;

    // Gets height and width of clicked area
    const clickedHeight = e.nativeEvent.offsetY;
    const clickedWidth = e.nativeEvent.offsetX;

    // Gets the percentage height and width of clicked location
    const percentHeight = (clickedHeight * 100) / imageHeight;
    const percentWidth = (clickedWidth * 100) / imageWidth;

    console.log(`Height: ${percentHeight} And Width: ${percentWidth}`);
  };

  return (
    <ImageWrapper>
      <img src={src} alt={alt} onClick={onClickGetMousePosition} />
    </ImageWrapper>
  );
}
