import React from "react";
import { auth, provider } from "../firebaseconfi";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="loginPage">
      <p>Signing In With Google to Continue </p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with google
      </button>
    </div>
  );
}

export default Login;
