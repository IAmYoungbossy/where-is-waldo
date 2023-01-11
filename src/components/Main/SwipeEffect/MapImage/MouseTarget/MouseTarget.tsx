import "./MouseTarget.css";
import React, { useEffect } from "react";
import { hiddenFolksType } from "../../../../App/App";

interface MouseTargetProps {
  clickedCoords: {
    top: string;
    left: string;
  };
  hiddenFolks?: hiddenFolksType[];
  setCheckStatus: (status: string) => void;
  getCoords: (imageName: string, foundFolkName: string) => void;
  setFoundFolkName: React.Dispatch<React.SetStateAction<string>>;
  setCustomCursor: React.Dispatch<React.SetStateAction<string>>;
  setNameList: React.Dispatch<React.SetStateAction<boolean>>;
}

export const MouseTarget = React.memo(
  ({
    getCoords,
    hiddenFolks,
    setFoundFolkName,
    clickedCoords,
    setCheckStatus,
    setCustomCursor,
    setNameList,
  }: MouseTargetProps): JSX.Element => {
    const handleClick = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
      folk: hiddenFolksType
    ) => {
      e.stopPropagation();
      setFoundFolkName(folk.Name);
      setCheckStatus("Checking...");
      getCoords(folk.imageName, folk.Name);
      setNameList(false);
      setCustomCursor("custom");
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
        `${clickedCoords.top}`
      );
      document.documentElement.style.setProperty(
        "--left",
        `${clickedCoords.left}`
      );
    }, [clickedCoords]);

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
  setCoordsToPercent: React.Dispatch<
    React.SetStateAction<{
      width: number;
      height: number;
    }>
  >,
  setClickedCoords: React.Dispatch<
    React.SetStateAction<{
      top: string;
      left: string;
    }>
  >
) => {
  const getMousePositionOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const { percentHeight, percentWidth } = mousePosition(e);
    setCoordsToPercent({
      width: percentWidth,
      height: percentHeight,
    });
  };

  const updateMousePosition = (e: React.MouseEvent<HTMLDivElement>) => {
    // Subtract 118 and 40 from the Y and X coordinates to center clicked target.
    setClickedCoords({
      top: `${e.pageY - 118}px`,
      left: `${e.pageX - 40}px`,
    });
  };

  return {
    getMousePositionOnClick,
    updateMousePosition,
  };
};
