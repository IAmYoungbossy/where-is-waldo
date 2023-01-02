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
  if (
    clickedTarget.width >= correctCoords.width.min &&
    clickedTarget.width <= correctCoords.width.max &&
    clickedTarget.height >= correctCoords.height.min &&
    clickedTarget.height <= correctCoords.height.max &&
    clickedTarget.width !== 0
  ) {
    hiddenFolks.forEach((folk, index) => {
      if (folk.Name === folkName) {
        const hiddenFolksCopy = [...hiddenFolks];
        hiddenFolksCopy[index] = { ...folk, checked: true };
        setHiddenFolks(hiddenFolksCopy);
      }
    });
    setBackground("green");
    setCheckStatus(`Congrats! You found ${folkName}`);
    setTimeout(() => {
      setCheckStatus("");
      setBackground("black");
    }, 5000);
  } else if (clickedTarget.width !== 0) {
    setBackground("red");
    setCheckStatus("Keep searching");
    setTimeout(() => {
      setCheckStatus("");
      setBackground("black");
    }, 5000);
  }
};
