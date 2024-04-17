import { Timestamp } from "firebase/firestore";
class Course {
  id = "";
  StartCourseDate = Timestamp.now();
  createdDate = Timestamp.now();
  description = "";
  name = "";
  semester = "";
  teacherID = "";
  numberStudent = 0;
}

export default Course;
