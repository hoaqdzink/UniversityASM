 import React, { useEffect, useState } from 'react'
 import '../css/tableList.css'
 import {db} from '../../firebaseconfi';
 
 import NavLink from '../components/navStudent'
 import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
 function StudentList() {

  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(50); // Số sinh viên trên mỗi trang

  useEffect(()=>{
    const getData = async()=>{
      console.log(123)
      const dbVal = await getDocs(collection(db,"Student"))
      setStudents(dbVal.docs.map(doc => ({...doc.data(), key: doc.id})))
    }
    getData();
  },[])

   //chức năng xóa
  const handleDelete = async(key) => {
    try{
      //doc được sử dụng để tạo một tham chiếu tới tài liệu cụ thể có ID là id trong collection "demo".
      const deleteVal = doc(db, "Student", key)
      await deleteDoc(deleteVal)
      alert("Xóa thành công!")
      window.location.reload()
    }catch(err){
      console.error(err)
    }
  }

  const handleEdit = (key) => {
    // Chuyển hướng đến trang chỉnh sửa sinh viên với studentKey
    window.location.href = `/admin/students/edit/${key}`;
  }

  // Xác định index của sinh viên đầu tiên và cuối cùng trên trang hiện tại
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

  // Logic xử lý chuyển trang
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
   return (
     <div>
        <NavLink></NavLink>
        <table id="_tableList">
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
                  <button onClick={() => handleEdit(student.key)}><i className="edit icon"></i></button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Hiển thị các nút phân trang */}
        <div>
          {Array.from({ length: Math.ceil(students.length / studentsPerPage) }, (_, i) => i + 1).map(
            (pageNumber) => (
              <button key={pageNumber} onClick={() => paginate(pageNumber)}>
                {pageNumber}
              </button>
            )
          )}
        </div>
     </div>
   )
 }
 
 export default StudentList