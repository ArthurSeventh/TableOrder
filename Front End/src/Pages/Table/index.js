import classNames from "classnames/bind";
import { useEffect, useState, useContext, useRef } from "react";
import { loginContext } from "../../App";
import { Navigate } from "react-router-dom";
import styles from "./table.module.scss";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowRight, faArrowUp, faCalendar, faNoteSticky, faTableCells, faTableList } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

function Table() {
  //=============================== UseState ===============================
  //--------------Role UseState--------------
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  //Validate Role
  const context = useContext(loginContext);

  //-------------------Table------------------
  const [a, setA] = useState([]);
  const [b, setB] = useState([]);
  const [c, setC] = useState([]);
  const [d, setD] = useState([]);

  //--------------Function UseState--------------
  const [choose, setChoose] = useState("");
  const [toogle, setToggle] = useState("");
  const [sidebar, setSideBar] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [clear, setClear] = useState(false);
  const [date, setDate] = useState(false);
  const [time, setTime] = useState(false);
  const [refresh, setRefresh] = useState(false);

  //================================== Use Effect ===========================
  //------ Validate Role -----
  useEffect(() => {
    // console.log("Header Useffect");
    if (!context.userInfo) {
      return;
    } else if (context.userInfo.role_key === "U") {
      setIsUser(true);
      setIsAdmin(false);
    } else {
      setIsAdmin(true);
      setIsUser(false);
    }
  }, [context.userInfo]);

  //------ Get table ------------
  useEffect(() => {
    axios
      .post("/tables/get-table", {
        date_time: document.querySelector("input[type='date']").value,
        time_section: document.querySelector("select").value,
      })
      .then((res) => {
        const data = res.data.detail;
        console.log(res.data.detail);
        const a = [];
        const b = [];
        const c = [];
        const d = [];
        for (const item in data) {
          if (data[item].category === "A") {
            a.push(data[item]);
          } else if (data[item].category === "B") {
            b.push(data[item]);
          } else if (data[item].category === "C") {
            c.push(data[item]);
          } else {
            d.push(data[item]);
          }
        }
        setA(a);
        setB(b);
        setC(c);
        setD(d);
      })
      .catch((er) => {
        console.log("Error");
        console.log(er);
      });
  }, [submit, date, time, clear, refresh]);

  //================================== Use ref ===========================
  const userefTable = useRef();
  const useRefDate = useRef();

  //================================= Function ==========================
  //------------Get Current Date----------
  const currentDate = () => {
    const new_date = new Date();
    const date = new_date.getDate();
    const month = new_date.getMonth() + 1;
    const year = new_date.getFullYear();

    const result = `${year}-${month < 10 ? `0${month}` : month}-${
      date < 10 ? `0${date}` : date
    }`;
    return result;
  };

  const currentHour = () => {
    const new_date = new Date();
    const time = new_date.getHours()
  
    return time;
  };

  const currentDay= () =>{
    const new_date = new Date();
    const day = new_date.getDate();
    return day;
  }

  const convertToDay = (h) => {
    const date  = new Date(h);
    const day = date.getDate();
  
    return day;
  };



  //-------------Onclick- sidebar-----------
  const handleCommit = () => {
    const id = choose.id;
    const c_date = document.querySelector("input[type='date']").value;
    const c_time = document.querySelector("select").value;

    const hour = currentHour()
    const cur_day = currentDay()
    const convertDay = convertToDay(c_date)
    
   
    if(c_time < hour)
    {
      alert("Invalid time Section");
      return;
    }
    else if(convertDay < cur_day)
    {
      alert("Invalid Date");
      return;
    }
    axios
      .post("orders/make-order-table", {
        issue_date: c_date,
        table_id: id,
        time_section: c_time,
      })
      .then((res) => {
        setSubmit(!submit);
        alert("Order successfully");
        choose.target.classList.remove(cx(`seat-${choose.section}`));
        choose.target.classList.add(cx(`is-select-${choose.section}`));
      })
      .catch((er) => {
        alert("Order fail");
        console.log(er);
      });
  };
  const handleClear = () => {
    const id = choose.orderId;
    if (id) {
      axios
        .delete(`/orders/delete-order/${id}`)
        .then((res) => {
          console.log(res.data.detail);
          setClear(!clear);
          alert("clear Successful");
        })
        .catch((er) => {
          alert("Delete Fail");
          console.log(er);
        });
    } else {
      alert("The table is already clear");
    }
  };
  const handleRefresh = () => {
    setRefresh(!refresh);
  };
  const handleDisable = () => {
    choose.target.classList.add(cx(`is-select-${choose.section}`));
    choose.target.classList.remove(cx(`seat-${choose.section}`));
    //fetch call API is_select_false
  };

  return (
    <div
      onClick={() => {
        if (sidebar) {
          setSideBar(!sidebar);
        }
      }}
      className={cx("wrapper", "table")}
    >
      <div
        ref={useRefDate}
        className={cx("Container-fluid", "bg-date", "text-center")}
      >
        <h1>Select Date !</h1>
      </div>

      {/* Choose Date Section */}
      <div className={cx("col-12", "select-date")}>
        <div className={cx("date", "d-flex", "f-wrap")}>
          <div className={cx("col-6", "d-flex", "f-wrap", "j-center")}>
            <div className={cx("col-12", "text-center")}>
              <h1> Date</h1>
            </div>
            <div className={cx("col-10")}>
              <input
                type="date"
                id="date"
                name="date"
                defaultValue={currentDate()}
                onChange={() => setDate(!date)}
              ></input>
            </div>
          </div>

          <div className={cx("col-6", "d-flex", "f-wrap", "j-center")}>
            <div className={cx("col-12", "text-center")}>
              <h1> Time</h1>
            </div>
            <div className={cx("col-10")}>
              <div className={cx("custom-select")}>
                <select name="time" id="time" onChange={() => setTime(!time)}>
                  <option value={"8"}>6 - 8 AM</option>
                  <option value={"10"}>8 - 10 AM</option>
                  <option value={"12"}>10 - 12 AM</option>
                  <option value={"14"}>12 - 14 PM</option>
                  <option value={"16"}>14- 16 PM</option>
                  <option value={"18"}>16 - 18 PM</option>
                  <option value={"20"}>18 - 20 PM</option>
                  <option value={"22"}>20 - 22 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Focus button */}
          <div className={cx("col-12", "d-flex", "f-wrap", "j-center")}>
            <div
              onClick={() => {
                userefTable.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                // console.log(userefTable.current)
              }}
              className={cx("table-btn")}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
          </div>

          {/* <div className={cx("col-2", "text-center")}>
            <input onClick={handleDateSubmit} type="submit"></input>
          </div> */}
        </div>
      </div>

      {/* Table background Image */}
      <div className={cx("Container-fluid", "bg-table", "text-left")}>
        <div className={cx("bg-notice")}>
          <h1>Notice</h1>
          <h3>
            Please do not skip choosing your ordering date before order a table
            to avoid unnecessary inadequacies, by default the date will be set
            to the current date
          </h3>
          <h2>Thanks</h2>
        </div>
      </div>

      {/* Order Table Section */}
      <div className={cx("container", "col-12", "d-flex", "f-wrap")}>
        {/* Title */}
        <div
          className={cx(
            "col-12",
            "order-table-title",
            "d-flex",
            "f-wrap",
            "j-center"
          )}
        >
          <div className={cx("col-2")}>
            <div className={cx("line")}></div>
          </div>
          <div className={cx("col-12", "text-center")}>
            <h1 ref={userefTable}>Order Table</h1>
          </div>
          <div className={cx("col-4")}>
            <div className={cx("line")}></div>
          </div>

          {/* Date focus button */}
          <div className={cx("col-12", "d-flex", "f-wrap", "j-center")}>
            <div
              onClick={() => {
                useRefDate.current.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
                // console.log(userefTable.current)
              }}
              className={cx("date-btn")}
            >
              <FontAwesomeIcon icon={faCalendar} />
            </div>
          </div>
        </div>

        {/* //Section A */}
        <div className={cx("col-6")}>
          <div className={cx("bg-gate-a", "d-flex", "f-wrap", "j-center")}>
            <div className={cx("col-10", "d-flex", "f-wrap")}>
              <div className={cx("col-12", "text-center")}>
                <h1>A</h1>
              </div>
              {a.map((seat) => (
                <div key={seat.id} className={cx("col-3")}>
                  <button
                    onClick={(e) => {
                      console.log(`${seat.category}${seat.code}`);
                      setChoose({
                        id: `${seat.id}`,
                        section: "a",
                        target: e.target,
                        code: `${seat.category}${seat.code}`,
                        orderId: seat.order_id,
                      });
                      setSideBar(!sidebar);
                    }}
                    className={!seat.state ? cx("is-select-a") : cx("seat-a")}
                    disabled={isUser && !seat.state}
                  >{`${seat.category}${seat.code}`}</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* //Section B */}
        <div className={cx("col-6")}>
          <div className={cx("bg-gate-b", "d-flex", "f-wrap", "j-center")}>
            <div className={cx("col-10", "d-flex", "f-wrap")}>
              <div className={cx("col-12", "text-center")}>
                <h1>B</h1>
              </div>
              {b.map((seat) => (
                <div key={seat.id} className={cx("col-3")}>
                  <button
                    onClick={(e) => {
                      console.log(`${seat.category}${seat.code}`);
                      setChoose({
                        id: `${seat.id}`,
                        section: "b",
                        target: e.target,
                        code: `${seat.category}${seat.code}`,
                        orderId: seat.order_id,
                      });
                      setSideBar(!sidebar);
                    }}
                    className={!seat.state ? cx("is-select-b") : cx("seat-b")}
                    disabled={isUser && !seat.state}
                  >{`${seat.category}${seat.code}`}</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* //Section C */}
        <div className={cx("col-6")}>
          <div className={cx("bg-gate-c", "d-flex", "f-wrap", "j-center")}>
            <div className={cx("col-10", "d-flex", "f-wrap")}>
              <div className={cx("col-12", "text-center")}>
                <h1>C</h1>
              </div>
              {c.map((seat) => (
                <div key={seat.id} className={cx("col-3")}>
                  <button
                    onClick={(e) => {
                      console.log(`${seat.category}${seat.code}`);
                      setChoose({
                        id: `${seat.id}`,
                        section: "c",
                        target: e.target,
                        code: `${seat.category}${seat.code}`,
                        orderId: seat.order_id,
                      });
                      setSideBar(!sidebar);
                    }}
                    className={!seat.state ? cx("is-select-c") : cx("seat-c")}
                    disabled={isUser && seat.is_selected}
                  >{`${seat.category}${seat.code}`}</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* //Section D */}
        <div className={cx("col-6", "m-b")}>
          <div className={cx("bg-gate-d", "d-flex", "f-wrap", "j-center")}>
            <div className={cx("col-10", "d-flex", "f-wrap")}>
              <div className={cx("col-12", "text-center")}>
                <h1>D</h1>
              </div>
              {d.map((seat) => (
                <div key={seat.id} className={cx("col-3")}>
                  <button
                    onClick={(e) => {
                      console.log(`${seat.category}${seat.code}`);
                      setChoose({
                        id: `${seat.id}`,
                        section: "d",
                        target: e.target,
                        code: `${seat.category}${seat.code}`,
                        orderId: seat.order_id,
                      });
                      setSideBar(!sidebar);
                    }}
                    className={!seat.state ? cx("is-select-d") : cx("seat-d")}
                    disabled={isUser && seat.is_selected}
                  >{`${seat.category}${seat.code}`}</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {sidebar && (
          <div className={cx("col-3")}>
            <div className={cx("side-menu")}>
              <ul>
                {isUser && (
                  <>
                    <li onClick={handleCommit} className={cx("btn-commit")}>
                      {" "}
                      Order
                    </li>
                    <li onClick={handleRefresh} className={cx("btn-refresh")}>
                      {" "}
                      Refresh
                    </li>
                  </>
                )}
                {isAdmin && (
                  <>
                    <li onClick={handleCommit} className={cx("btn-enable")}>
                      {" "}
                      Order
                    </li>
                    <li onClick={handleClear} className={cx("btn-delete")}>
                      {" "}
                      Clear
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className={cx("footer")}></div>
    </div>
  );
}

export default Table;
