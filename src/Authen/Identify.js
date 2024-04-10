import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

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
          <h1>Choose you indentify</h1>
        </div>

        <div
          class="btn-group-vertical"
          role="group"
          aria-label="Vertical button group"
        >
          <button
            type="button"
            class="btn btn-primary btn-lg"
            onClick={Student}
            style={{ margin: "20px" }}
          >
            Student
          </button>
          <button
            type="button"
            class="btn btn-primary btn-lg"
            onClick={Teacher}
            style={{ margin: "20px" }}
          >
            Teacher
          </button>
          <button
            type="button"
            class="btn btn-primary btn-lg"
            onClick={Admin}
            style={{ margin: "20px" }}
          >
            Admin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Identify;
