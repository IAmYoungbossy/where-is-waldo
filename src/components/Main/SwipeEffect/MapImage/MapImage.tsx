import { useState } from "react";
import { StyledImageWrapper, StyledMousePointer } from "./MapImage.styled";

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

  // This function gets the X and Y coordinates for the style mouse pointer.
  const updateMousePosition = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    // Subtracting 118 and 40 from Y and X coordinate makes the custume
    // mouse pointer center at the tip of mouse aarrow.
    setStyle({ top: `${e.pageY - 118}px`, left: `${e.pageX - 40}px` });
  };

  return (
    <StyledImageWrapper onMouseMove={updateMousePosition}>
      <StyledMousePointer style={style}>
        <div></div>
      </StyledMousePointer>
      <img src={src} alt={alt} onClick={onClickGetMousePosition} />
    </StyledImageWrapper>
  );
}
