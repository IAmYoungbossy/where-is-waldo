// This function shows list of hidden characters
export const displayTargetMenu = (
  setNameList: React.Dispatch<
    React.SetStateAction<{
      top: string;
      left: string;
    }>
  >,
  cursorLocation: {
    top: string;
    left: string;
  },
  setShowClickedTarget: React.Dispatch<React.SetStateAction<boolean>>,
  showClickedTarget: boolean
): void => {
  //   This sets the coordinates to display dropdown menu.
  setNameList({
    top: cursorLocation.top,
    left: cursorLocation.left,
  });

  // Toggles drop down menu list
  setShowClickedTarget(!showClickedTarget);
};
