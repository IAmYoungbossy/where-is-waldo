// This function shows list of hidden characters' name if clicked position is
// not too close to image edge.
export const displayTargetMenu = (
  coordsToPercent: {
    width: number;
    height: number;
  },
  setNameList: React.Dispatch<React.SetStateAction<boolean>>,
  nameList: boolean
): void => {
  if (
    coordsToPercent.width > 97 ||
    coordsToPercent.width < 3 ||
    coordsToPercent.height > 98 ||
    coordsToPercent.height < 1
  ) {
    return;
  }

  // Toggles the cursor style and whether to show the clicked target
  setNameList(!nameList);
};
