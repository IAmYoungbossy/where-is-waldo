import { useState } from "react";
import { ImageWrapper, TargetPointer } from "./MapImage.styled";

interface ImageProps {
  src: string;
  alt: string;
}

export default function MapImage({ src, alt }: ImageProps) {
  const [style, setStyle] = useState({ top: "0px", left: "0px" });

  const onClickGetMousePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    // Gets current image element
    const image = e.currentTarget;

    // Gets total height and width of image.
    const imageHeight = image.offsetHeight;
    const imageWidth = image.offsetWidth;

    // Gets X and Y coordinates of clicked area
    const clickedHeight = e.nativeEvent.offsetY;
    const clickedWidth = e.nativeEvent.offsetX;

    // Gets the percentage height and width of clicked location
    const percentHeight = (clickedHeight * 100) / imageHeight;
    const percentWidth = (clickedWidth * 100) / imageWidth;

    return { percentHeight, percentWidth };
  };

  const updateMousePosition = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    setStyle({ top: `${e.clientY}px`, left: `${e.clientX}px` });
  };

  return (
    <ImageWrapper onMouseMove={updateMousePosition}>
      <TargetPointer style={style}>
        <div></div>
      </TargetPointer>
      <img src={src} alt={alt} onClick={onClickGetMousePosition} />
    </ImageWrapper>
  );
}
