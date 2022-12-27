/* eslint-disable react-hooks/exhaustive-deps */
import { StyledForm } from "./SignIn.styled";
import { Link, useNavigate } from "react-router-dom";
import { StyledMain } from "../Main.styled";
import Header from "../../Header/Header";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { useEffect, useState } from "react";
import { auth, signInWithGoogle } from "../../utilities/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signInWithEmailAndPassword } from "firebase/auth";

export function SignIn(): JSX.Element {
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      // TODO: loading screen
      return;
    }

    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <>
      <Header />
      <StyledMain>
        <div>
          <StyledForm>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => signInWithEmailAndPassword(auth, email, password)}
            >
              Login
            </button>
            <button type="button" onClick={signInWithGoogle}>
              <FcGoogle /> Sign in with Google
            </button>
            <button type="button">
              <AiFillFacebook /> Sign in with Facebook
            </button>
            <button type="button">
              <Link to="/dashboard">Try Me</Link>
            </button>
            <div>
              <Link to="/reset-password">Forgot Password</Link>
            </div>
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
