/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../../Header/Header";
import { StyledMain } from "../Main.styled";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledForm } from "../SignIn/SignIn.styled";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../utilities/firebase";
import { FcGoogle } from "react-icons/fc";

export function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading] = useAuthState(auth);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard", { replace: true });
  }, [user, loading]);

  return (
    <>
      <Header />
      <StyledMain>
        <StyledForm>
          <input
            type="name"
            name="name"
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            name="comfirm-password"
            value={confirmPassword}
            placeholder="Comfirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="button" onClick={register}>
            Sign Up
          </button>
          <button
            className="register__btn register__google"
            onClick={signInWithGoogle}
          >
            <FcGoogle />
            Register with Google
          </button>
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
