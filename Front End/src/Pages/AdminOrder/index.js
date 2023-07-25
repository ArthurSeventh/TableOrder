import classNames from "classnames/bind";
// import styles from "./.module/AdminOrder";
import styles from "./adminorder.module.scss";
import Logo from "../../Images/User-logo.png";
import comkimchi from "../../Images/comkimchi.jpeg";
import canhkimchi from "../../Images/canh_kim_chi_3.jpeg";
import ga from "../../Images/chiken 2.jpeg";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);
function AdminOrder() {
  //============================Use State============================
  //----------Data-------------
  const [dish, setDish] = useState([]);
  const [table, setTable] = useState([]);
  console.log(table);
  console.log(dish);
  const [deletetable, setdeletetable] = useState(true);
  const [deletedishes, setdeletedish] = useState(true);
  const [cdish, setCdish] = useState(true);

  //============================Use Effect============================
  //---------Get Order Detail-------------
  useEffect(() => {
    axios
      .post("orders/get-all-order")
      .then((res) => {
        const list = res.data.Order_list;
        const table = [];
        const dish = [];
        console.log(list);
        for (const item in list) {
          if (list[item].type === "Table") {
            table.push(list[item]);
          } else {
            dish.push(list[item]);
          }
        }
        setTable(table);
        setDish(dish);
      })
      .catch((er) => {
        alert("Get Order Fail");
        console.log(er);
      });
  }, [deletetable, deletedishes]);

  //=================================Function==========================
  const handleDeleteOrder = (id) => {
    axios
      .delete(`orders/delete-order/${id}`)
      .then((res) => {
        alert("delete Successfully");
        setdeletetable(!deletetable);
      })
      .catch((er) => {
        alert("delet table fail");
        console.log(er);
      });
  };

  const getCurrentDate = () => {
    const day = new Date();
    const date = day.getDate();
    const month = day.getMonth() + 1;
    const year = day.getFullYear();
    const cur_day = `${year}-${month < 10 ? `0${month}` : month}-${
      date < 10 ? `0${date}` : date
    }`;
    return cur_day;
  };

  const onClickTable = () => {
    setCdish(false);
  };

  const onClickDish = () => {
    setCdish(true);
  };

  return (
    // <h1>Amin Order</h1>
    <div className={cx("container")}>
      <div className={cx("col-12", "d-flex", "f-wrap", "j-center")}>
        {/* Banner */}
        {/* <div className={cx("col-8", "banner", "d-flex")}>
          <h1>Order</h1>
        </div> */}
        <div
          className={cx(
            "table-container",
            "col-10",
            "d-flex",
            "f-wrap",
            "j-center",
            "p0"
          )}
        >
          <div
            className={cx(
              "col-12",
              "text-center",
              "table-title",
              "d-flex",
              "f-wrap",
              "p0"
            )}
          >
            <div className={cx("col-2", "p0", "table-btn")}>
              <button onClick={onClickTable}>Table</button>
            </div>
            <div className={cx("col-8", "text-center")}>
              {cdish && <h2 className={cx("title")}>Dishes Ordered</h2>}
              {!cdish && <h2 className={cx("title")}>Table Ordered</h2>}
            </div>
            <div className={cx("col-2", "p0", "dishe-btn")}>
              <button onClick={onClickDish}>Dish</button>
            </div>
          </div>

          <div
            className={cx(
              "col-12",
              "d-flex",
              "f-wrap",
              "j-center",
              "order-list",
              "p0"
            )}
          >
            {/* Dishe */}
            {cdish &&
              dish.map((item) => {
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className={cx("col-11", "item", "d-flex", "f-wrap")}
                  >
                    <div
                      className={cx("col-2", "d-flex", "a-center", "j-center")}
                    >
                      <div className={cx("logo")}>
                        <img
                          src={`${axios.defaults.baseURL}${item.orderdetail[0].dishes.image}`}
                        ></img>
                      </div>
                    </div>
                    <div className={cx("col-8", "d-flex", "a-center")}>
                      <div className={cx("info")}>
                        <h2>
                          {`Phone: ${item.user.phone}` ||
                            `Username : ${item.user.username}`}
                        </h2>
                        <div className={cx("d-flex")}>
                          <p>
                            <span>Price </span>:{" "}
                            {item.orderdetail.reduce(
                              (ac, cur) => ac + cur.dishes.price,
                              0
                            )}
                          </p>
                          <p className={cx("span-total")}>
                            <span>Total </span>:{" "}
                            {item.orderdetail.reduce(
                              (ac, cur) => ac + cur.dishes.price,
                              0
                            )}
                          </p>
                        </div>
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
                      <button
                        onClick={(e) => handleDeleteOrder(item.id)}
                        onMouseOver={(e) => {
                          e.target.innerHTML = "Delete";
                        }}
                        onMouseOut={(e) => {
                          e.target.innerHTML = "Ordered";
                        }}
                      >
                        Ordered
                      </button>
                    </div>
                  </div>
                );
              })}
            {/* <div className={cx("col-12", "text-center")}>
              <h1 className={cx("title")}>Table Ordered</h1>
            </div> */}
            {/* Table */}
            {!cdish &&
              table.map((item) => {
                return (
                  <div
                    key={item.id}
                    id={item.id}
                    className={cx("col-11", "item", "d-flex", "f-wrap")}
                  >
                    <div
                      className={cx("col-2", "d-flex", "a-center", "j-center")}
                    >
                      <div className={cx("logo")}>
                        <h1>{`${item.table.category}${item.table.code}`}</h1>
                      </div>
                    </div>
                    <div className={cx("col-8", "d-flex", "a-center")}>
                      <div className={cx("info")}>
                        <h2>
                          {`Phone: ${item.user.phone}` ||
                            `Username : ${item.user.username}`}
                        </h2>
                        <div className={cx("d-flex")}>
                          <p>
                            <span>Date </span>: {item.issue_date}
                          </p>
                          <p className={cx("span-total")}>
                            <span>Time</span>: {item.time_section}
                          </p>
                        </div>
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
                      <button
                        onClick={() => handleDeleteOrder(item.id)}
                        onMouseOver={(e) => {
                          e.target.innerHTML = "Delete";
                        }}
                        onMouseOut={(e) => {
                          e.target.innerHTML = "Ordered";
                        }}
                      >
                        Ordered
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>

          <div className={cx("col-12", "text-center", "table-footer")}></div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrder;
