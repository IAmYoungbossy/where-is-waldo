import { Route, Routes } from "react-router-dom";
import { StyledMain } from "./Main.styled";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";

export function Main() {
  return (
    <StyledMain>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </StyledMain>
  );
}
