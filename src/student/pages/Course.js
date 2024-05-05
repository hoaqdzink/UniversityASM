import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  getCountFromServer,
} from "firebase/firestore";
import { auth, db } from "../../firebaseconfi";
import { default as CourseModel } from "../../model/courses";
import Point from "../../model/point";
import date from "../../service/date";
import "../css/course.css";

function Course() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      await auth.authStateReady();
      var uuid = auth.currentUser.uid;
      var registerCourses = [];
      const q = query(collection(db, "point"), where("studentID", "==", uuid));
      var docs = await getDocs(q);
      docs.forEach((doc) => {
        var data = doc.data();
        registerCourses.push(data.courseID);
      });

      const c = collection(db, "courses");
      var docs = await getDocs(c);
      var courseArr = [];

      docs.forEach((doc) => {
        var course = new CourseModel();
        course = doc.data();
        course.id = doc.id;
        if (registerCourses.includes(doc.id)) course.registered = true;
        else course.registered = false;
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

  async function registerCourse(courseID) {
    await auth.authStateReady();
    var uuid = auth.currentUser.uid;
    var point = new Point();
    point.studentID = uuid;
    point.courseID = courseID;
    await addDoc(collection(db, "point"), JSON.parse(JSON.stringify(point)));
    alert("Đăng ký thành công");
  }

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
            <div className="info">
              <p>{course.description}</p>
            </div>
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
                    {date.convertDateToString(course.StartCourseDate.toDate())}
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
                    {date.convertDateToString(course.createdDate.toDate())}
                  </strong>
                </span>
              </li>
            </ul>
            <div className="button-container">
              {" "}
              <button
                className="button"
                onClick={() => navigate(`/student/courseDetail/${course.id}`)}
              >
                Chi tiết
              </button>
              <button
                className="button"
                disabled={course.registered}
                onClick={(event) => {
                  registerCourse(course.id);
                  course.numberStudent++;
                  course.registered = true;
                  setCourses([...courses]);
                }}
              >
                Đăng ký
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export default Course;
