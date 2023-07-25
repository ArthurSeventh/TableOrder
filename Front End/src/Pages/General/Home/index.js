import { faCircleInfo, faClockRotateLeft, faDrumstickBite, faListCheck, faShoppingCart, faTable, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./home.module.scss";
import { useState, useEffect, useContext } from "react";
import { loginContext } from "../../../App";

const cx = classNames.bind(styles);
function Home() {

  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const context = useContext(loginContext);
  
  useEffect(()=>{
    if(context.userInfo.role_key === 'U'){
      setIsUser(true)
    }
    else
    {
      setIsAdmin(true)
    }
  },[context.userInfo])


  return (

    // toolbar
    <div className={cx("container", "col-12",)}>
      <div className={cx("item", "d-flex", "f-wrap",'j-center')}>
       {isUser && <>
          <div className={cx("col-6", "text-center")}>
            <div className={cx("item-content-bg")}>
             <Link to="/history">
                <div className={cx("item-content")}>
                  <h1>
                    <FontAwesomeIcon icon={faClockRotateLeft} />
                  </h1>
                  <h2>History</h2>
                </div>
             </Link>
            </div>
          </div>
          <div className={cx("col-6", "text-center")}>
            <div className={cx("item-content-bg")}>
             <Link to="/order">
                <div className={cx("item-content")}>
                  <h1>
                    <FontAwesomeIcon icon={faListCheck} />
                  </h1>
                  <h2>Make Order</h2>
                </div>
             </Link>
            </div>
          </div>
          <div className={cx("col-6", "text-center")}>
            <div className={cx("item-content-bg")}>
             <Link to="/profile">
                <div className={cx("item-content")}>
                  <h1>
                    <FontAwesomeIcon icon={faUser} />
                  </h1>
                  <h2>Profile</h2>
                </div>
             </Link>
            </div>
          </div>
       </>}
       {isAdmin && <>
          <div className={cx("col-6", "text-center")}>
            <div className={cx("item-content-bg")}>
             <Link to="/food">
                <div className={cx("item-content")}>
                  <h1>
                    <FontAwesomeIcon icon={faDrumstickBite} />
                  </h1>
                  <h2>Menu</h2>
                </div>
             </Link>
            </div>
          </div>
          <div className={cx("col-6", "text-center")}>
            <div className={cx("item-content-bg")}>
             <Link to="/table">
                <div className={cx("item-content")}>
                  <h1>
                    <FontAwesomeIcon icon={faTable} />
                  </h1>
                  <h2>Table</h2>
                </div>
             </Link>
            </div>
          </div>
          <div className={cx("col-6", "text-center")}>
            <div className={cx("item-content-bg")}>
             <Link to="/User">
                <div className={cx("item-content")}>
                  <h1>
                    <FontAwesomeIcon icon={faUser} />
                  </h1>
                  <h2>User</h2>
                </div>
             </Link>
            </div>
          </div>
          <div className={cx("col-6", "text-center")}>
            <div className={cx("item-content-bg")}>
             <Link to="/adminhistory">
                <div className={cx("item-content")}>
                  <h1>
                    <FontAwesomeIcon icon={faCircleInfo} />
                  </h1>
                  <h2>Order</h2>
                </div>
             </Link>
            </div>
          </div>
       </>}
      </div>
    </div>
  );
}

export default Home;
