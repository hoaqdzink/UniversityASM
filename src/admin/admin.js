import React, { Component } from "react";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import StudentPage from "./pages/Student";
import TeacherPage from "./pages/teacher";
import CoursePage from "./pages/course";
import ManagersPage from "./pages/managers";
import Logout from "../logout/logout";
import StudentList from "./pages/studentList";
import TeacherListPage from "./pages/TeacherList";
import SemesterPage from "./pages/Semester";
import SemesterListPage from "./pages/SemesterList";
import CourseListPage from "./pages/ListCourse";
import PointStudentPage from "./pages/PointStudent";
import PointDetailStudentPage from "./pages/PointDetailStudent";
import "./css/admin.css";

class admin extends Component {
  componentDidMount() {
    const list = document.querySelectorAll(".navigation li");

    function activeLink() {
      // Loại bỏ lớp 'hovered' từ tất cả các mục trong danh sách
      list.forEach((item) => {
        item.classList.remove("hovered");
        item.classList.remove("active");
      });

      // Thêm lớp 'hovered' và 'active' vào phần tử được click
      this.classList.add("hovered");
      this.classList.add("active");
    }

    // Gắn sự kiện click vào mỗi phần tử trong danh sách
    list.forEach((item) => item.addEventListener("click", activeLink));

    const toggle = document.querySelector(".toggle");
    const navigation = document.querySelector(".navigation");
    const main = document.querySelector(".main");

    toggle.onclick = function () {
      navigation.classList.toggle("active");
      main.classList.toggle("active");
    };
  }

  render() {
    return (
      <div className="container">
        <div className="navigation">
          <ul>
            <li>
              <a href="#">
                <span className="icon">
                  <i className="book icon"></i>
                </span>
                <span className="title">University</span>
              </a>
            </li>

            <li>
              <Link to="/admin/managers">
                <span className="icon">
                  <i className="home icon"></i>
                </span>
                <span className="title">Admin</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/students">
                <span className="icon">
                  <i className="address card icon"></i>
                </span>
                <span className="title">Quản lý sinh viên</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/teachers">
                <span className="icon">
                  <i className="id badge icon"></i>
                </span>
                <span className="title">Quản lý giáo viên</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/courses">
                <span className="icon">
                  <i className="sitemap icon"></i>
                </span>
                <span className="title">Quản lý khóa học</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/semester">
                <span className="icon">
                  <i className="calendar alternate icon"></i>
                </span>
                <span className="title">Tạo học kì</span>
              </Link>
            </li>

            <li>
              <Link to="/admin/point">
                <span className="icon">
                  <i className="file alternate outline icon"></i>
                </span>
                <span className="title">Xem điểm học tập</span>
              </Link>
            </li>

            <li onClickCapture={() => Logout()}>
              <a href="/">
                <span className="icon">
                  <i className="sign-out icon"></i>
                </span>
                <span className="title">Đăng xuất</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Main */}
        <div className="main">
          <div className="topbar">
            <div className="toggle">
              <i className="align justify icon"></i>
            </div>

            <div className="search">
              <label>
                <input type="text" placeholder="Search here" />
              </label>
            </div>

            <div className="user">{/* image */}</div>
          </div>

          <div className="details">
            <Routes>
              <Route path="/admin/managers" element={<ManagersPage />} />
              <Route path="/admin/students" element={<StudentPage />} />
              <Route
                path="/admin/students/edit/:key"
                element={<StudentPage />}
              />
              <Route path="/admin/teachers" element={<TeacherPage />} />
              <Route path="/admin/courses" element={<CoursePage />} />
              <Route path="/admin/courses/edit/:key" element={<CoursePage />} />
              <Route path="/admin/courses/list" element={<CourseListPage />} />
              <Route path="/admin/students/list" element={<StudentList />} />
              <Route path="/admin/teacher/list" element={<TeacherListPage />} />
              <Route
                path="/admin/teacher/edit/:key"
                element={<TeacherPage />}
              />
              <Route path="/admin/semester" element={<SemesterPage />}></Route>
              <Route
                path="/admin/semester/list"
                element={<SemesterListPage />}
              ></Route>
              <Route
                path="/admin/semester/edit/:key"
                element={<SemesterPage />}
              ></Route>

              <Route path="/admin/point" element={<PointStudentPage />}></Route>
              <Route
                path="/admin/point/student/:studentID"
                element={<PointDetailStudentPage />}
              ></Route>
            </Routes>
          </div>
        </div>
      </div>
    );
  }
}

export default admin;
