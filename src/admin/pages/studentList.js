 import React, { useEffect, useState } from 'react'
 import '../css/studentList.css'
 import {db} from '../../firebaseconfi';

 import NavLink from '../components/navStudent'
 import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
 function StudentList() {

  const [students, setStudents] = useState([]);
  useEffect(()=>{
    const getData = async()=>{
      const dbVal = await getDocs(collection(db,"Student"))
      setStudents(dbVal.docs.map(doc => ({...doc.data(), key: doc.id})))
    }
    getData();
  },[])

   //chức năng xóa
  const handleDelete = async(key) => {
    //doc được sử dụng để tạo một tham chiếu tới tài liệu cụ thể có ID là id trong collection "demo".
    const deleteVal = doc(db, "Student", key)
    await deleteDoc(deleteVal)
  }
   return (
     <div>
        <NavLink></NavLink>
        <table id="_studentList">
          <thead>
            <tr>
              <th>Mssv</th>
              <th>Họ Tên</th>
              <th>Ngày sinh</th>
              <th>Giới tính</th>
              <th>Địa chỉ</th>
              <th>Mail</th>
              <th>Khoa</th>
              <th>SĐT</th>
              <th>Năm học</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map(student =>
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.fullName}</td>
                <td>{student.birthday.toDate().toLocaleDateString()}</td>
                <td>{student.Gender ? 'Nam' : 'Nữ'}</td>
                <td>{student.address}</td>
                <td>{student.email}</td>
                <td>{student.Major}</td>
                <td>{student.phone}</td>
                <td>{student.startYear}</td>
                <td>
                  <button onClick={()=> handleDelete(student.key)}> <i className="trash icon"></i> </button> 
                 {/* <button onClick={()=> handleEdit(value.key)}><i className="edit icon"></i></button> */}
                </td>
              </tr>
            )}
          </tbody>
        </table>

     </div>
   )
 }
 
 export default StudentList