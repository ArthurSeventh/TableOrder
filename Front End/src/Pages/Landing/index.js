import classNames from "classnames/bind";
import styles from "./landing.module.scss";
import { loginContext } from "../../App";

import { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import bg from "../../Images/thitxuyen.jpeg";
import bgLunch from "../../Images/breadmike.jpeg";
import logo from "../../Images/logo-bottom.png";
import axios from "axios";

const cx = classNames.bind(styles);

const breakfast = [];
const lunch = [];
const dinner = [];

function Landing() {
  const context = useContext(loginContext);
  const [data, setData] = useState(false);

  //==========================Menu Data UseState====================
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);


  //==========================Menu Data UseEffect====================
  useEffect(() => {
    axios
      .get("dishes/get-menu")
      .then((resp) => {
        // console.log(resp.data.detail)
        const data = resp.data.detail;
        const breakfast = [];
        const lunch = [];
        const dinner = [];

        for (const item in data) {
          // console.log(data[item])
          if (data[item].type === "B") {
            breakfast.push(data[item]);
          } else if (data[item].type === "L") {
            lunch.push(data[item]);
          } else {
            dinner.push(data[item]);
          }
        }
        setBreakfast(breakfast);
        setLunch(lunch);
        setDinner(dinner);
      })
      .catch((err) => {
        alert("Server Error");
        console.log(err.request.responseText);
      });
  }, []);

  return (
    <>
      <div
        className={cx(
          "container-fuild",
          "bg-header",
          "d-flex",
          "f-wrap",
          "text-center",
          "a-center"
        )}
      >
        {!context.is_auth && (
          <>
            <div className={cx("col-2", "text-left", "logo")}>
              <img src={logo} alt="" />
            </div>
            <div className={cx("col-10", "d-flex", "j-right", "login-btn")}>
              <Link to="/login">
                <button className={cx("log-btn")}>Login</button>
              </Link>
              <Link to="/regist">
                <button className={cx("regist-btn")}>Regist</button>
              </Link>
            </div>
          </>
        )}
        {/* Title */}
        <div className={cx("col-12")}>
          <h1>Welcome to Sofa Restaurent</h1>
          <h3>We provide you a best</h3>
          <h2>
            <span className={cx("service")}>Service </span> and{" "}
            <span className={cx("hospitality")}> Hospitality</span>
          </h2>
          <Link to="/food">
            <button className={cx("btn-menu")}> VIEW MENU</button>
          </Link>
          <Link to={context.is_auth ? "/order" : "/login"}>
            <button className={cx("btn-order")}>MAKE ORDER</button>
          </Link>
        </div>
      </div>

      {/* bg-lunch menu */}
      <div className={cx("container-fuild", "bg-dark", "d-flex", "f-wrap")}>
        <div className={cx("bg-menu")}>
          <img src={bg} alt="" />
        </div>
        <div className={cx("lunch-menu", "d-flex", "f-wrap", "j-center")}>
          <div className={cx("col-12")}>
            <h1 className={cx("title")}>Appetizers</h1>
            <div className={cx("line")}></div>

            {/* danh muc */}
            {dinner.map((item, index) => (
              <div key={index} className={cx("item", "d-flex", "f-wrap")}>
                <div className={cx("col-6")}>
                  <h3>{item.name}</h3>
                </div>
                <div className={cx("col-6", "text-right")}>
                  <h3>{index}</h3>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                  ipsa natus libero
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* bg-dinner menu */}
      <div className={cx("container-fuild", "bg-dark", "d-flex", "f-wrap")}>
        <div className={cx("lunch-menu", "d-flex", "f-wrap", "j-center")}>
          <div className={cx("col-12")}>
            <h1 className={cx("title")}>Peppetizers</h1>
            <div className={cx("line")}></div>

            {/* danh muc */}
            {breakfast.map((item, index) => (
              <div key={index} className={cx("item", "d-flex", "f-wrap")}>
                <div className={cx("col-6")}>
                  <h3>{item.name}</h3>
                </div>
                <div className={cx("col-6", "text-right")}>
                  <h3>{index}</h3>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga
                  ipsa natus libero
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className={cx("bg-menu")}>
          <img src={bgLunch} alt="" />
        </div>
      </div>

      {/* intro */}
      <div className={cx("container-fuild", "intro", "d-flex", "f-wrap")}>
        <div className={cx("col-6", "bg-trans")}>
          <div className={cx("intro-content")}>
            <h2>Welcom to Sofa Restaurent</h2>
            <p>
              We're hoping to be your go-to restaurant theme for WordPress. From
              simple menu management to drag and drop page building, we've laid
              out the tools you've been wanting to create your new restaurant
              website.{" "}
            </p>
            <br></br>
            <p>
              Use your own branding and add in our app like WordPress theme and
              you'll have a site that wows your guests and brings them in for
              more.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
