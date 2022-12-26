import { StyledForm } from "./SignIn.styled";
import { Link } from "react-router-dom";
import { StyledMain } from "../Main.styled";
import Header from "../../Header/Header";

export function SignIn(): JSX.Element {
  return (
    <>
      <Header />
      <StyledMain>
        <div>
          <StyledForm>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
            />
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
            />
            <button type="button">Login</button>
            <button type="button">Sign in with Google</button>
            <button type="button">Sign in with GitHub</button>
            <button type="button">
              <Link to="/dashboard">Try Me</Link>
            </button>
            <p>
              dont have an account?{" "}
              <span>
                <Link to="/sign-up">Sign-up</Link>
              </span>
            </p>
          </StyledForm>
        </div>
      </StyledMain>
    </>
  );
}
