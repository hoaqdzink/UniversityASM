import React, { Component } from 'react'

class navTeacher extends Component {
  render() {
    return (
        <div className='_teacherForm'>
            <a href="/admin/teachers">Thông tin giáo viên</a> ||
            <a href="/admin/teacher/list">Danh sách giáo viên</a>
            <hr />
      </div>
    )
  }
}

export default navTeacher