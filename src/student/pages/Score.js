import React, { useEffect, useState } from "react";

import { auth, db } from "../../firebaseconfi";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";

function Score() {
  const [scores, Setscores] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await auth.authStateReady();
      var uuid = auth.currentUser.uid;
      const q = query(collection(db, "point"), where("studentID", "==", uuid));
      var docs = await getDocs(q);
      var Scores = [];

      docs.forEach((doc) => {
        Scores.push(doc.data());
      });

      for (var sco of Scores) {
        var res = await getDoc(doc(db, "courses", sco.courseID));
        sco.courseName = res.data().name;
      }

      Setscores(Scores);
    }
    fetchData();
  }, []);

  return (
    scores.length > 0 && (
      <>
        <table class="styled-table">
          <thead>
            <tr>
              <th>Tên môn học</th>
              <th>Điểm thí nghiệm</th>
              <th>Điểm bài tập lớn</th>
              <th>Điểm thi giữa kỳ</th>
              <th>Điểm thi cuối kỳ</th>
              <th>Điểm tổng kết</th>
              <th>Nhận xét</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((sco) => (
              <tr>
                <td>{sco.courseName}</td>
                <td>{sco.lab}</td>
                <td>{sco.ass}</td>
                <td>{sco.mid}</td>
                <td>{sco.final}</td>
                <td>{sco.score}</td>
                <td>{sco.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    )
  );
}

export default Score;
