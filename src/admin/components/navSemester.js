import React, { Component } from 'react'

class navSemester extends Component {
  render() {
    return (
        <div>
            <a href="/admin/semester">Đăng kí học kì</a> ||
            <a href="/admin/semester/list">Danh sách các học kì</a>
            <hr />
        </div>
    )
  }
}

export default navSemester