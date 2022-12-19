import { StyledForm } from "./SignIn.styled";

export function SignIn() {
  return (
    <div>
      <StyledForm>
        <input type="email" id="email" name="email" placeholder="Enter Email" />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter Password"
        />
        <button type="button">Login</button>
        <button type="button">Sign in with Google</button>
        <button type="button">Sign in with GitHub</button>
        <button type="button">Try Me</button>
        <p>
          dont have an account? <span>Sign-up</span>
        </p>
      </StyledForm>
    </div>
  );
}
