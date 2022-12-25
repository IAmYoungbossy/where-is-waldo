/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  StyledImageWrapper,
  StyledMousePointer,
  StyledTargetFolks,
} from "./MapImage.styled";

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

const StyledTarget = ({
  clickedTarget,
}: {
  clickedTarget: {
    top: string;
    left: string;
  };
}): JSX.Element => {
  return (
    <StyledTargetFolks top={clickedTarget.top} left={clickedTarget.left}>
      <div />
      <div />
    </StyledTargetFolks>
  );
};

export default function MapImage({ src, alt }: ImageProps): JSX.Element {
  // This get the percentage of cursor pointer in both X and Y coordinates.
  const [clickedTargetInPercentage, setClickedTargetInPercentage] = useState({
    width: 0,
    height: 0,
  });

  // This controls when to show default cursor based on its position.
  const [showCustumeCursor, setShowCustumeCursor] = useState(true);

  // This is used in updating realtime location of the styled cursor.
  const [cursorLocation, setCursorLocation] = useState({
    top: "0px",
    left: "10px",
  });

  // This does same as above except it sets the property
  const [cursorStyle, setCursorStyle] = useState("none");

  // This state control when to display clicked target.
  const [clickedTarget, setClickedTarget] = useState({
    top: "0px",
    left: "10px",
  });

  const [showClickedTarget, setShowClickedTarget] = useState(true);

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
    setClickedTargetInPercentage({
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

  useEffect(() => {
    setClickedTarget({
      top: cursorLocation.top,
      left: cursorLocation.left,
    });
    setShowClickedTarget(showClickedTarget ? false : true);
    // setCursorStyle(cursorStyle === "none" ? "default" : "none");
  }, [showCustumeCursor]);

  return (
    <StyledImageWrapper
      cursorPointer={cursorStyle}
      onMouseMove={updateMousePosition}
      onMouseDown={updateMousePosition}
      onClick={(e) => {
        getMouseLocationInPercent(e);
        setShowCustumeCursor(showCustumeCursor ? false : true);
        setCursorStyle(cursorStyle === "none" ? "default" : "none");
      }}
    >
      {showClickedTarget && <StyledTarget clickedTarget={clickedTarget} />}
      {showCustumeCursor && <StyledPointer cursorLocation={cursorLocation} />}
      <img src={src} alt={alt} onMouseMove={getMouseLocationInPercent} />
    </StyledImageWrapper>
  );
}
