/* eslint-disable react-hooks/exhaustive-deps */
import "../Main.css";
import "../SignIn/SignIn.css";
import "../../Header/Header.css";
import Header from "../../Header/Header";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, sendPasswordReset } from "../../utilities/firebase";
import React from "react";

export const ResetPassword = React.memo(() => {
  const [email, setEmail] = useState("");
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <>
      <Header>
        <h1>HiddenFolks</h1>
      </Header>
      <main>
        <form>
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
        </form>
      </main>
    </>
  );
});
