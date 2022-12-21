// import { useState } from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Main } from "../Main/Main";
import { StyledApp } from "./App.styled";

function App() {
  // const [hiddenFolks, setHiddenFolks] = useState<string[][]>([]);

  const handleDisplayHiddenFolks = (alt: string): void => {
    console.log(alt);
  };

  return (
    <StyledApp>
      <Header />
      <Main handleDisplayHiddenFolks={handleDisplayHiddenFolks} />
      <Footer />
    </StyledApp>
  );
}

export default App;
