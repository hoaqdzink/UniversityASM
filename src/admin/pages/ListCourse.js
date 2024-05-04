import { collection, getDocs, doc, getDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebaseconfi';
import React, { useEffect, useState } from 'react';
import NavCourse from '../components/navCourse';
function ListCourse() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const courseCollection = collection(db, "courses");
        const snapshot = await getDocs(courseCollection);
        const coursesData = [];
        for (const docRef of snapshot.docs) {
          const courseData = docRef.data();
          // Truy vấn thông tin giáo viên từ Firestore bằng teacherID
          const teacherDocRef = doc(db, "Teacher", courseData.teacherID);
          const teacherSnapshot = await getDoc(teacherDocRef);
          const teacherData = teacherSnapshot.data();
          // Thêm thông tin đầy đủ của giáo viên vào đối tượng khóa học
          const courseWithTeacher = {
            ...courseData,
            key: docRef.id,
            teacherFullName: teacherData ? teacherData.fullName : "N/A"
          };
          coursesData.push(courseWithTeacher);
        }
        setCourses(coursesData);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    getData();
  }, []);

  const handleDelete = async (key) =>{
    try{
        //doc được sử dụng để tạo một tham chiếu tới tài liệu cụ thể có ID là id trong collection "demo".
        const deleteVal = doc(db, "courses", key)
        await deleteDoc(deleteVal)
        alert("Xóa thành công!")
        window.location.reload()
    }catch(err){
        console.error(err)
    }
  }
  const handleEdit = async (key) =>{
    window.location.href = `/admin/courses/edit/${key}`;
  }
  return (
    <div>
    <NavCourse></NavCourse>
      <table id="_tableList">
        <thead>
          <tr>
            <th>Tên môn học</th>
            <th>Học kì</th>
            <th>Ngày tạo môn học</th>
            <th>Ngày bắt đầu môn học</th>
            <th>GVHD</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.key}>
              <td>{course.name}</td>
              <td>{course.semester}</td>
              <td>{course.createdDate ? course.createdDate.toDate().toLocaleDateString() : ''}</td>
              <td>{course.StartCourseDate ? course.StartCourseDate.toDate().toLocaleDateString() : ''}</td>
              <td>{course.teacherFullName}</td>
              <td>
                <button onClick={()=> handleDelete(course.key)}> <i className="trash icon"></i> </button> 
                <button onClick={() => handleEdit(course.key)}><i className="edit icon"></i></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListCourse;
