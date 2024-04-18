import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/score.css";
import { auth, db } from "../../firebaseconfi";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function Score() {
  const courseID = useParams().courseID;
  const [students, setStudents] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await auth.authStateReady();
      var uuid = auth.currentUser.uid;
      const q = query(
        collection(db, "point"),
        where("courseID", "==", courseID)
      );
      var docs = await getDocs(q);
      var studentArr = [];

      docs.forEach((doc) => {
        var tmp = doc.data();
        tmp.id = doc.id;
        studentArr.push(tmp);
      });

      for (var student of studentArr) {
        var res = await getDoc(doc(db, "Student", student.studentID));
        student.studentID = res.data().id;
        student.fullName = res.data().fullName;
      }

      setStudents(studentArr);
    }

    fetchData();
  }, []);

  async function updatePoint(pointID, lab, ass, mid, final, comment) {
    const res = await handleUpdatePoint(pointID, lab, ass, mid, final, comment);
    alert("Updated successfully");
  }

  async function updateAllPoint() {
    for (const student of students) {
      await handleUpdatePoint(
        student.id,
        student.lab,
        student.ass,
        student.mid,
        student.final,
        student.comment
      );
    }
    alert("Updated successfully");
  }

  async function handleUpdatePoint(pointID, lab, ass, mid, final, comment) {
    const userRef = doc(db, "point", pointID);

    const res = await updateDoc(userRef, {
      lab: lab,
      ass: ass,
      mid: mid,
      final: final,
      comment: comment,
    });
  }

  return (
    students.length > 0 && (
      <>
        <table class="styled-table">
          <thead>
            <tr>
              <th>MSSV</th>
              <th>Họ tên</th>
              <th>Điểm thí nghiệm</th>
              <th>Điểm bài tập lớn</th>
              <th>Điểm thi giữa kỳ</th>
              <th>Điểm thi cuối kỳ</th>
              <th>Bình luận</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr>
                <td>{student.studentID}</td>
                <td>{student.fullName}</td>
                <td
                  contentEditable
                  onInput={(e) => {
                    student.lab = Number(e.currentTarget.textContent);
                  }}
                >
                  {student.lab}
                </td>
                <td
                  contentEditable
                  onInput={(e) => {
                    student.ass = Number(e.currentTarget.textContent);
                  }}
                >
                  {student.ass}
                </td>
                <td
                  contentEditable
                  onInput={(e) => {
                    student.mid = Number(e.currentTarget.textContent);
                  }}
                >
                  {student.mid}
                </td>
                <td
                  contentEditable
                  onInput={(e) => {
                    student.final = Number(e.currentTarget.textContent);
                  }}
                >
                  {student.final}
                </td>
                <td
                  contentEditable
                  onInput={(e) => {
                    student.comment = e.currentTarget.textContent;
                  }}
                >
                  {student.comment}
                </td>
                <td>
                  <button
                    onClick={() => {
                      updatePoint(
                        student.id,
                        student.lab,
                        student.ass,
                        student.mid,
                        student.final,
                        student.comment
                      );
                    }}
                  >
                    Cập nhật
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => updateAllPoint()}>Cập nhật tất cả</button>
      </>
    )
  );
}

export default Score;
