import React, { useEffect, useState } from "react";
import Student from "../../model/student";
import { auth, db } from "../../firebaseconfi";
import { getDoc, doc } from "firebase/firestore";
import date from "../../service/date";

function Infor() {
  const [stu, setStu] = useState(new Student());

  // const getStudent = async () => {
  //   const data = await getDoc(doc(db, "Student", uuid));

  //   console.log(data.data());
  // };
  useEffect(() => {
    const getStudent = async () => {
      await auth.authStateReady().then(() => {
        let uuid = auth.currentUser.uid;
        getDoc(doc(db, "Student", uuid)).then((res) => {
          setStu(res.data());
        });
      });
    };
    getStudent();
  }, []);

  return (
    <div id="contact">
      <div className="content">
        <div id="form">
          <form>
            <span>Họ tên</span>
            <input type="text" value={stu.fullName} readOnly />
            <span>Giới tính</span>
            <input type="text" value={stu.Gender ? "Nam" : "Nữ"} readOnly />
            <span>Ngày sinh</span>
            <input
              type="text"
              value={date.convertDateToString(stu.birthday.toDate())}
              readOnly
            />
            <span>Email</span>
            <input type="text" value={stu.email} readOnly />
            <span>Số Điện Thoại</span>
            <input type="text" value={stu.phone} readOnly />
            <span>Địa chỉ</span>
            <input type="text" value={stu.address} readOnly />
            <span>MSSV</span>
            <input type="text" value={stu.id} readOnly />
            <span>Năm nhập học</span>
            <input type="text" value={stu.startYear} readOnly />
            <span>Chuyên nghành</span>
            <input type="text" value={stu.Major} readOnly />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Infor;
