import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getCountFromServer,
} from "firebase/firestore";
import { auth, db } from "../../firebaseconfi";
import { default as CourseModel } from "../../model/courses";
import convertDateToString from "../../service/date";
import "../css/course.css";

function Course() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await auth.authStateReady();
      var uuid = auth.currentUser.uid;
      const q = query(
        collection(db, "courses"),
        where("teacherID", "==", uuid)
      );
      var docs = await getDocs(q);
      var courseArr = [];

      docs.forEach((doc) => {
        var course = new CourseModel();
        course = doc.data();
        course.id = doc.id;
        courseArr.push(course);
      });

      for (const course of courseArr) {
        const coll = collection(db, "point");
        const q = query(coll, where("courseID", "==", course.id));
        const snapshot = await getCountFromServer(q);
        course.numberStudent = snapshot.data().count;
      }

      setCourses(courseArr);
    }

    fetchData();
  }, []);

  return (
    <div className="cards">
      {courses.map((course) => (
        <article key={course.id} className="plan [ card ]">
          <div className="inner">
            <span className="pricing">
              <span>
                <small>Học Kỳ </small>
                {course.semester}
              </span>
            </span>
            <h2 className="title">{course.name}</h2>
            <p className="info">{course.description}</p>
            <ul className="features">
              <li>
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>
                  Số lượng sinh viên: <strong>{course.numberStudent}</strong>
                </span>
              </li>
              <li>
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>
                  Ngày bắt đầu:{" "}
                  <strong>
                    {convertDateToString(course.StartCourseDate.toDate())}
                  </strong>
                </span>
              </li>
              <li>
                <span className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path
                      d="M10 15.172l9.192-9.193 1.415 1.414L10 18l-6.364-6.364 1.414-1.414z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span>
                  {" "}
                  Ngày tạo:{" "}
                  <strong>
                    {convertDateToString(course.createdDate.toDate())}
                  </strong>
                </span>
              </li>
            </ul>
            <div className="button-container">
              {" "}
              <button className="button">Cập nhật Mô tả</button>
              <button className="button">Bảng điểm</button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Course;
