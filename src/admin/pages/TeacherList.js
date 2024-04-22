import React, { useEffect, useState } from 'react'
import NavLink from '../components/navTeacher';
import '../css/tableList.css'
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import {db} from '../../firebaseconfi';
function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    useEffect(()=>{
        const getData = async()=>{
          console.log(123)
          const dbVal = await getDocs(collection(db,"Teacher"))
          setTeachers(dbVal.docs.map(doc => ({...doc.data(), key: doc.id})))
        }
        getData();
      },[])

         //chức năng xóa
        const handleDelete = async(key) => {
            try{
            //doc được sử dụng để tạo một tham chiếu tới tài liệu cụ thể có ID là id trong collection "demo".
            const deleteVal = doc(db, "Teacher", key)
            await deleteDoc(deleteVal)
            alert("Xóa thành công!")
            window.location.reload()
            }catch(err){
            console.error(err)
            }
        }

        const handleEdit = (key) => {
            // Chuyển hướng đến trang chỉnh sửa sinh viên với studentKey
            window.location.href = `/admin/teacher/edit/${key}`;
        }

    return (
        <div>
            <NavLink />
            <table id="_tableList">
                <thead>
                    <tr>
                        <th>MSGV</th>
                        <th>Họ Tên</th>
                        <th>Ngày sinh</th>
                        <th>Giới tính</th>
                        <th>Email</th>
                        <th>SĐT</th>
                        <th>Chuyên môn</th>
                        <th>Bằng cấp</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {teachers && teachers.map(teacher => (
                    <tr key={teacher.key}>
                        <td>{teacher.msgv}</td>
                        <td>{teacher.fullName}</td>
                        <td>{teacher.birthday ? teacher.birthday.toDate().toLocaleDateString() : ''}</td>
                        <td>{teacher.gender ? 'Nam' : 'Nữ'}</td>
                        <td>{teacher.email}</td>
                        <td>{teacher.phone}</td>
                        <td>{teacher.expertise}</td>
                        <td>
                            <ul>
                                {teacher.certificates && teacher.certificates.map((certificate, index) => (
                                    <li key={index}>{certificate.degree}</li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            <button onClick={()=> handleDelete(teacher.key)}> <i className="trash icon"></i> </button> 
                            <button onClick={() => handleEdit(teacher.key)}><i className="edit icon"></i></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default TeacherList;