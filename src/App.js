import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./admin/admin";
import Teacher from "./teacher/teacher";
import Student from "./student/student";
import Navigator from "./login/navigator";
import Identify from "./login/Identify";
import Login from "./login/Login";
function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [isStudent, SetisStudent] = useState(localStorage.getItem("Student"));
  const [isTeacher, SetisTeacher] = useState(localStorage.getItem("Teacher"));
  const [isAdmin, SetisAdmin] = useState(localStorage.getItem("Admin"));
  return (
    <div className="App">
      <Router>
        {!isAuth && <Navigator></Navigator>}
        {isAuth && isAdmin && <Admin></Admin>}
        {isAuth && isStudent && <Student></Student>}
        {isAuth && isTeacher && <Teacher></Teacher>}
        <Routes>
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
