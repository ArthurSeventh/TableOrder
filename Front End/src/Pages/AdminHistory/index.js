import classNames from "classnames/bind";
import styles from "./adminhistory.module.scss";
import Logo from "../../Images/User-logo.png";
import comkimchi from "../../Images/comkimchi.jpeg";
import canhkimchi from "../../Images/canh_kim_chi_3.jpeg";
import ga from "../../Images/chiken 2.jpeg";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);
function AdminHistory() {
  //============================Use State============================
  //----------Data-------------
  const [dish, setDish] = useState([]);
  const [table, setTable] = useState([]);
  console.log(table);
  console.log(dish);
  const [deletetable, setdeletetable] = useState(true);
  const [deletedishes, setdeletedish] = useState(true);
  //============================Use Effect============================
  //---------Get Order Detail-------------
  useEffect(() => {
    axios
      .post("orders/get-order", {
        issue_date: getCurrentDate(),
      })
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
        alert("delet Successfully");
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

  return (
    // <h1>Amin Order</h1>
    <div className={cx("container")}>
      <div className={cx("col-12", "d-flex", "f-wrap", "j-center")}>
        {/* Banner */}
        <div className={cx("col-8", "banner", "d-flex")}>
          <h1>Dishes</h1>
        </div>

        <div className={cx("col-12", "text-center")}>
          <h1 className={cx("title")}>Dishes Ordered</h1>
        </div>

        {dish.length == 0 && <div className={cx("col-12", "text-center", "d-flex", "f-wrap","j-center",'empty-dish')}>
          <div className={cx('col-4')}>
            <div className={cx('line')}></div>
          </div>
          <div className={cx('col-12')}>
          <h2 className={cx("title")}> <span>No</span>Ordered</h2>
          </div>
          <div className={cx('col-2')}>
            <div className={cx('line')}></div>
          </div>
        </div>}

        {/* Item */}
        {dish.map((item) => {
          return (
            <div
              key={item.id}
              id={item.id}
              className={cx("col-10", "item", "d-flex", "f-wrap")}
            >
              <div className={cx("col-2", "d-flex", "a-center", "j-center")}>
                <div className={cx("logo")}>
                  <img
                    src={`${axios.defaults.baseURL}${item.orderdetail[0].dishes.image}`}
                  ></img>
                </div>
              </div>
              <div className={cx("col-8", "d-flex", "a-center")}>
                <div className={cx("info")}>
                  <h2>
                    {item.user.phone || `Username : ${item.user.username}`}
                  </h2>
                  <p>
                    <span>Price </span>:{" "}
                    {item.orderdetail.reduce(
                      (ac, cur) => ac + cur.dishes.price,
                      0
                    )}
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
                <button onClick={() => handleDeleteOrder(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        {/* Banner */}
        <div className={cx("col-8", "banner", "d-flex", "banner-table")}>
          <h1>Table</h1>
        </div>

        <div className={cx("col-12", "text-center")}>
          <h1 className={cx("title")}>Table Ordered</h1>
        </div>

        {table.length == 0 && <div className={cx("col-12", "text-center", "d-flex", "f-wrap","j-center",'empty-table')}>
          <div className={cx('col-4')}>
            <div className={cx('line')}></div>
          </div>
          <div className={cx('col-12')}>
          <h2 className={cx("title")}> <span>No</span>Ordered</h2>
          </div>
          <div className={cx('col-2')}>
            <div className={cx('line')}></div>
          </div>
        </div>}

        {/* Item */}
        {table.map((item) => {
          return (
            <div
              key={item.id}
              id={item.id}
              className={cx("col-10", "item", "d-flex", "f-wrap")}
            >
              <div className={cx("col-2", "d-flex", "a-center", "j-center")}>
                <div className={cx("logo")}>
                  <h1>{`${item.table.category}${item.table.code}`}</h1>
                </div>
              </div>
              <div className={cx("col-8", "d-flex", "a-center")}>
                <div className={cx("info")}>
                  <h2>
                    {item.user.phone || `Username : ${item.user.username}`}
                  </h2>
                  <div className={cx("d-flex")}>
                    <p>
                      <span>Date : </span>
                      {item.issue_date}
                    </p>
                    <p className={cx("time")}>
                      <span>Time : </span>
                      {item.time_section}
                      {/* <span>Time Section </span>: {item.time_section} */}
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
                <button onClick={() => handleDeleteOrder(item.id)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}

        {/* Total */}
        {/* { false && <div className={cx("total", "d-flex", "j-center", "a-center")}>
          <div className={cx("col-12", "d-flex", "f-wrap", "t-center")}>
            <div className={cx("col-10")}>
              <h1>
                Total: <span>$100</span>
              </h1>
              <h1>
                Payment: <span>Pay on the spot</span>
              </h1>
            </div>
            <div className={cx("col-2", "text-center")}>
              <Link to="/">
                <button onClick={handleOrder} className={cx("order-btn")}>
                  Order
                </button>
              </Link>
            </div>
          </div>
        </div>} */}
      </div>
    </div>
  );
}

export default AdminHistory;
