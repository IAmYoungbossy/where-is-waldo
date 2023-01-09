/* eslint-disable react-hooks/exhaustive-deps */
import "../Main.css";
import "./SignIn.css";
import {
  auth,
  signInWithGoogle,
  signInWithFacebook,
  logInWithEmailAndPassword,
} from "../../utilities/firebase";
import { FcGoogle } from "react-icons/fc";
import { useEffect, useState } from "react";
import { AiFillFacebook } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import Header, { SignInHeader } from "../../Header/Header";

interface SignInProps {
  setUserData: React.Dispatch<
    React.SetStateAction<{ name: string; profileUrl: string }>
  >;
}

export function SignIn({ setUserData }: SignInProps): JSX.Element {
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
      <Header>
        <SignInHeader />
      </Header>
      <main>
        <div className="form-container">
          <form className="form">
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
              onClick={() =>
                logInWithEmailAndPassword(email, password, setUserData)
              }
            >
              Login
            </button>
            <button type="button" onClick={() => signInWithGoogle(setUserData)}>
              <FcGoogle /> <span>Sign in with Google</span>
            </button>
            <button
              type="button"
              onClick={() => signInWithFacebook(setUserData)}
            >
              <AiFillFacebook /> <span>Sign in with Facebook</span>
            </button>
            <button
              type="button"
              onClick={() =>
                logInWithEmailAndPassword(
                  "testingthis@nomail.com",
                  "123456",
                  setUserData
                )
              }
            >
              Demo
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
          </form>
        </div>
      </main>
    </>
  );
}
