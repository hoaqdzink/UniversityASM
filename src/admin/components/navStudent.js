import React, { Component } from 'react'

export class navStudent extends Component {
  render() {
    return (
      <div>
        <a href="/admin/students">Thông tin sinh viên</a> ||
        <a href="/admin/students/list">Danh sách sinh viên</a>
      <hr />
      </div>
    )
  }
}

export default navStudent