import React from 'react'

function FormStudent({formData,setFormData}) {
  return (
    <div  className='form_student'>
        <div className='groupInp'>
          <label htmlFor="fullname">Họ và tên: </label>
          <input type="text" name='fullName' value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
        </div>
        <div className='groupInp'>
          <label htmlFor="mssv">MSSV: </label>
          <input type="text" name='id' value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} />
        </div>
        <div className='groupInp'>
          <label htmlFor="birthday">Ngày sinh: </label>
          <input type="date" name='birthday' value={formData.birthday.toISOString().split('T')[0]} 
          onChange={(e) => setFormData({ ...formData, birthday: new Date(e.target.value) })} />
        </div>
        <div className='groupInp'>
          <label htmlFor="gender">Giới tính: </label> <br />
          Nam <input type="radio" name="Gender" value="true" checked={formData.Gender === true} 
            onChange={(e) => setFormData({ ...formData, Gender: e.target.value === 'true' })}/>
          Nữ <input type="radio" name="Gender" value="false" checked={formData.Gender === false}
            onChange={(e) => setFormData({ ...formData, Gender: e.target.value === 'true' })}/>
        </div>

        <div className='groupInp'>
          <label htmlFor="address">Địa chỉ: </label>
          <input type="text" name='address' value={formData.address} 
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}/>
        </div>
        <div className='groupInp'>
          <label htmlFor="phone">Phone: </label>
          <input type="text" name='phone' value={formData.phone} 
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}/>
        </div>
        <div className='groupInp'>
          <label htmlFor="email">Email: </label>
          <input type="email" name='email' value={formData.email} 
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
        </div>
        <div className='groupInp'>
          <label htmlFor="startYear">Năm nhập học: </label>
          <input type="number" name='startYear' value={formData.startYear} 
          onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}/>
        </div>
        <div className='groupInp'>
          <label htmlFor="Major">Khoa: </label>
          <input type="text" name='Major' value={formData.Major} 
          onChange={(e) => setFormData({ ...formData, Major: e.target.value })}/>
        </div>
    </div>
  )
}

export default FormStudent