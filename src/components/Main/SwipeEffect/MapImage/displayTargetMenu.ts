// This function shows list of hidden characters' name if clicked position is
// not too close to image edge.
export const displayTargetMenu = (
  clickedTargetInPercentage: {
    width: number;
    height: number;
  },
  setClickedTarget: React.Dispatch<
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
  if (
    clickedTargetInPercentage.width > 97 ||
    clickedTargetInPercentage.width < 3 ||
    clickedTargetInPercentage.height > 98 ||
    clickedTargetInPercentage.height < 1
  ) {
    return;
  }

  // This sets the coordinates to display dropdown menu.
  setClickedTarget({
    top: cursorLocation.top,
    left: cursorLocation.left,
  });

  // Toggles the cursor style and whether to show the clicked target
  document.documentElement.style.setProperty("--display", "none");
  setShowClickedTarget(!showClickedTarget);
};
