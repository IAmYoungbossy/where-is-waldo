import { hiddenFolksType } from "../../../App/App";

interface validateTargetProps {
  clickedTargetInPercentage: {
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
  folkName: string;
  hiddenFolks: hiddenFolksType[];
  setBackground: React.Dispatch<React.SetStateAction<string>>;
  setCheckStatus: React.Dispatch<React.SetStateAction<string>>;
  setHiddenFolks: React.Dispatch<React.SetStateAction<hiddenFolksType[]>>;
}

export const validateTarget = ({
  folkName,
  hiddenFolks,
  correctCoords,
  setBackground,
  setHiddenFolks,
  setCheckStatus,
  clickedTargetInPercentage,
}: validateTargetProps) => {
  const clickedTarget = clickedTargetInPercentage;
  // This makes sure the mouse is placed at the appropriate place on image
  if (
    clickedTarget.width >= correctCoords.width.min &&
    clickedTarget.width <= correctCoords.width.max &&
    clickedTarget.height >= correctCoords.height.min &&
    clickedTarget.height <= correctCoords.height.max &&
    clickedTarget.width !== 0
  ) {
    // Marks a found character true to disable it from list of available characters
    hiddenFolks.forEach((folk, index) => {
      if (folk.Name === folkName) {
        const hiddenFolksCopy = [...hiddenFolks];
        hiddenFolksCopy[index] = { ...folk, checked: true };
        setHiddenFolks(hiddenFolksCopy);
      }
    });
    // Success message if right character is clcicked
    setBackground("green");
    setCheckStatus(`Congrats! You found ${folkName}`);
    setTimeout(() => {
      setCheckStatus("");
      setBackground("black");
    }, 5000);
  } else if (clickedTarget.width !== 0) {
    // Fail message if wrong character is clicked
    setBackground("red");
    setCheckStatus("Keep searching");
    setTimeout(() => {
      setCheckStatus("");
      setBackground("black");
    }, 5000);
  }
};
