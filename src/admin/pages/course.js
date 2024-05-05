import React, { useState, useEffect } from 'react';
import { db } from '../../firebaseconfi';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import NavCourse from '../components/navCourse';
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
    if (key) {
      try {
        await updateDoc(doc(db, "courses", key), formData);
        alert("Cập nhật thông tin thành công!");
        // Có thể thêm điều hướng sau khi cập nhật thành công
      } catch (error) {
        console.error("Lỗi khi cập nhật thông tin: ", error);
      }
    }
  }

  const handleDelete = async() =>{
    if (key) {
      try {
        await deleteDoc(doc(db, "courses", key));
        alert("Xóa thành công!");
        window.location.href = "/admin/courses/list";
      } catch (error) {
        alert("Lỗi khi xóa môn học: ", error);
      }
    }
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
  const [courseData, setCourseData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!key) return; // Kiểm tra xem key đã được truyền vào hay chưa
        const coursesDocRef = doc(db, "courses", key);
        const courseSnapshot = await getDoc(coursesDocRef);
        if (courseSnapshot.exists()) {
          const teacherData = courseSnapshot.data();
          setCourseData(teacherData); // Sửa đổi tại đây
        } else {
          console.error("Giáo viên không tồn tại");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giáo viên: ", error);
      }
    };

    fetchData();
  }, [key]);

  // Nếu có dữ liệu couser, điều chỉnh formData
  useEffect(() => {
    if (courseData) {
      const {
        StartCourseDate,
        description,
        name,
        semester,
        teacherID
      } = courseData;
  
      setFormData((prevFormData) => ({
        ...prevFormData,
        name: name || "",
        semester: semester || "",
        teacherID: teacherID || "",
        StartCourseDate: StartCourseDate ? StartCourseDate.toDate() : new Date(), // Chuyển từ timestamp sang Date object
        description: description || "",
      }));
    }
  }, [courseData]);
  return (
    <div>
      <NavCourse></NavCourse>
      <div className='form_Course'>
      <h1 style={{ textAlign: 'center' }}>Quản lý khóa học</h1>
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
    </div>
  );
}

export default Course;
