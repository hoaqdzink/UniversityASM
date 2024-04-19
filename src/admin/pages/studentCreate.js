import React, { useState } from 'react'
import '../css/stdeunt.css'
import NavLink from '../components/navStudent'
import {db} from '../../firebaseconfi';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import FormStudent from '../components/formStudent';

function Student(){
  const [formData, setFormData] = useState({
    id: '',
    fullName: '',
    phone: '',
    startYear: '',
    email: '',
    birthday: new Date('2021-01-01'),
    address:'',
    Major: '',
    Gender: true,
    createdDate: new Date()
  })
  const value = collection(db,"Student")
  // Thêm tài liệu mới vào cơ sở dữ liệu
  const handleCreate = async() =>{
    try {
      // Kiểm tra các trường dữ liệu cần thiết
      if (!formData.fullName || !formData.id  || !formData.address || !formData.phone || !formData.startYear || !formData.Major) {
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
      }
      console.log(formData)
      const docRef = await addDoc(value, formData);
      alert("Thêm thành công");
      console.log("Document written with ID: ", docRef.id);
      handleReset();
    }catch (e) {
      console.error(e);
    }
}

  //reset form data
  const handleReset = async() =>{
    setFormData({
      id: '',
      fullName: '',
      phone: '',
      startYear: '',
      email: '',
      birthday: new Date('2021-01-01'),
      address:'',
      Major: '',
      Gender: true,
      createdDate: new Date()
    });
  }
  return (
    <div className='_student'>
      <NavLink></NavLink>
      <h1 className='text_student'>Thông tin sinh viên</h1>
      <FormStudent formData={formData} setFormData={setFormData}></FormStudent>
      <div className='btn_Student'>
        <button onClick={handleCreate}>Thêm</button>
        <button onClick={handleReset}>Reset</button>
      </div>

    </div>
  )
}

export default Student