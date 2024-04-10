import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfi";
import "./Logout.css";

function Logout({ setIsAuth, SetisAdmin, SetisStudent, SetisTeacher }) {
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      SetisStudent(false);
      SetisAdmin(false);
      SetisTeacher(false);
      window.location.pathname = "/";
    });
  };
  return (
    <button onClick={signUserOut} className="logout-button">
      Log Out
    </button>
  );
}

export default Logout;
