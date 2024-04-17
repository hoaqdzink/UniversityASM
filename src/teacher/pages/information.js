import { useState } from "react";
import { auth, db } from "../../firebaseconfi";
import { getDoc, doc } from "firebase/firestore";
import Teacher from "../../model/teacher";
import convertDateToString from "../../service/date";
import "../css/information.css";

function Information() {
  const [teacher, setTeacher] = useState(new Teacher());
  auth.authStateReady().then(() => {
    let uuid = auth.currentUser.uid;
    getDoc(doc(db, "Teacher", uuid)).then((res) => {
      setTeacher(res.data());
    });
  });
  return (
    <div id="contact">
      <div className="content">
        <div id="form">
          <form>
            <span>Họ tên</span>
            <input type="text" value={teacher.fullName} readOnly />
            <span>Giới Tính</span>
            <input type="text" value={teacher.gender ? "Nam" : "Nữ"} readOnly />
            <span>Ngày Sinh</span>
            <input
              type="text"
              value={convertDateToString(teacher.birthdate.toDate())}
              readOnly
            />
            <span>Email</span>
            <input type="text" value={teacher.email} readOnly />
            <span>Số Điện Thoại</span>
            <input type="text" value={teacher.phone} readOnly />
            <span>Địa chỉ</span>
            <input type="text" value={teacher.address} readOnly />
            <span>Học Vấn</span>
            <input
              type="text"
              value={teacher.degree.length > 0 && teacher.degree[0]}
              readOnly
            />
            <span>Chuyên nghành</span>
            <input type="text" value={teacher.expertise} readOnly />
            <span>Ngày đăng ký</span>
            <input
              type="text"
              value={convertDateToString(teacher.createdDate.toDate())}
              readOnly
            />
          </form>
        </div>
      </div>
    </div>
  );
}
export default Information;
