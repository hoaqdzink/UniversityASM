import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseconfi';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import '../css/Course.css'

function Course() {
  const [formData, setFormData] = useState({
    StartCourseDate: new Date(),
    description: '',
    name: '',
    semester: '',
    teacherID: '',
    createdDate: new Date()
  });

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const teacherCollection = collection(db, 'Teacher');
      const snapshot = await getDocs(teacherCollection);
      const teacherList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTeachers(teacherList);
    };

    fetchTeachers();
  }, []);

  const value = collection(db,"courses")

  const handleCreate = async() =>{
    try {
      // Kiểm tra các trường dữ liệu cần thiết
      if (!formData.name || !formData.semester || !formData.teacherID || !formData.StartCourseDate || !formData.description) {
        console.log(formData);
        alert("Vui lòng nhập đầy đủ thông tin");
        return;
    }
      console.log(formData)
      const docRef = await addDoc(value, formData);
      alert("Thêm thành công");
      console.log("Document written with ID: ", docRef.id);
      handleReset();
    } catch (error) {
      console.error(error);
    }
  }

  const handleUpdate = async() =>{
  }

  const handleDelete = async() =>{
  }

  const handleReset = async() =>{
    setFormData({
      StartCourseDate: new Date(),
      description: '',
      name: '',
      semester: '',
      teacherID: '',
      createdDate: new Date()
    });
    window.location.href = '/admin/courses'
  }

  const { key } = useParams();
  return (
    <div className='form_Course'>
        <div className='groupInp'>
          <label htmlFor="name">Tên khóa học: </label>
          <input type="text" name='name' value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className='groupInp'>
          <label htmlFor="semester">Học kì: </label>
          <input type="text" name='semester' value={formData.semester} onChange={(e) => setFormData({...formData, semester: e.target.value})} />
        </div>
        <div className='optionTeacher'>
          <label htmlFor="teacherID">Chọn giáo viên:</label>
          <select id="teacherID" name="teacherID" value={formData.teacherID} onChange={(e) => setFormData({...formData, teacherID: e.target.value})}>
            {teachers.map(teacher => (
              <option key={teacher.id} value={teacher.id}>{teacher.fullName}</option>
            ))}
          </select>
        </div>
        <div className='groupInp'>
          <label htmlFor="StartCourseDate">Ngày bắt đầu học kì: </label>
          <input type="date" name='StartCourseDate' value={formData.StartCourseDate.toISOString().split('T')[0]} onChange={(e) => setFormData({...formData, StartCourseDate: new Date(e.target.value)})} />
        </div>
        <div className='groupInp'>
          <label htmlFor="description">Mô tả khóa học: </label>
          <textarea id="description" name="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} rows="4" cols="50"></textarea>
        </div>

        <div className='btn_Course'>
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
  );
}

export default Course;
