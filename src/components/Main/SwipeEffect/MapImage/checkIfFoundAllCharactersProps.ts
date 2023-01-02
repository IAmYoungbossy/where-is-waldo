import { hiddenFolksType } from "../../../App/App";

interface checkIfFoundAllCharactersProps {
  hiddenFolks: hiddenFolksType[];
  setFoundAllFolks: React.Dispatch<React.SetStateAction<boolean>>;
}

export const checkIfFoundAllCharacters = ({
  hiddenFolks,
  setFoundAllFolks,
}: checkIfFoundAllCharactersProps) => {
  if (hiddenFolks.length === 0) return;
  const allTrue = hiddenFolks.every((folk) => folk.checked);
  if (allTrue) setFoundAllFolks(true);
};
