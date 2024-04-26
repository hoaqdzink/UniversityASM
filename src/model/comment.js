import { Timestamp } from "firebase/firestore";
class Comment {
  studenID = "";
  courseID = "";
  comment = "";
  createdDate = Timestamp.now();
}

export default Comment;
