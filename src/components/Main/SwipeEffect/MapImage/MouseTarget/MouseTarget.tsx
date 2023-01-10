import "./MouseTarget.css";
import React, { useEffect } from "react";
import { hiddenFolksType } from "../../../../App/App";

interface MouseTargetProps {
  clickedTarget: {
    top: string;
    left: string;
  };
  hiddenFolks?: hiddenFolksType[];
  setCheckStatus: (status: string) => void;
  getCoords: (imageName: string, folkName: string) => void;
  setFolkName: React.Dispatch<React.SetStateAction<string>>;
  setCustomPointer: React.Dispatch<React.SetStateAction<string>>;
  setShowClickedTarget: React.Dispatch<React.SetStateAction<boolean>>;
}

interface StyledPointerProps {
  cursorLocation: { top: string; left: string };
}

export const StyledPointer = React.memo(
  ({ cursorLocation }: StyledPointerProps): JSX.Element => {
    useEffect(() => {
      document.documentElement.style.setProperty(
        "--pointer",
        `translate(${cursorLocation.left}, ${cursorLocation.top})`
      );
    });
    return (
      <div className="mouse-pointer">
        <div />
      </div>
    );
  }
);

export const MouseTarget = React.memo(
  ({
    getCoords,
    hiddenFolks,
    setFolkName,
    clickedTarget,
    setCheckStatus,
    setCustomPointer,
    setShowClickedTarget,
  }: MouseTargetProps): JSX.Element => {
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      folk: hiddenFolksType
    ) => {
      e.stopPropagation();
      setFolkName(folk.Name);
      setCheckStatus("Checking...");
      getCoords(folk.imageName, folk.Name);
      setShowClickedTarget(false);
      setCustomPointer("custom");
    };

    const nameOfHiddenFolks = hiddenFolks?.map((folk, index) => {
      return (
        <li key={index}>
          {!folk.checked && (
            <button onClick={(e) => handleClick(e, folk)}>{folk.Name}</button>
          )}
          {folk.checked && (
            <button disabled onClick={(e) => handleClick(e, folk)}>
              {folk.Name}
            </button>
          )}
        </li>
      );
    });

    useEffect(() => {
      document.documentElement.style.setProperty(
        "--top",
        `${clickedTarget.top}`
      );
      document.documentElement.style.setProperty(
        "--left",
        `${clickedTarget.left}`
      );
      // document.documentElement.style.setProperty("--display", "flex");
    }, [clickedTarget]);

    return (
      <div className="mouse-target">
        <div />
        <div>
          <ul>{nameOfHiddenFolks}</ul>
        </div>
      </div>
    );
  }
);

// This gets height and width of image and the position of mouse position
// in respect to the height and width of image in percentage.
export const mousePosition = (e: React.MouseEvent<HTMLDivElement>) => {
  const image = e.currentTarget;
  const imageHeight = image.offsetHeight;
  const imageWidth = image.offsetWidth;
  const clickedHeight = e.nativeEvent.offsetY;
  const clickedWidth = e.nativeEvent.offsetX;
  const percentHeight = (clickedHeight * 100) / imageHeight;
  const percentWidth = (clickedWidth * 100) / imageWidth;
  return { percentHeight, percentWidth };
};

export const mousePositionOnImage = (
  setClickedTargetInPercentage: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    }>
  >,
  setCursorLocation: React.Dispatch<
    React.SetStateAction<{
      top: string;
      left: string;
    }>
  >
) => {
  const getMousePositionOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { percentHeight, percentWidth } = mousePosition(e);
    setClickedTargetInPercentage({
      width: percentWidth,
      height: percentHeight,
    });
  };

  // This function gets the X and Y coordinates for the style mouse pointer.
  const updateMousePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    // Subtracts 118 and 40 from the Y and X coordinates to center the custom
    // mouse pointer at the tip of the mouse arrow
    setCursorLocation({
      top: `${e.pageY - 118}px`,
      left: `${e.pageX - 40}px`,
    });
  };

  return {
    getMousePositionOnClick,
    updateMousePosition,
  };
};
