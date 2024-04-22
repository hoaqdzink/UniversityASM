import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseconfi';
import NavSemester from '../components/navSemester';
function SemesterList() {
    const [semester, setSemester] = useState([]);

    useEffect(() =>{
        const getData = async() =>{
            const data = await getDocs(collection(db,"Semester"))
            setSemester(data.docs.map(doc => ({...doc.data(), key: doc.id})));
        }   
        getData();
    }, [])
    const handleDelete = async (e) => {
        try {
            const deleteData = doc(db,"Semester",e)
            await deleteDoc(deleteData);
            alert("Xóa thành công!!!")
            window.location.reload();
        } catch (error) {
            alert("Xóa không thành công!!!");
        }
    }
    const handleEdit= async (e) => {
        window.location.href = `/admin/semester/edit/${e}`
    }
  return (
    <div>
        <NavSemester></NavSemester>
        <table id="_tableList">
                <thead>
                    <tr>
                        <th>Mã HK</th>
                        <th>Tên HK</th>
                        <th>Năm</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {semester && semester.map(semester => (
                    <tr key={semester.key}>
                        <td>{semester.idHK}</td>
                        <td>{semester.name}</td>
                        <td>{semester.year}</td>
                        <td>
                            <button onClick={()=> handleDelete(semester.key)}> <i className="trash icon"></i> </button> 
                            <button onClick={() => handleEdit(semester.key)}><i className="edit icon"></i></button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
    </div>
  )
}

export default SemesterList