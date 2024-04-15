import React from "react";
import { useNavigate } from "react-router-dom";

function Identify({ SetisStudent, SetisAdmin, SetisTeacher }) {
  let navigate = useNavigate();

  const Student = () => {
    localStorage.setItem("Student", true);
    SetisStudent(true);
    navigate("/login");
  };

  const Teacher = () => {
    localStorage.setItem("Teacher", true);
    SetisTeacher(true);
    navigate("/login");
  };

  const Admin = () => {
    localStorage.setItem("Admin", true);
    SetisAdmin(true);
    navigate("/login");
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          heigt: "100vh",
        }}
      >
        <div style={{ padding: "20px" }}>
          <h1>Choosing you indentify</h1>
        </div>

        <div>
          <button onClick={Student} style={{ margin: "20px" }}>
            Student
          </button>
          <button onClick={Teacher} style={{ margin: "20px" }}>
            Teacher
          </button>
          <button onClick={Admin} style={{ margin: "20px" }}>
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Identify;
