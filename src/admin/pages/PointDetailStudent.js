import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebaseconfi';
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';

function StudentPointDetail() {
    const [studentPoints, setStudentPoints] = useState([]);
    const { studentID  } = useParams();

    useEffect(() => {
        const fetchStudentPoints = async () => {
            try {
                const q = query(collection(db, 'point'), where('studentID', '==', studentID));
                const querySnapshot = await getDocs(q);
                const studentPointsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
                const studentDoc = await getDoc(doc(db, 'Student', studentID));
                const studentInfo = studentDoc.data();
    
                // Lặp qua mỗi điểm để lấy thông tin về môn học tương ứng
                const studentPointsWithInfo = await Promise.all(studentPointsData.map(async point => {
                    // Truy vấn vào bảng "courses" để lấy thông tin môn học
                    const courseDoc = await getDoc(doc(db, 'courses', point.courseID));
                    const courseInfo = courseDoc.data();
                    // Kết hợp thông tin điểm, thông tin sinh viên và thông tin môn học
                    return {
                        id: point.id,
                        studentID: studentInfo.id,
                        fullName: studentInfo.fullName,
                        courseID: point.courseID,
                        courseName: courseInfo.name, 
                        courseSemester: courseInfo.semester,
                        lab: point.lab,
                        ass: point.ass,
                        mid: point.mid,
                        final: point.final,
                        score: point.score,
                        comment: point.comment
                    };
                }));
    
                setStudentPoints(studentPointsWithInfo);
            } catch (error) {
                console.error("Error fetching student points:", error);
            }
        };
    
        fetchStudentPoints();
    }, [studentID]);
    

    return (
        <div>
            <h1>Bảng điểm của {studentPoints.length > 0 ? studentPoints[0].fullName : ''}</h1>
            <table id="_tableList">
                <thead>
                    <tr>
                    <th>Mssv</th>
                    <th>Mã môn</th>
                    <th>Học kì</th>
                    <th>Điểm TN</th>
                    <th>Điểm BTL</th>
                    <th>Điểm GK</th>
                    <th>Điểm CK</th>
                    <th>Điểm Tổng kết</th>
                    <th>Đánh giá</th>
                    </tr>
                </thead>
                <tbody>
                    {studentPoints.map(point => (
                        <tr key={point.id}>
                            <td>{point.studentID}</td>
                            <td>{point.courseName}</td>
                            <td>{point.courseSemester}</td>
                            <td>{point.lab}</td>
                            <td>{point.ass}</td>
                            <td>{point.mid}</td>
                            <td>{point.final}</td>
                            <td>{point.score}</td>
                            <td>{point.comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentPointDetail;
