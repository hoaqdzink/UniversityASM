import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CoursePage from "./pages/course";
import ScorePage from "./pages/score";
import Information from "./pages/information";
import Logout from "../logout/logout";
import "./css/teacher.css";

class teacher extends Component {
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
              <Link to="/teacher/information">
                <span className="icon">
                  <i className="home icon"></i>
                </span>
                <span className="title">Teacher</span>
              </Link>
            </li>

            <li>
              <Link to="/teacher/courses">
                <span className="icon">
                  <i className="sitemap icon"></i>
                </span>
                <span className="title">Quản lý khóa học</span>
              </Link>
            </li>

            <li>
              <a href="#">
                <span className="icon">
                  <i className="sun outline icon"></i>
                </span>
                <span className="title">Cài đặt</span>
              </a>
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
                <i className="search icon"></i>
              </label>
            </div>

            <div className="user">{/* image */}</div>
          </div>

          <div className="details">
            <Routes>
              <Route path="/teacher/information" element={<Information />} />
              <Route path="/teacher/courses" element={<CoursePage />} />
              <Route path="/teacher/score/:courseID" element={<ScorePage />} />
            </Routes>
          </div>
        </div>
      </div>
    );
  }
}

export default teacher;
