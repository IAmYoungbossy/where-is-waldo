/* eslint-disable react-hooks/exhaustive-deps */
import Header from "../../Header/Header";
import { StyledMain } from "../Main.styled";
import { useEffect, useState } from "react";
import { StyledForm } from "../SignIn/SignIn.styled";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sendPasswordReset } from "../../utilities/firebase";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <>
      <Header></Header>
      <StyledMain>
        <StyledForm>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="button"
            className="reset__btn"
            onClick={() => sendPasswordReset(email)}
          >
            Send password reset email
          </button>
          <p>
            Don't have an account? <Link to="/sign-up">Register</Link> now.
          </p>
        </StyledForm>
      </StyledMain>
    </>
  );
};
