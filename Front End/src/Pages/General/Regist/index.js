import classNames from "classnames/bind";
import styles from "./regist.module.scss";
import { loginContext } from "../../../App";
import { useContext, useRef, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const cx = classNames.bind(styles);
function Regist() {
  const Context = useContext(loginContext);
  const UseRefname = useRef();
  const UseRefpassword = useRef();
  //function
  const handleOnblur = (e) => {
    if (e.target.value.trim() === "") {
      e.target.parentElement.classList.add(cx("validate"));
    }
  };

  const handleOnChange = (e) => {
    e.target.parentElement.classList.remove(cx("validate"));
  };
  const handleSubmit = () => {
    const name = document.querySelector("#name");
    const password = document.querySelector("#password");

    if (name.value.trim() == "" || password.value.trim() == "") {
      name.parentElement.classList.add(cx("validate"));
      password.parentElement.classList.add(cx("validate"));
      return;
    } else {
      axios
        .post("auth/register", {
          username: name.value,
          password: password.value,
          // fullname: " ",
          // phone: " ",
          // email: " ",
        })
        .then((resp) => {
          console.log(resp);
          alert("Create Account Successfully");
          UseRefname.current.value = ""
          UseRefname.current.focus()
          UseRefpassword.current.value = ""
        })
        .catch((err) => {
          alert("Create Account fail, username is already exist");
          console.log(err.request.responseText);
        });
    }
  };

  if (Context.is_auth) {
    return <Navigate to="/" />;
  }
  return (
    <div className={cx("conatainer-fluid", "bg-login", "d-flex", "j-center")}>
      <div
        className={cx(
          "col-6",
          "d-flex",
          "f-wrap",
          "form-container",
          "j-center"
          // "validate"
        )}
      >
        <div className={cx("col-12", "text-center")}>
          <h1>Regist</h1>
        </div>
        <div className={cx("col-10", "name")}>
          <input
            id="name"
            ref={UseRefname}
            type="text"
            placeholder="Username"
            onBlur={handleOnblur}
            onChange={handleOnChange}
          />
          <br></br>
          <label htmlFor="name">Invalid Name</label>
        </div>
        <div className={cx("col-10", "password")}>
          <input
            ref={UseRefpassword}
            id="password"
            type="password"
            placeholder="Password"
            onBlur={handleOnblur}
            onChange={handleOnChange}
          />
          <br></br>
          <label htmlFor="password">Invalid Password</label>
        </div>
        <div className={cx("col-3", "btn")}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className={cx("col-12", "text-right","Already-link")}>
          <Link to="/login">
            <p>Already have Account ?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Regist;
