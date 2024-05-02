import React from "react";
import { useNavigate } from "react-router-dom";
import "./Identify.css"; // Liên kết file CSS vào component

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Corrected "heigt" to "height"
      }}
    >
      <div className="identify-container">
        <div className="identify-header">
          <div className="title-container"> {/* Sử dụng div inline để bọc chữ */}
            <h1>Choosing your identity</h1>
          </div>
        </div>

        <div className="identify-options">
          <button onClick={Student} className="identify-button student">
            Student
          </button>
          <button onClick={Teacher} className="identify-button teacher">
            Teacher
          </button>
          <button onClick={Admin} className="identify-button admin">
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Identify;
