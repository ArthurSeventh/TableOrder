import classNames from "classnames/bind";
import styles from "./login.module.scss";
import { loginContext } from "../../../App";
import { useContext, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";

const cx = classNames.bind(styles);
function Login() {
  console.log("Login")
  const Context = useContext(loginContext);
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
        .post("auth/login", {
          username: name.value,
          password: password.value
        })
        .then((resp) => {
          localStorage.setItem("auth", resp.data.detail.access_token);
          Context.set_login(true);
          // Context.setUserInfo(resp.data.detail.user);
          console.log("set aut");
        })
        .catch((err) => {
          alert('Incorrect Password')
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
          <h1>Sign in</h1>
          <h3>Welcome back</h3>
        </div>
        <div className={cx("col-10", "name")}>
          <input
            onBlur={handleOnblur}
            onChange={handleOnChange}
            id="name"
            type="text"
            placeholder="Username"
          />
          <br></br>
          <label htmlFor="name">Invalid Name</label>
        </div>
        <div className={cx("col-10", "password")}>
          <input
            onBlur={handleOnblur}
            onChange={handleOnChange}
            id="password"
            type="text"
            placeholder="Password"
          />
          <br></br>
          <label htmlFor="password">Invalid Word</label>
        </div>
        <div className={cx("col-3", "btn")}>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className={cx("col-12", "text-right")}>
          <Link to="/regist">
            <p>Don't have Account ?</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
