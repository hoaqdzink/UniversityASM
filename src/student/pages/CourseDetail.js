import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../css/coursedetail.css";
import { auth, db } from "../../firebaseconfi";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  addDoc,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import date from "../../service/date";
import Comment from "../../model/comment";

function CourseDetail() {
  const courseID = useParams().courseID;
  const [course, setCourse] = useState([]);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState([]);
  let studentNames = {};
  async function onComment(cmnt) {
    await auth.authStateReady();
    var uuid = auth.currentUser.uid;
    if (studentNames[uuid] == undefined) {
      var res = await getDoc(doc(db, "Student", uuid));
      studentNames[uuid] = res.data().fullName;
    }
    var commentModel = new Comment();
    commentModel.comment = cmnt;
    commentModel.courseID = courseID;
    commentModel.studentID = uuid;
    await addDoc(collection(db, "comment"), {
      comment: commentModel.comment,
      courseID: commentModel.courseID,
      studentID: commentModel.studentID,
      createdDate: commentModel.createdDate,
    });

    commentModel.fullName = studentNames[uuid];
    setComments((oldArray) => [commentModel, ...oldArray]);
  }
  useEffect(() => {
    async function fetchData() {
      await auth.authStateReady();
      var uuid = auth.currentUser.uid;
      // Detail
      var res = await getDoc(doc(db, "courses", courseID));
      setCourse(res.data());

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

  return (
    <>
      <h1>{course.name}</h1>
      <h2>{course.description}</h2>
      <div className="panel">
        <div className="panel-body">
          <h1>Bình Luận</h1>
          <div className="comment-block">
            <textarea
              onInput={(e) => {
                setComment(e.currentTarget.value);
              }}
            ></textarea>
            <button onClick={() => onComment(comment)}>Bình Luận</button>
          </div>
          {comments.map((comment) => (
            <div key={comment.id} className="media-block">
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

export default CourseDetail;
