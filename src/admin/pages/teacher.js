import React, { useEffect, useState } from "react";
import NavLink from "../components/navTeacher";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebaseconfi";
import "../css/teacher.css";
import { useParams } from "react-router-dom";
function Teacher() {
  const [teacher, setTeacher] = useState({
    fullName: "",
    birthday: new Date("2021-01-01"),
    gender: true,
    phone: "",
    msgv: "",
    email: "",
    address: "",
    expertise: "",
    createdDate: new Date(),
    certificates: [], // Mảng để lưu trữ bằng cấp
  });
  const value = collection(db, "Teacher");

  // Hàm để thêm một bằng cấp mới vào mảng certificates
  const addCertificate = () => {
    const newCertificate = {
      degree: teacher.degree,
    };
    setTeacher((prevState) => ({
      ...prevState,
      certificates: [...prevState.certificates, newCertificate],
    }));
  };

  const deleteCertificate = (index) => {
    const updatedCertificates = [...teacher.certificates];
    updatedCertificates.splice(index, 1);
    setTeacher((prevState) => ({
      ...prevState,
      certificates: updatedCertificates,
    }));
  };

  // hàm thêm vào firestore
  const handleSave = async () => {
    try {
      // Kiểm tra các trường nhập liệu trước khi thêm vào Firestore
      if (
        !teacher.fullName ||
        !teacher.birthday ||
        !teacher.phone ||
        !teacher.email ||
        !teacher.address ||
        !teacher.expertise ||
        teacher.certificates.length === 0
      ) {
        alert("Vui lòng điền đầy đủ thông tin.");
        return;
      }
      console.log(teacher);
      const docRef = await addDoc(value, teacher);
      alert("Thêm thành công");
      console.log("Document written with ID: ", docRef.id);
      handleReset();
    } catch (e) {
      alert("Thêm thất bại " + e.message);
    }
  };

  const handleReset = async () => {
    setTeacher({
      fullName: "",
      msgv: "",
      birthday: new Date("2021-01-01"),
      gender: true,
      phone: "",
      email: "",
      address: "",
      expertise: "",
      degree: "",
      createdDate: new Date(),
      certificates: [], // Mảng để lưu trữ bằng cấp
    });
    window.location.href = "/admin/teachers";
  };

  const { key } = useParams();
  const [teacherData, setTeacherData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!key) return; // Kiểm tra xem key đã được truyền vào hay chưa
        const studentDocRef = doc(db, "Teacher", key);
        const studentSnapshot = await getDoc(studentDocRef);
        if (studentSnapshot.exists()) {
          const teacherData = studentSnapshot.data();
          setTeacherData(teacherData); // Sửa đổi tại đây
        } else {
          console.error("Giáo viên không tồn tại");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu giáo viên: ", error);
      }
    };

    fetchData();
  }, [key]);

  // Nếu có dữ liệu giáo viên, điều chỉnh formData
  useEffect(() => {
    if (teacherData) {
      const {
        fullName,
        msgv,
        phone,
        email,
        birthday,
        address,
        expertise,
        gender,
        createdDate,
        certificates,
      } = teacherData;

      setTeacher((prevTeacher) => ({
        ...prevTeacher,
        fullName: fullName || "",
        msgv: msgv || "",
        phone: phone || "",
        email: email || "",
        birthday: birthday ? birthday.toDate() : new Date("2021-01-01"), // Chuyển từ timestamp sang Date object
        address: address || "",
        expertise: expertise || "",
        gender: gender || true,
        createdDate: createdDate ? createdDate.toDate() : new Date(), // Chuyển từ timestamp sang Date object
        certificates: certificates || [],
      }));
    }
  }, [teacherData]);

  const handleUpdate = async () => {
    if (key) {
      try {
        await updateDoc(doc(db, "Teacher", key), teacher);
        alert("Cập nhật thông tin thành công!");
        // Có thể thêm điều hướng sau khi cập nhật thành công
      } catch (error) {
        console.error("Lỗi khi cập nhật thông tin: ", error);
      }
    }
  };
  const handleDelete = async () => {
    if (key) {
      try {
        await deleteDoc(doc(db, "Teacher", key));
        alert("Xóa thành công!");
        window.location.href = "/admin/teacher/list";
      } catch (error) {
        alert("Lỗi khi xóa giáo viên: ", error);
      }
    }
  };
  return (
    <div className="teacher">
      <NavLink />
      <div className="teacherForm">
        <h1>Thông tin Giáo Viên</h1>
        <div className="groupInp">
          <label htmlFor="fullname">Họ và Tên: </label>
          <input
            type="text"
            name="fullName"
            value={teacher.fullName}
            onChange={(e) =>
              setTeacher({ ...teacher, fullName: e.target.value })
            }
          />
        </div>

        <div className="groupInp">
          <label htmlFor="msgv">MSGV: </label>
          <input
            type="text"
            name="msgv"
            value={teacher.msgv}
            onChange={(e) => setTeacher({ ...teacher, msgv: e.target.value })}
          />
        </div>

        <div className="groupInp">
          <label htmlFor="birthday">Ngày sinh: </label>
          <input
            type="date"
            name="birthday"
            value={teacher.birthday.toISOString().substr(0, 10)}
            onChange={(e) =>
              setTeacher({ ...teacher, birthday: new Date(e.target.value) })
            }
          />
        </div>

        <div className="groupInp">
          <label htmlFor="gender">Giới tính: </label> <br />
          Nam{" "}
          <input
            type="radio"
            name="gender"
            value="true"
            checked={teacher.gender === true}
            onChange={() => setTeacher({ ...teacher, gender: true })}
          />
          Nữ{" "}
          <input
            type="radio"
            name="gender"
            value="false"
            checked={teacher.gender === false}
            onChange={() => setTeacher({ ...teacher, gender: false })}
          />
        </div>

        <div className="groupInp">
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            name="phone"
            value={teacher.phone}
            onChange={(e) => setTeacher({ ...teacher, phone: e.target.value })}
          />
        </div>

        <div className="groupInp">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            value={teacher.email}
            onChange={(e) => setTeacher({ ...teacher, email: e.target.value })}
          />
        </div>

        <div className="groupInp">
          <label htmlFor="address">Địa chỉ: </label>
          <input
            type="text"
            name="address"
            value={teacher.address}
            onChange={(e) =>
              setTeacher({ ...teacher, address: e.target.value })
            }
          />
        </div>

        <div className="groupInp">
          <label htmlFor="degree">Bằng cấp: </label>
          <input
            type="text"
            name="degree"
            value={teacher.degree}
            onChange={(e) => setTeacher({ ...teacher, degree: e.target.value })}
          />
          <button id="modifier" onClick={addCertificate}>
            <i className="plus icon"></i>
          </button>{" "}
          {/* Nút để thêm bằng cấp */}
        </div>

        {/* Hiển thị danh sách bằng cấp */}
        <ul>
          {teacher.certificates.map((certificate, index) => (
            <li key={index}>
              {certificate.degree}
              <button onClick={() => deleteCertificate(index)}>
                <i className="trash icon"></i>
              </button>{" "}
              {/* Nút để xóa bằng cấp */}
            </li>
          ))}
        </ul>

        <div className="groupInp">
          <label htmlFor="expertise">Chuyên môn: </label>
          <input
            type="text"
            name="expertise"
            value={teacher.expertise}
            onChange={(e) =>
              setTeacher({ ...teacher, expertise: e.target.value })
            }
          />
        </div>
      </div>
      <div className="btn_Student">
        {!key ? (
          <button onClick={handleSave}>Thêm</button>
        ) : (
          <>
            <button onClick={handleUpdate}>Sửa</button>
            <button onClick={handleDelete}>Xóa</button>
          </>
        )}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default Teacher;
