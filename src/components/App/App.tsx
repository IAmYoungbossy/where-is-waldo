import Footer from "../Footer/Footer";
import { Main } from "../Main/Main";
import { StyledApp } from "./App.styled";

export type hiddenFolksType = {
  url: string;
  Name: string;
  checked: boolean;
  imageName: string;
};

function App() {
  return (
    <StyledApp>
      <Main />
      <Footer />
    </StyledApp>
  );
}

export default App;
