import React, { Component } from "react";
import "../css/managers.css";

class Managers extends Component {
  render() {
    return (
      <div>
        <h1 className="system-title">Trang Quản Lý Hệ Thống Trường</h1>
        <div className="managers-container">
          {/* Khung vuông quản lý sinh viên */}
          <div className="square student-manager">
            <a href="/admin/students">
              <h2>Quản lý sinh viên</h2>
            </a>
          </div>
          {/* Khung vuông quản lý giáo viên */}
          <div className="square teacher-manager">
            <a href="/admin/teachers">
              <h2>Quản lý giáo viên</h2>
            </a>
          </div>
          {/* Khung vuông quản lý khóa học */}
          <div className="square course-manager">
            <a href="/admin/courses">
              <h2>Quản lý khóa học</h2>
            </a>
          </div>
          {/* Khung vuông tạo học kì */}
          <div className="square semester-manager">
            <a href="/admin/semester">
              <h2>Tạo học kì</h2>
            </a>
          </div>

          {/* Khung vuông danh sách sinh viên */}
          <div className="square student-list">
            <a href="/admin/students/list">
              <h2>Danh sách sinh viên</h2>
            </a>
          </div>
          {/* Khung vuông danh sách giáo viên */}
          <div className="square teacher-list">
            <a href="/admin/teacher/list">
              <h2>Danh sách giáo viên</h2>
            </a>
          </div>
          {/* Khung vuông danh sách khóa học */}
          <div className="square course-list">
            <a href="/admin/courses/list">
              <h2>Danh sách khóa học</h2>
            </a>
          </div>
          {/* Khung vuông danh sách học kì */}
          <div className="square semester-list">
            <a href="/admin/semester/list">
              <h2>Danh sách học kì</h2>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Managers;
