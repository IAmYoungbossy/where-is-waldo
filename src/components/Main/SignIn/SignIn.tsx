/* eslint-disable react-hooks/exhaustive-deps */
import { StyledForm } from "./SignIn.styled";
import { Link, useNavigate } from "react-router-dom";
import { StyledMain } from "../Main.styled";
import Header from "../../Header/Header";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";
import { useEffect, useState } from "react";
import {
  auth,
  logInWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
} from "../../utilities/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export function SignIn(): JSX.Element {
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  // Directs only valid users to dasboard
  useEffect(() => {
    if (loading) return;
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
              onClick={() => logInWithEmailAndPassword(email, password)}
            >
              Login
            </button>
            <button type="button" onClick={signInWithGoogle}>
              <FcGoogle /> <span>Sign in with Google</span>
            </button>
            <button type="button" onClick={signInWithFacebook}>
              <AiFillFacebook /> <span>Sign in with Facebook</span>
            </button>
            <button type="button">
              <Link to="/dashboard">Try Me</Link>
            </button>
            <p>
              <Link to="/reset-password">Forgot Password?</Link>
            </p>
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
