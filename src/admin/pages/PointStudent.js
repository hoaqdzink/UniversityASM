import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {db} from '../../firebaseconfi';

function PointStudent() {
    const [students, setStudents] = useState([]);

    useEffect(()=>{
        const getData = async()=>{
          console.log(123)
          const dbVal = await getDocs(collection(db,"Student"))
          setStudents(dbVal.docs.map(doc => ({...doc.data(), key: doc.id})))
        }
        getData();
      },[])
  return (
    <div>
        <table id="_tableList">
            <thead>
            <tr>
                <th>Mssv</th>
                <th>Họ và tên</th>
                <th>Khoa</th>
                <th>Năm nhập học</th>
                <th>Email</th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            {students.map(student =>
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.fullName}</td>
                <td>{student.Major}</td>
                <td>{student.startYear}</td>
                <td>{student.email}</td>
                <td>
                <a href={`/admin/point/student/${student.key}`}>Xem quá trình học tập</a>
                </td>
              </tr>
            )}
          </tbody>
        </table>
    </div>
  )
}

export default PointStudent