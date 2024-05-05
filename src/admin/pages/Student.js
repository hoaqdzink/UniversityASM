import React, { useEffect, useState } from 'react'
import '../css/stdeunt.css'
import NavLink from '../components/navStudent'
import {db} from '../../firebaseconfi';
import { addDoc, collection,deleteDoc,doc, getDoc, updateDoc } from 'firebase/firestore';
import FormStudent from '../components/formStudent';
import { useParams } from 'react-router-dom';

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

  const { key } = useParams();
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!key) return; // Kiểm tra xem key đã được truyền vào hay chưa
        const studentDocRef = doc(db, 'Student', key);
        const studentSnapshot = await getDoc(studentDocRef);
        if (studentSnapshot.exists()) {
          const studentData = studentSnapshot.data();
          setStudentData(studentData);
        } else {
          console.error('Sinh viên không tồn tại');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu sinh viên: ', error);
      }
    };

    fetchData();
  }, [key]);

  // Nếu có dữ liệu sinh viên, điều chỉnh formData
  useEffect(() => {
    if (studentData) {
      setFormData({
        id: studentData.id,
        fullName: studentData.fullName,
        phone: studentData.phone,
        startYear: studentData.startYear,
        email: studentData.email,
        birthday: studentData.birthday.toDate(), // Chuyển từ timestamp sang Date object
        address: studentData.address,
        Major: studentData.Major,
        Gender: studentData.Gender,
        createdDate: studentData.createdDate.toDate(), // Chuyển từ timestamp sang Date object
      });
    }
  }, [studentData]);

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

  const handleUpdate = async () => {
    if (key) {
      try {
        await updateDoc(doc(db, 'Student', key), formData);
        alert('Cập nhật thông tin thành công!');
        // Có thể thêm điều hướng sau khi cập nhật thành công
      } catch (error) {
        console.error('Lỗi khi cập nhật thông tin: ', error);
      }
    }
  };

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
    window.location.href = '/admin/students';
  }
  const handleDelete = async () => {
    if (key) {
      try {
        await deleteDoc(doc(db, 'Student', key));
        alert('Xóa thành công!');
        window.location.href = '/admin/students/list';
      } catch (error) {
        alert('Lỗi khi xóa sinh viên: ', error);
      }
    }
  };
  return (
    <div className='_student'>
      <NavLink></NavLink>
      <h1 className='text_student'>Thông tin sinh viên</h1>
      <FormStudent formData={formData} setFormData={setFormData}></FormStudent>
      <div className='btn_Student'>
        {!key ? (
          <button onClick={handleCreate}>Thêm</button>
        ) : (
          <>
            <button onClick={handleUpdate}>Sửa</button>
            <button onClick={handleDelete}>Xóa</button>
          </>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>


    </div>
  )
}

export default Student