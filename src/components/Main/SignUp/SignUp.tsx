import { StyledForm } from "../SignIn/SignIn.styled";
import { Link } from "react-router-dom";
import Header from "../../Header/Header";
import { StyledMain } from "../Main.styled";

export function SignUp() {
  return (
    <>
      <Header />
      <StyledMain>
        <StyledForm>
          <input type="email" placeholder="Enter Email" name="email" />
          <input type="password" placeholder="Enter Password" name="password" />
          <input
            type="password"
            placeholder="Comfirm Password"
            name="comfirm-password"
          />
          <button type="button">Sign Up</button>
          <p>
            Already have an account?{" "}
            <span>
              <Link to="/">Sign in</Link>
            </span>{" "}
          </p>
        </StyledForm>
      </StyledMain>
    </>
  );
}
