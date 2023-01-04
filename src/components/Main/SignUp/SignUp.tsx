/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../../Header/Header";
import { StyledMain } from "../Main.styled";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledForm } from "../SignIn/SignIn.styled";
import { useAuthState } from "react-firebase-hooks/auth";
import { StyledHeaderTag } from "../LeaderBoard/LeaderBoard.style";
import { auth, registerWithEmailAndPassword } from "../../utilities/firebase";

export function SignUp() {
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
    registerWithEmailAndPassword(name, email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard", { replace: true });
  }, [user, loading]);

  return (
    <>
      <Header>
        <StyledHeaderTag>
          <Link to={"/"}>HiddenFolks</Link>
        </StyledHeaderTag>
      </Header>
      <StyledMain>
        <StyledForm>
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
        </StyledForm>
      </StyledMain>
    </>
  );
}
