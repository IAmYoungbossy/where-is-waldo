import { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Main } from "../Main/Main";
import { StyledApp } from "./App.styled";
import { hiddenFolksArray } from "./hiddenFolksArray";

export type hiddenFolksType = {
  Name: string;
  url: string;
};

function App() {
  const [hiddenFolks, setHiddenFolks] = useState<hiddenFolksType[]>([]);

  // This function sets the hidden characters to search for.
  const handleDisplayHiddenFolks = (alt: string): void => {
    hiddenFolksArray.forEach((image) => {
      if (image.Card === alt) {
        setHiddenFolks(image.Folks);
      }
    });
  };

  return (
    <StyledApp>
      <Header hiddenFolks={hiddenFolks} />
      <Main
        handleDisplayHiddenFolks={handleDisplayHiddenFolks}
        hiddenFolks={hiddenFolks}
      />
      <Footer />
    </StyledApp>
  );
}

export default App;
