import { hiddenFolksType } from "../../../../App/App";
import { StyledMouseTarget } from "./MouseTarget.styled";

interface MouseTargetProps {
  nameList: {
    top: string;
    left: string;
  };
  hiddenFolks?: hiddenFolksType[];
  setCheckStatus: (status: string) => void;
  getCoords: (imageName: string, folkName: string) => void;
  setFolkName: React.Dispatch<React.SetStateAction<string>>;
}

export const MouseTarget = ({
  getCoords,
  hiddenFolks,
  setFolkName,
  nameList,
  setCheckStatus,
}: MouseTargetProps): JSX.Element => {
  const handleClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    folk: hiddenFolksType
  ) => {
    e.stopPropagation();
    setFolkName(folk.Name);
    setCheckStatus("Checking...");
    getCoords(folk.imageName, folk.Name);
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

  return (
    <StyledMouseTarget top={nameList.top} left={nameList.left}>
      <div />
      <div>
        <ul>{nameOfHiddenFolks}</ul>
      </div>
    </StyledMouseTarget>
  );
};

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
