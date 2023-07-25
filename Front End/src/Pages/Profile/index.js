import classNames from "classnames/bind";
import styles from "./profile.module.scss";
import Logo from "../../Images/User-logo.png";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Form } from "react-router-dom";

const cx = classNames.bind(styles);
function Profile() {
  //==============================Use State===============================
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState({});
  const [validName, setValidName] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [validEmail, setValidEmail] = useState(true);
  const [save, setSave] = useState(false)
  // console.log(data);

  //==============================Use ref===============================
  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const avatar = useRef();

  //==============================Use Effect===============================
  useEffect(() => {
    axios
      .get("users/get-current-user")
      .then((res) => {
        setData(res.data.detail);
      })
      .catch((er) => {
        alert("get Data Fail");
        console.log(er);
      });
  }, [save]);

  //=================================Function=============================
  const handleSave = () => {
    const Nname = name.current.value;
    const Navatar = avatar.current.files[0];
    const Nphone = phone.current.value;
    const Nemail = email.current.value;
    if (!(CheckName(Nname)|| CheckPhone(Nphone) || CheckEmail(Nemail) || Navatar)) {
      alert("Please filled at least 1 field inorder to update profile");
      return;
    } else {
      // alert("success");
      // setUpdate(false);
      console.log("save");

      const f = new FormData()

      f.append("email",ValidateEmail(Nemail))
      f.append("phone",ValidatePhone(Nphone))
      // f.append("name",ValidateName(Nname))
      if(Navatar){
        f.append("file_input",Navatar)
      }

      axios
      .put("users/update-user", f, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        alert("Update successfully");
        setSave(!save);
        setUpdate(!update);
      })
      .catch((er) => {
        alert("Update fail");
        console.log(er);
      });

      console.log(ValidateName(Nname));
      console.log(Navatar === undefined ? null : Navatar);
      console.log(ValidatePhone(Nphone));
      console.log(ValidateEmail(Nemail));
    }
  };

  const capitalize = (e) => {
    if (e) {
      return e.charAt(0).toUpperCase() + e.slice(1);
    }
    return e;
  };

  //================================Validate Input==========================
  const ValidateName = (e) => {
    if (e.trim() == "") {
      setValidName(false);
      return data.fullname
    } else return e;
  };
  const ValidateEmail = (e) => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (e.trim() !== "" && re.test(e)) {
      return e
    } else {
      setValidEmail(false);
      return data.email;
    }
  };
  const ValidatePhone = (e) => {
    if (e.trim() !== "" && String(e).length == 10) return e;
    else {
      setValidPhone(false);
      return data.phone
    }
  };
  //=================================Check Input=============================
  const CheckName = (e) => {
    if (e.trim() == "") {
      return null
    } else return e;
  };
  const CheckEmail = (e) => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (e.trim() !== "" && re.test(e)) {
      return e
    } else {
      return null;
    }
  };
  const CheckPhone = (e) => {
    if (e.trim() !== "" && String(e).length == 10) return e;
    else {
      return null
    }
  };

  return (
    <div className={cx("container", "col-12", "d-flex", "f-wrap", "j-center")}>
      <div className={cx("col-10", "form")}>
        <div className={cx("wrapper", "d-flex", "f-wrap")}>
          <div className={cx("col-4", "user", "text-center")}>
            <img
              src={
                data.avatar !== null
                  ? `${axios.defaults.baseURL}${data.avatar}`
                  : Logo
              }
              alt="Invalid Image"
            />
            <h1>{capitalize(data.username)}</h1>
          </div>
          <div className={cx("col-8", "info", "d-flex", "f-wrap")}>
            <div className={cx("col-12", "title")}>
              <h3>Information</h3>
              <div className={cx("line")}></div>
            </div>
            <div className={cx("col-12", "d-flex", "f-wrap", "content")}>
              <div className={cx("col-6")}>
                <h3>Email</h3>
                <p>{data.email || "Unset"}</p>
              </div>
              <div className={cx("col-6")}>
                <h3>Phone</h3>
                <p>{data.phone || "Unset"}</p>
              </div>
            </div>

            {/* update */}
            {update && (
              <div className={cx("col-12", "d-flex", "f-wrap")}>
                <div className={cx("col-12", "p-x-0")}>
                  <h4 className={cx("update")}>Update Information</h4>
                </div>
                <div
                  className={cx(
                    "col-12",
                    "d-flex",
                    "f-wrap",
                    "content",
                    "p-x-0"
                  )}
                >
                  <div className={cx("col-6")}>
                    {validName && <h3>Name</h3>}
                    {!validName && (
                      <h3 className={cx("Invalid")}>Invalid Name</h3>
                    )}
                    <input
                      id="name"
                      type="text"
                      ref={name}
                      placeholder="Enter new name"
                      onBlur={(e) => ValidateName(e.target.value)}
                      onChange={() => setValidName(true)}
                    />
                  </div>

                  <div className={cx("col-6")}>
                    <h3>Avatar</h3>
                    <input
                      id="avatar"
                      type="file"
                      ref={avatar}
                      placeholder="Enter new Email"
                    />
                  </div>

                  <div className={cx("col-6")}>
                    {validPhone && <h3>Phone</h3>}{" "}
                    {!validPhone && (
                      <h3 className={cx("Invalid")}>Invalid Phone</h3>
                    )}
                    <input
                      id="phone"
                      type="number"
                      ref={phone}
                      placeholder="Enter phone"
                      onBlur={(e) => ValidatePhone(e.target.value)}
                      onChange={() => setValidPhone(true)}
                    />
                  </div>

                  <div className={cx("col-6")}>
                    {validEmail && <h3>Email</h3>}{" "}
                    {!validEmail && (
                      <h3 className={cx("Invalid")}>Invalid Email</h3>
                    )}
                    <input
                      id="email"
                      type="email"
                      ref={email}
                      placeholder="Enter new email"
                      onBlur={(e) => ValidateEmail(e.target.value)}
                      onChange={() => setValidEmail(true)}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className={cx("col-4")}>
              <button
                onClick={() => {
                  setUpdate(!update);
                  setValidName(true);
                  setValidPhone(true);
                  setValidEmail(true);
                }}
              >
                Update
              </button>
            </div>
            {update && (
              <div className={cx("col-8", "text-right")}>
                <button className={cx("btn-save")} onClick={handleSave}>
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
