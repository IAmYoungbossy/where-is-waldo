import { StyledMain } from "./Main.styled";
import { SignIn } from "./SignIn/SignIn";
import { SignUp } from "./SignUp/SignUp";

export function Main() {
  return (
    <StyledMain>
      <SignIn />
      <SignUp />
    </StyledMain>
  );
}
