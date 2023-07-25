import { faCircleInfo, faClockRotateLeft, faDrumstickBite, faListCheck, faShoppingCart, faTable, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./order.module.scss";
import { useState } from "react";

const cx = classNames.bind(styles);
function Order() {
  return (
    <div className={cx("container", "col-12")}>
    <div className={cx("item", "d-flex", "f-wrap",'j-center')}>
        <div className={cx("col-6", "text-center")}>
          <div className={cx("item-content-bg")}>
           <Link to="/food">
              <div className={cx("item-content")}>
                <h1>
                  <FontAwesomeIcon icon={faDrumstickBite} />
                </h1>
                <h2>Order Dishes</h2>
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
                <h2>Order Table</h2>
              </div>
           </Link>
          </div>
        </div>
    </div>
  </div>
  );
}

export default Order;
