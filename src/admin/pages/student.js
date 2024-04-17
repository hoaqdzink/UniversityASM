import React from 'react'
import '../css/stdeunt.css'

import NavLink from '../components/navStudent'
function student(){
  return (
    <div className='_student'>
      <NavLink></NavLink>
      <h1 className='text_student'>Thông tin sinh viên</h1>
      <form action="" className='form_student'>
        <div className='groupInp'>
          <label htmlFor="fullname">Fullname: </label>
          <input type="text" name='fullname' />
        </div>
        <div className='groupInp'>
          <label htmlFor="mssv">MSSV: </label>
          <input type="text" name='id' />
        </div>
        <div className='groupInp'>
          <label htmlFor="birthday">Ngày sinh: </label>
          <input type="date" name='birthday' />
        </div>
        <div className='groupInp'>
          <label htmlFor="gender">Giới tính: </label> <br />
          Nam <input type="radio" value={true} /> 
          Nữ <input type="radio" value={false} /> 
        </div>
        <div className='groupInp'>
          <label htmlFor="address">Địa chỉ: </label>
          <input type="text" name='address' />
        </div>
        <div className='groupInp'>
          <label htmlFor="phone">Phone: </label>
          <input type="text" name='phone' />
        </div>
        <div className='groupInp'>
          <label htmlFor="startYear">Năm nhập học: </label>
          <input type="number" name='startYear' />
        </div>
        <button>Thêm</button>
        <button>Sửa</button>
        <button>Xóa</button>
        <button>Reset</button>
        
      </form>
    </div>
  )
}

export default student