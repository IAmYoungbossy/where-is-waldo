import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { Main } from "../Main/Main";
import { StyledApp } from "./App.styled";

function App() {
  return (
    <StyledApp>
      <Header />
      <Main />
      <Footer />
    </StyledApp>
  );
}

export default App;
