import { useState } from "react";
import { StyledImageWrapper, StyledMousePointer } from "./MapImage.styled";

interface ImageProps {
  src: string;
  alt: string;
}

export default function MapImage({ src, alt }: ImageProps) {
  const [custumeMouse, setCustumeMouse] = useState(true);

  // This is used in updating the custume mouse.
  const [style, setStyle] = useState({ top: "10px", left: "50px" });

  // This get the percentage of custume mouse in both X and Y coordinate.
  const [mouseLocation, setMouseLocation] = useState({ width: 0, height: 0 });

  // Function makes sure the custume mouse doesn't get off the view
  const removeCustumeMouse = (percentWidth: number, percentHeight: number) => {
    if (
      percentWidth > 95 ||
      percentWidth < 4 ||
      percentHeight > 95 ||
      percentHeight < 4
    )
      setCustumeMouse(false);
    else setCustumeMouse(true);
  };

  const getMouseLocationInPercent = (e: React.MouseEvent<HTMLDivElement>) => {
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

    removeCustumeMouse(percentWidth, percentHeight);
    setMouseLocation({ width: percentWidth, height: percentHeight });
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
    <StyledImageWrapper
      onMouseMove={updateMousePosition}
      onMouseDown={() => {
        setCustumeMouse(false);
      }}
    >
      {custumeMouse && (
        <StyledMousePointer style={style}>
          <div></div>
        </StyledMousePointer>
      )}
      <img
        src={src}
        alt={alt}
        onMouseUp={(e) => {
          getMouseLocationInPercent(e);
          setCustumeMouse(true);
        }}
        onMouseMove={getMouseLocationInPercent}
      />
    </StyledImageWrapper>
  );
}
