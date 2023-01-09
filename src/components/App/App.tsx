import "./App.css";
import { useState, useEffect } from "react";
import { Main } from "../Main/Main";
import Footer from "../Footer/Footer";
import {
  getHiddenFolksURL,
  getHiddenFolksURLType,
} from "../utilities/firebaseCRUD";

export type hiddenFolksType = {
  url: string;
  Name: string;
  checked: boolean;
  imageName: string;
};

function App() {
  const [hiddenFolksArray, setHiddenFolksArray] =
    useState<getHiddenFolksURLType>([]);
  const [hiddenFolks, setHiddenFolks] = useState<hiddenFolksType[]>([]);

  useEffect(() => {
    getHiddenFolksURL(setHiddenFolksArray);
  }, []);

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
    <div className="App">
      <Main
        handleDisplayHiddenFolks={handleDisplayHiddenFolks}
        setHiddenFolks={setHiddenFolks}
        hiddenFolks={hiddenFolks}
      />
      <Footer />
    </div>
  );
}

export default App;
