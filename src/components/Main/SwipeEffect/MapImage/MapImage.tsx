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

const StyledPointer = ({ cursorLocation }: StyledPointerProps): JSX.Element => (
  <StyledMousePointer style={cursorLocation}>
    <div />
  </StyledMousePointer>
);

export default function MapImage({ src, alt }: ImageProps): JSX.Element {
  // State for clicked target in percentage. Use for backend validation
  const [clickedTargetInPercentage, setClickedTargetInPercentage] = useState({
    width: 0,
    height: 0,
  });

  // State for whether to show the clicked target
  const [showClickedTarget, setShowClickedTarget] = useState(false);

  // State for whether to show custom cursor
  const [showCustomCursor, setShowCustomCursor] = useState(true);

  // State for updating the useEffect hook
  const [updateUseEffect, setUpdateUseEffect] = useState(false);

  // State for location of custom cursor
  const [cursorLocation, setCursorLocation] = useState({
    top: "0px",
    left: "10px",
  });

  // State for cursor style
  const [cursorStyle, setCursorStyle] = useState("none");

  // State for clicked target location
  const [clickedTarget, setClickedTarget] = useState({
    top: "0px",
    left: "10px",
  });

  // Prevents custom cursor from going off the image
  const preventCustomCursorFromGoingOffImage = (
    percentWidth: number,
    percentHeight: number
  ) => {
    if (
      percentWidth > 97 ||
      percentWidth < 3 ||
      percentHeight > 95 ||
      percentHeight < 0
    ) {
      setShowCustomCursor(false);
      setCursorStyle("default");
    } else if (showClickedTarget) {
      setShowCustomCursor(false);
    } else {
      setShowCustomCursor(true);
      setCursorStyle("none");
    }
  };

  const getMouseLocationInPercent = (e: React.MouseEvent<HTMLDivElement>) => {
    const image = e.currentTarget;
    const imageHeight = image.offsetHeight;
    const imageWidth = image.offsetWidth;
    const clickedHeight = e.nativeEvent.offsetY;
    const clickedWidth = e.nativeEvent.offsetX;
    const percentHeight = (clickedHeight * 100) / imageHeight;
    const percentWidth = (clickedWidth * 100) / imageWidth;

    preventCustomCursorFromGoingOffImage(percentWidth, percentHeight);
    setClickedTargetInPercentage({
      width: percentWidth,
      height: percentHeight,
    });
  };

  // This function gets the X and Y coordinates for the style mouse pointer.
  const updateMousePosition = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    // Subtracts 118 and 40 from the Y and X coordinates to center the custom
    // mouse pointer at the tip of the mouse arrow
    setCursorLocation({
      top: `${e.pageY - 118}px`,
      left: `${e.pageX - 40}px`,
    });
  };

  useEffect(() => {
    // Prevents the cursor from going off the image in the target
    if (
      clickedTargetInPercentage.width > 97 ||
      clickedTargetInPercentage.width < 3 ||
      clickedTargetInPercentage.height > 95
    ) {
      setShowCustomCursor(false);
      return;
    }

    setClickedTarget({
      top: cursorLocation.top,
      left: cursorLocation.left,
    });

    // Toggles the cursor style and whether to show the clicked target
    setCursorStyle(cursorStyle === "none" ? "default" : "none");
    // setShowCustomCursor(showCustomCursor ? false : true);
    setShowClickedTarget(!showClickedTarget);
  }, [updateUseEffect]);

  return (
    <StyledImageWrapper
      cursorPointer={cursorStyle}
      onMouseMove={updateMousePosition}
      onMouseDown={updateMousePosition}
      onClick={(e) => {
        getMouseLocationInPercent(e);
        setUpdateUseEffect(updateUseEffect ? false : true);
        setShowCustomCursor(false);
      }}
    >
      {showClickedTarget && <StyledTarget clickedTarget={clickedTarget} />}
      {showCustomCursor && <StyledPointer cursorLocation={cursorLocation} />}
      <img src={src} alt={alt} onMouseMove={getMouseLocationInPercent} />
    </StyledImageWrapper>
  );
}
