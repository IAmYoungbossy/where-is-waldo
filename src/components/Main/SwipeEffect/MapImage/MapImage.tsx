import { useState } from "react";
import { StyledImageWrapper, StyledMousePointer } from "./MapImage.styled";

interface ImageProps {
  src: string;
  alt: string;
}

interface StyledPointerProps {
  cursorLocation: { top: string; left: string };
}

const StyledPointer = ({ cursorLocation }: StyledPointerProps): JSX.Element => (
  <StyledMousePointer style={cursorLocation}>
    <div />
  </StyledMousePointer>
);

export default function MapImage({ src, alt }: ImageProps): JSX.Element {
  // This get the percentage of custume mouse in both X and Y coordinate.
  const [cursorLocationInPercentage, setCursorLocationInPercentage] = useState({
    width: 0,
    height: 0,
  });

  // This is used in updating realtime location of the custume mouse.
  const [cursorLocation, setCursorLocation] = useState({
    top: "0px",
    left: "10px",
  });

  // This controls showing default cursor or not
  const [showCustumeCursor, setShowCustumeCursor] = useState(true);

  // This does same as above except it sets the property
  const [cursorStyle, setCursorStyle] = useState("none");

  // Function makes sure the custume mouse doesn't get off the view
  const removeShowCustumeCursor = (
    percentWidth: number,
    percentHeight: number
  ) => {
    if (
      percentWidth > 95 ||
      percentWidth < 4 ||
      percentHeight > 99 ||
      percentHeight < 0
    ) {
      setShowCustumeCursor(false);
      setCursorStyle("default");
    } else {
      setShowCustumeCursor(true);
      setCursorStyle("none");
    }
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

    removeShowCustumeCursor(percentWidth, percentHeight);
    setCursorLocationInPercentage({
      width: percentWidth,
      height: percentHeight,
    });
  };

  // This function gets the X and Y coordinates for the style mouse pointer.
  const updateMousePosition = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    // Subtracting 118 and 40 from Y and X coordinate makes the custume
    // mouse pointer center at the tip of mouse aarrow.
    setCursorLocation({ top: `${e.pageY - 118}px`, left: `${e.pageX - 40}px` });
  };

  return (
    <StyledImageWrapper
      cursorPointer={cursorStyle}
      onMouseMove={updateMousePosition}
      onMouseDown={() => {
        setShowCustumeCursor(false);
      }}
    >
      {showCustumeCursor && <StyledPointer cursorLocation={cursorLocation} />}
      <img
        src={src}
        alt={alt}
        onMouseUp={(e) => {
          getMouseLocationInPercent(e);
          setShowCustumeCursor(true);
        }}
        onMouseMove={getMouseLocationInPercent}
      />
    </StyledImageWrapper>
  );
}
