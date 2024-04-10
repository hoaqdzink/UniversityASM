import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Admin from "./admin/admin";
import Home from "./Home/Home";
import Login from "./Authen/Login";
import Logout from "./Authen/Logout";
import Identify from "./Authen/Identify";
import { useState } from "react";
import Student from "./Student/Student";

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [isStudent, SetisStudent] = useState(localStorage.getItem("Student"));
  const [isTeacher, SetisTeacher] = useState(localStorage.getItem("Teacher"));
  const [isAdmin, SetisAdmin] = useState(localStorage.getItem("Admin"));
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                isAdmin={isAdmin}
                isStudent={isStudent}
                isTeacher={isTeacher}
                isAuth={isAuth}
                SetisStudent={SetisStudent}
                SetisAdmin={SetisAdmin}
                SetisTeacher={SetisTeacher}
                setIsAuth={setIsAuth}
              />
            }
          />
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/identify"
            element={
              <Identify
                SetisStudent={SetisStudent}
                SetisAdmin={SetisAdmin}
                SetisTeacher={SetisTeacher}
              />
            }
          />
          <Route path="/admin" element={<Admin />} />
          <Route path="/student" element={<Student />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
