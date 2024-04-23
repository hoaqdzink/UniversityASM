import React, { useEffect, useState } from 'react'
import { db } from '../../firebaseconfi';
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import NavSemester from '../components/navSemester';
import { useParams } from 'react-router-dom';
function Semester() {
    const [semester, setSemester] = useState({
        idHK: '',
        name: '',
        year: ''
    });
    const value = collection(db,"Semester");

    const {key} = useParams();

    useEffect(()=>{
        console.log(123)
        const fetchData = async() => {
            try {
                if(!key) return;
                const studentDoc = doc(db, 'Semester', key);
                const studentSnapshot = await getDoc(studentDoc)
                if(studentSnapshot.exists()){
                    const semesterData = studentSnapshot.data();
                    setSemester({
                        idHK: semesterData.idHK,
                        name: semesterData.name,
                        year: semesterData.year
                    });
                } else {
                    console.error('Học kì không tồn tại');
                }
            } catch (error) {
                alert("Lỗi không thể đọc được học kì!");
            }
        }
        fetchData();
    }, [key])
    const handleSave = async() => {
        try {
            if(!semester.idHK || !semester.name || !semester.year){
                alert("Vui lòng nhập đầy đủ thông tin")
                return;
            } 
            console.log(semester);
            const add = await addDoc(value,semester);
            alert("Thêm thành công!!!");
            console.log(add.id);
            handleReset();
        }catch (err) {
            alert('Thêm học kì không thành công ' + err.message);   
        };
    };
    const handleReset = async() =>{
        setSemester({
            idHK: '',
            name: '',
            year: ''
        });
        window.location.href = `/admin/semester`
    }
    const handleUpdate = async() =>{
        if(key){
            await updateDoc(doc(db,'Semester',key), semester);
            alert('Cập nhật thông tin thành công!');
        }
    }
    const handleDelete = async() =>{
        if(key){
            await deleteDoc(doc(db,'Semester',key), semester);
            alert('Xóa thành công!');
            window.location.href = '/admin/semester/list';
        }
    }
  return (
    <div>
        <NavSemester></NavSemester>
        <h1>MỞ HỌC KÌ</h1>
        <div className='semester'>
            <div className="input-group">
                <label htmlFor="idHK">Mã học kì: </label>
                <input type="text" name="idHK" value={semester.idHK} onChange={(e) => setSemester({...semester, idHK: e.target.value})} />
            </div>

            <div className="input-group">
                <label htmlFor="idHK">Tên học kì</label>
                <input type="text" name="name" value={semester.name} onChange={(e) => setSemester({...semester, name: e.target.value})} />
            </div>

            <div className="input-group">
                <label htmlFor="idHK">Năm</label>
                <input type="text" name="name" value={semester.year} onChange={(e) => setSemester({...semester, year: e.target.value})} />
            </div>

            {!key ? (
                <button onClick={handleSave}>Thêm</button>
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
export default Semester;