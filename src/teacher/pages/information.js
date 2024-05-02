import { useState, useEffect } from "react";
import { auth, db } from "../../firebaseconfi";
import { getDoc, doc } from "firebase/firestore";
import Teacher from "../../model/teacher";
import date from "../../service/date";
import "../css/information.css";

function Information() {
  const [teacher, setTeacher] = useState(new Teacher());
  useEffect(() => {
    async function fetchData() {
      await auth.authStateReady();
      let uuid = auth.currentUser.uid;
      var res = await getDoc(doc(db, "Teacher", uuid));
      setTeacher(res.data());
    }

    fetchData();
  }, []);

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
              value={date.convertDateToString(teacher.birthdate.toDate())}
              readOnly
            />
            <span>Email</span>
            <input type="text" value={teacher.email} readOnly />
            <span>Số Điện Thoại</span>
            <input type="text" value={teacher.phone} readOnly />
            <span>Địa chỉ</span>
            <input type="text" value={teacher.address} readOnly />
            <span>Học Vấn</span>
            <input type="text" value={teacher.degree} readOnly />
            <span>Chuyên nghành</span>
            <input type="text" value={teacher.expertise} readOnly />
            <span>Ngày đăng ký</span>
            <input
              type="text"
              value={date.convertDateToString(teacher.createdDate.toDate())}
              readOnly
            />
          </form>
        </div>
      </div>
    </div>
  );
}
export default Information;
