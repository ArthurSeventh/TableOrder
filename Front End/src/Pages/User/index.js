import classNames from "classnames/bind";
import styles from "./user.module.scss";
import Logo from "../../Images/User-logo.png";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function User() {
  //==========================Use State===============================
  const [data, setData] = useState([]);
  console.log(data)
  // console.log(data[2].avatar)
  // const[search, setSearch] = useState(null)
  const [delet, setDelet] = useState(true);
  // console.log(data)
  //==========================Use Effect==============================

  useEffect(() => {
    axios
      .get("users", {
        params: {
          search_string: null,
        },
      })
      .then((res) => {
        setData(res.data.details);
      })
      .catch((er) => {
        alert("get Data fail");
        console.log(er);
      });
  }, [delet]);

  //===========================Function================================
  const handleDelete = (id) => {
    axios
      .delete(`users/${id}`)
      .then((res) => {
        alert("Delete Successfully");
        setDelet(!delet);
      })
      .catch((er) => {
        alert("Delete Fail");
        console.log(er);
      });
    //send API Delete
  };

  return (
    <div className={cx("container")}>
      <div className={cx("col-12", "d-flex", "f-wrap", "j-center")}>
        <div className={cx("col-8", "banner", "d-flex")}>
          <h1>Account</h1>
        </div>

        {/* item */}
        {data.map((item) => (
          console.log(item.avatar),
          <div
            key={item.id}
            id={item.id}
            className={cx("col-8", "item", "d-flex", "f-wrap")}
          >
            <div className={cx("col-2", "d-flex", "a-center", "j-center")}>
              <div className={cx("logo")}>
                <img
                  src={
                    item.avatar
                      ? `${axios.defaults.baseURL}${item.avatar}`
                      : Logo
                  }
                />
              </div>
            </div>
            <div className={cx("col-8", "d-flex", "a-center")}>
              <div className={cx("info")}>
                <h2>{item.username}</h2>
                <p>
                  {item.phone !== null ? `Phone : ${item.phone}` : `ID : ${item.id}`}
                </p>
              </div>
            </div>
            <div
              className={cx(
                "col-2",
                "d-flex",
                "f-wrap",
                "a-center",
                "j-center"
              )}
            >
              <button onClick={() => handleDelete(item.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default User;
