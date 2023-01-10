/* eslint-disable react-hooks/exhaustive-deps */
import "../Main.css";
import "../SignIn/SignIn.css";
import "../LeaderBoard/LeaderBoard.css";
import Header from "../../Header/Header";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, registerWithEmailAndPassword } from "../../utilities/firebase";
import React from "react";

export const SignUp = React.memo(
  ({
    setUserData,
  }: {
    setUserData: React.Dispatch<
      React.SetStateAction<{
        name: string;
        profileUrl: string;
      }>
    >;
  }) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [user, loading] = useAuthState(auth);
    const [password, setPassword] = useState("");
    const [errorEntry, setErrorEntry] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const inputFields = [
      { name: "name", value: name, placeholder: "Name", onChange: setName },
      {
        value: email,
        name: "email",
        onChange: setEmail,
        placeholder: "Enter Email",
      },
      {
        value: password,
        name: "password",
        onChange: setPassword,
        placeholder: "Enter Password",
      },
      {
        name: "password",
        value: confirmPassword,
        onChange: setConfirmPassword,
        placeholder: "Confirm Password",
      },
    ];

    // Input field validation
    const register = () => {
      if (name.trim() === "") {
        setErrorEntry("Input a valid name");
        setTimeout(() => setErrorEntry(""), 2000);
        return;
      } else if (password !== confirmPassword) {
        setErrorEntry("Password doesn't match");
        setTimeout(() => setErrorEntry(""), 2000);
        return;
      } else if (password.length < 6) {
        setErrorEntry("Password must atleast six letter long");
        setTimeout(() => setErrorEntry(""), 2000);
        return;
      }
      registerWithEmailAndPassword(name, email, password, setUserData);
    };

    useEffect(() => {
      if (loading) return;
      if (user) navigate("/dashboard", { replace: true });
    }, [user, loading]);

    return (
      <>
        <Header>
          <h2 className="header-tag">
            <Link to={"/"}>HiddenFolks</Link>
          </h2>
        </Header>
        <main>
          <form className="form">
            {inputFields.map((input) => (
              <input
                type={input.name}
                name={input.name}
                value={input.value}
                key={input.placeholder}
                placeholder={input.placeholder}
                onChange={(e) => input.onChange(e.target.value)}
              />
            ))}
            {errorEntry !== "" && <span>{errorEntry}</span>}
            <button type="button" onClick={register}>
              Sign Up
            </button>
            <p>
              Already have an account?{" "}
              <span>
                <Link to="/">Sign in</Link>
              </span>{" "}
            </p>
          </form>
        </main>
      </>
    );
  }
);
