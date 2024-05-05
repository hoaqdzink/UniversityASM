import React, { Component } from 'react'

class NavCourse extends Component {
  render() {
    return (
        <div className='_teacherForm'>
        <a href="/admin/courses">Thông tin khóa học</a> ||
        <a href="/admin/courses/list">Danh sách khóa học</a>
        <hr />
  </div>
    )
  }
}

export default NavCourse