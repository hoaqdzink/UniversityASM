import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navigator.css";

class Navigator extends Component {
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
              <Link to="/identify">
                <span className="icon">
                  <i className="sitemap icon"></i>
                </span>
                <span className="title">Đăng nhập</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navigator;
