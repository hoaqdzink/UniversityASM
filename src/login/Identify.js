import React from "react";
import { useNavigate } from "react-router-dom";
import "./Identify.css";

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
          height: "100vh", // Sửa từ "heigt" thành "height"
        }}
      >
        <div style={{ padding: "20px" }}>
          <h1>Choosing your identity</h1>
        </div>

        <div className="button-container">
          <button className="button student" onClick={Student}>
            Student
          </button>
          <button className="button teacher" onClick={Teacher}>
            Teacher
          </button>
          <button className="button admin" onClick={Admin}>
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Identify;
