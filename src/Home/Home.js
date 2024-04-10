import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logout from "../Authen/Logout";
import "./Home.css";

function Home({
  isAdmin,
  isStudent,
  isTeacher,
  isAuth,
  setIsAuth,
  SetisAdmin,
  SetisStudent,
  SetisTeacher,
}) {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" className="decor">
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {!isAuth && <Nav.Link href="/identify">Login</Nav.Link>}

            {isAdmin && <Nav.Link href="/admin">Admin</Nav.Link>}
            {isAuth && (
              <Logout
                SetisStudent={SetisStudent}
                SetisAdmin={SetisAdmin}
                SetisTeacher={SetisTeacher}
                setIsAuth={setIsAuth}
              />
            )}
          </Nav>
        </Container>
      </Navbar>

      <body>
        <div className="bg"></div>
      </body>
    </>
  );
}

export default Home;
