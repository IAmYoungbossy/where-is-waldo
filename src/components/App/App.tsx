import { useState } from "react";
import Footer from "../Footer/Footer";
import { Main } from "../Main/Main";
import { StyledApp } from "./App.styled";
import { hiddenFolksArray } from "./hiddenFolksArray";

export type hiddenFolksType = {
  url: string;
  Name: string;
  checked: boolean;
  imageName: string;
};

function App() {
  const [hiddenFolks, setHiddenFolks] = useState<hiddenFolksType[]>([]);

  // This function sets the hidden characters to search for.
  const handleDisplayHiddenFolks = (alt: string): void => {
    hiddenFolksArray.forEach((image) => {
      if (image.Card === alt) {
        const folksCopy = [...image.Folks].map((folk) => ({
          ...folk,
          checked: false,
          imageName: alt,
        }));
        setHiddenFolks(folksCopy);
      }
    });
  };

  return (
    <StyledApp>
      <Main
        handleDisplayHiddenFolks={handleDisplayHiddenFolks}
        setHiddenFolks={setHiddenFolks}
        hiddenFolks={hiddenFolks}
      />
      <Footer />
    </StyledApp>
  );
}

export default App;
