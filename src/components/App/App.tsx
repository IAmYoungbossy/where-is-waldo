import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { SignIn } from "../SignIn/SignIn";
import { StyledApp } from "./App.styled";

function App() {
  return (
    <StyledApp>
      <Header />
      <SignIn />
      <Footer />
    </StyledApp>
  );
}

export default App;
