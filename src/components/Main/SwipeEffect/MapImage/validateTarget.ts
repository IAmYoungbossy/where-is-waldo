import { hiddenFolksType } from "../../../App/App";

interface validateTargetProps {
  coordsToPercent: {
    width: number;
    height: number;
  };
  correctCoords: {
    height: {
      max: number;
      min: number;
    };
    width: {
      max: number;
      min: number;
    };
  };
  foundFolkName: string;
  hiddenFolks: hiddenFolksType[];
  setBackgroundColor: React.Dispatch<React.SetStateAction<string>>;
  setCheckStatus: React.Dispatch<React.SetStateAction<string>>;
  setHiddenFolks: React.Dispatch<React.SetStateAction<hiddenFolksType[]>>;
}

export const validateTarget = ({
  foundFolkName,
  hiddenFolks,
  correctCoords,
  setBackgroundColor,
  setHiddenFolks,
  setCheckStatus,
  coordsToPercent,
}: validateTargetProps) => {
  const clickedCoords = coordsToPercent;
  // This makes sure the mouse is placed at the appropriate place on image
  if (
    clickedCoords.width >= correctCoords.width.min &&
    clickedCoords.width <= correctCoords.width.max &&
    clickedCoords.height >= correctCoords.height.min &&
    clickedCoords.height <= correctCoords.height.max &&
    clickedCoords.width !== 0
  ) {
    // Marks a found character true to disable it from list of available characters
    hiddenFolks.forEach((folk, index) => {
      if (folk.Name === foundFolkName) {
        const hiddenFolksCopy = [...hiddenFolks];
        hiddenFolksCopy[index] = { ...folk, checked: true };
        setHiddenFolks(hiddenFolksCopy);
      }
    });
    // Success message if right character is clcicked
    setBackgroundColor("green");
    setCheckStatus(`Congrats! You found ${foundFolkName}`);
    setTimeout(() => {
      setCheckStatus("");
      setBackgroundColor("black");
    }, 5000);
  } else if (clickedCoords.width !== 0) {
    // Fail message if wrong character is clicked
    setBackgroundColor("red");
    setCheckStatus("Keep searching");
    setTimeout(() => {
      setCheckStatus("");
      setBackgroundColor("black");
    }, 5000);
  }
};
