import { Timestamp } from "firebase/firestore";
class Comment {
  studentID = "";
  courseID = "";
  comment = "";
  createdDate = Timestamp.now();
}

export default Comment;
