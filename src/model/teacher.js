import { Timestamp } from "firebase/firestore";
class Teacher {
  fullName = "";
  birthdate = Timestamp.now();
  phone = "";
  email = "";
  createdDate = Timestamp.now();
  expertise = "";
  address = "";
  gender = true;
  degree = [];
}

export default Teacher;
