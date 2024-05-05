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
  orderBy,
} from "firebase/firestore";
import date from "../../service/date";

function Score() {
  const courseID = useParams().courseID;
  const [students, setStudents] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await auth.authStateReady();
      var uuid = auth.currentUser.uid;
      // Point
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

      // Comment
      const q1 = query(
        collection(db, "comment"),
        where("courseID", "==", courseID),
        orderBy("createdDate", "desc")
      );
      var docs = await getDocs(q1);
      var commentArr = [];

      docs.forEach((doc) => {
        var tmp = doc.data();
        tmp.id = doc.id;
        commentArr.push(tmp);
      });

      // assign full name
      let studentNames = {};
      for (var comment of commentArr) {
        if (studentNames[comment.studentID] == undefined) {
          var res = await getDoc(doc(db, "Student", comment.studentID));
          studentNames[comment.studentID] = res.data().fullName;
        }
        comment.fullName = studentNames[comment.studentID];
      }
      setComments(commentArr);
    }

    fetchData();
  }, []);

  async function updatePoint(pointID, lab, ass, mid, final, score, comment) {
    const res = await handleUpdatePoint(
      pointID,
      lab,
      ass,
      mid,
      final,
      score,
      comment
    );
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
        student.score,
        student.comment
      );
    }
    alert("Updated successfully");
  }

  async function handleUpdatePoint(
    pointID,
    lab,
    ass,
    mid,
    final,
    score,
    comment
  ) {
    const userRef = doc(db, "point", pointID);

    const res = await updateDoc(userRef, {
      lab: lab,
      ass: ass,
      mid: mid,
      final: final,
      score: score,
      comment: comment,
    });
  }

  return (
    <>
      {students.length > 0 && (
        <>
          <table className="styled-table">
            <thead>
              <tr>
                <th>MSSV</th>
                <th>Họ tên</th>
                <th>Điểm thí nghiệm</th>
                <th>Điểm bài tập lớn</th>
                <th>Điểm thi giữa kỳ</th>
                <th>Điểm thi cuối kỳ</th>
                <th>Điểm tổng kết</th>
                <th>Bình luận</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
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
                      student.score = e.currentTarget.textContent;
                    }}
                  >
                    {student.score}
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
                          student.score,
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
      )}
      <div className="panel">
        <div className="panel-body">
          <h1>Bình Luận</h1>
          {comments.map((comment) => (
            <div className="media-block">
              <div className="media-body">
                <div>
                  <a>{comment.fullName}</a>
                  <p className="text-muted text-sm">
                    {date.convertDateTimeToString(comment.createdDate.toDate())}
                  </p>
                </div>
                <p>{comment.comment}</p>
                <hr></hr>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Score;
