import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfi";

function Logout() {
  console.log("hello");
  signOut(auth).then(() => {
    localStorage.clear();
    window.location.pathname = "/";
  });
}

export default Logout;
