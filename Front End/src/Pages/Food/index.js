import classNames from "classnames/bind";
import styles from "./food.module.scss";

// Image
import Logo from "../../Images/logo-white.png";
import food1 from "../../Images/food-1.jpeg";
import food2 from "../../Images/pancakes-2291908__480.jpeg";
import food3 from "../../Images/fw-zucchini-breakfast-bread-ft-recipe2019_30-d833ef61d7ab43cf8ffc2277f2ea08fa.jpeg";
import food4 from "../../Images/Egg-Bread-Fingers.jpeg";
import comkimchi from "../../Images/comkimchi.jpeg";
import canhkimchi from "../../Images/canh_kim_chi_3.jpeg";
import ga from "../../Images/chiken 2.jpeg";
import steak from "../../Images/steak.jpeg";
import dbread from "../../Images/breadmike.jpeg";
import tomchien from "../../Images/tomcchine.jpeg";

import { useState, useEffect } from "react";
import { useContext } from "react";
import { loginContext } from "../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPlus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const cx = classNames.bind(styles);

function Food() {
  // console.log(breakfast)
  // console.log(lunch)
  // console.log(dinner)
  //========================== UseState ============================
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState(false);
  const [ap, setAp] = useState(false);
  const [data, setData] = useState(false);
  const context = useContext(loginContext);

  //---------------Menu Data UseState-------------
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  // console.log(breakfast)
  // console.log(lunch)
  // console.log(dinner)

    //---------------Card UseState-------------
  const [number, setNumber] = useState(0);
  const [addToCard, setAddToCard] = useState(false)

  //--------------Function UseState--------------
  const [remove, setRemove] = useState(true);
  const [add, setAdd] = useState(true);
  const [validName, setValidName] = useState(true);
  const [validCost, setValidCost] = useState(true);
  const [validDescription, setValidDescription] = useState(true);
  const [validImage, setValidImage] = useState(true);

  //========================= UseEffect =================================
  //---------- Role -------------------
  useEffect(() => {
    console.log("food Use effect");
    if (!context.userInfo) {
      return;
    } else if (context.userInfo.role_key === "U") {
      setUser(true);
    } else {
      setAdmin(true);
    }
  }, [context.userInfo]);

  //------------Get Menu -----------
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
  }, [remove, add, ap]);

  //------------Get Card -----------
  useEffect(()=>{
    axios.get("cards/get-card")
    .then(res=>{
      setNumber(res.data.Total)
    })
    .catch(er=>{
      console.log(er)
    })
  },[addToCard])

  //=========================Function============================
  const handleAdd = (e) => {
    // setNumber(number + 1);
    axios.post("cards/add-to-card",{
      dish_id: e.id,
    })
    .then(res=>{
      // console.log(res.data.detail)
      alert("Add Successfully")
      setAddToCard(!addToCard)
    })
    .catch(er=>{
      alert("Add Fail")
      // console.log("er")
    })
  };

  const handelAp = () => {
    const type = document.querySelector("#type").value;
    const name = document.querySelector("#name").value;
    const cost = document.querySelector("#cost").value;
    const description = document.querySelector("#description").value;
    const image = document.querySelector("#image").files[0];
    if (name == "" || cost == "" || description == "" || image == undefined) {
      alert("There are some fields have not fill yet");
      return
    }

    const f = new FormData();

    f.append("type", type);
    f.append("name", name);
    f.append("price", cost);
    f.append("description", description);
    f.append("file_input", image);

    axios
      .post("dishes/add-dishes", f, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        setAp(!ap)
        alert("Add product successfully");
      })
      .catch((er) => {
        alert("Add fail");
        console.log(er);
      });
  };

  const handleDelete = (e) => {
    const target = document.getElementById(e);

    axios
      .delete(`dishes/delete-dishes/${e}`)
      .then((res) => {
        console.log(res);
        alert("Delete Successfully");
        setRemove(!remove);
      })
      .catch((er) => {
        console.log(er);
        alert("Delete fail");
      });
  };

  return (
    <div className={cx("food-wrapper")}>
      {/* BreakFast */}
      <div className={cx("container-fluid", "d-flex", "f-wrap", "bg-menu")}>
        {/* <img src={Logo} alt="" /> */}
        <div className={cx("col-3")}>
          <h1>Menu</h1>
        </div>
      </div>
      {/* BreakFast_Item */}
      <div
        className={cx("container", "col-12", "d-flex", "f-wrap", "j-center")}
      >
        <div className={cx("col-12", "text-center", "Breakfast-title")}>
          <h1 className={cx("menu-item-title")}>Break Fast</h1>
        </div>
        <div className={cx("col-12", "d-flex", "j-center", "section-line")}>
          <div className={cx("col-3")}>
            <div className={cx("line")}></div>
          </div>
        </div>
        <div
          className={cx(
            "col-12",
            "d-flex",
            "f-wrap",
            "j-center",
            "Breakfast-food"
          )}
        >
          {breakfast.map((item, index) => {
            // const id = item.name.split(" ").join("");
            return (
              <div key={index} id={item.id} className={cx("col-3")}>
                <div className={cx("menu-item")}>
                  <img src={`${axios.defaults.baseURL}${item.image}`}></img>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div
                    className={cx(
                      "d-flex",
                      "a-center",
                      "s-between",
                      "price-btn"
                    )}
                  >
                    {context.is_auth && admin && (
                      <button
                        className={cx("btn-danger")}
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    )}
                    {context.is_auth && user && (
                      <button
                        className={cx("btn-add")}
                        onClick={() => handleAdd(item)}
                      >
                        Add
                      </button>
                    )}
                    <p className={cx("price")}>{`\$${item.price}`}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={cx("col-12", "d-flex", "j-center", "section-line")}>
          <div className={cx("col-3")}>
            <div className={cx("line")}></div>
          </div>
        </div>
      </div>

      {/* Lunch */}
      <div className={cx("container-fluid", "d-flex", "f-wrap", "bg-lunch")}>
        <div className={cx("col-3")}>
          <h1>Lunch</h1>
        </div>
      </div>
      {/* Lunch_Item */}
      <div
        className={cx("container", "col-12", "d-flex", "f-wrap", "j-center")}
      >
        <div className={cx("col-12", "text-center", "Lunch-title")}>
          <h1 className={cx("menu-item-title")}>Lunch</h1>
        </div>
        <div className={cx("col-12", "d-flex", "j-center", "section-line")}>
          <div className={cx("col-3")}>
            <div className={cx("line")}></div>
          </div>
        </div>
        <div
          className={cx(
            "col-12",
            "d-flex",
            "f-wrap",
            "j-center",
            "Breakfast-food"
          )}
        >
          {lunch.map((item, index) => {
            // const id = item.name.split(" ").join("");
            return (
              <div key={index} id={item.id} className={cx("col-3")}>
                <div className={cx("menu-item")}>
                  <img src={`${axios.defaults.baseURL}${item.image}`}></img>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div
                    className={cx(
                      "d-flex",
                      "a-center",
                      "s-between",
                      "price-btn"
                    )}
                  >
                    {context.is_auth && admin && (
                      <button
                        className={cx("btn-danger")}
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    )}
                    {context.is_auth && user && (
                      <button
                        className={cx("btn-add")}
                        onClick={() => handleAdd(item)}
                      >
                        Add
                      </button>
                    )}
                    <p className={cx("price")}>{`\$${item.price}`}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={cx("col-12", "d-flex", "j-center", "section-line")}>
          <div className={cx("col-3")}>
            <div className={cx("line")}></div>
          </div>
        </div>
      </div>

      {/* Dinner */}
      <div className={cx("container-fluid", "d-flex", "f-wrap", "bg-dinner")}>
        <div className={cx("col-3")}>
          <h1>Dinner</h1>
        </div>
      </div>
      {/* Dinner_Item */}
      <div
        className={cx("container", "col-12", "d-flex", "f-wrap", "j-center")}
      >
        <div className={cx("col-12", "text-center", "Lunch-title")}>
          <h1 className={cx("menu-item-title")}>Dinner</h1>
        </div>
        <div className={cx("col-12", "d-flex", "j-center", "section-line")}>
          <div className={cx("col-3")}>
            <div className={cx("line")}></div>
          </div>
        </div>
        <div
          className={cx(
            "col-12",
            "d-flex",
            "f-wrap",
            "j-center",
            "Breakfast-food"
          )}
        >
          {dinner.map((item, index) => {
            // const id = item.name.split(" ").join("");
            return (
              <div key={index} id={item.id} className={cx("col-3")}>
                <div className={cx("menu-item")}>
                  <img src={`${axios.defaults.baseURL}${item.image}`}></img>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <div
                    className={cx(
                      "d-flex",
                      "a-center",
                      "s-between",
                      "price-btn"
                    )}
                  >
                    {context.is_auth && admin && (
                      <button
                        className={cx("btn-danger")}
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    )}
                    {context.is_auth && user && (
                      <button
                        className={cx("btn-add")}
                        onClick={() => handleAdd(item)}
                      >
                        Add
                      </button>
                    )}
                    <p className={cx("price")}>{`\$${item.price}`}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={cx("col-12", "d-flex", "j-center", "section-line")}>
          <div className={cx("col-3")}>
            <div className={cx("line")}></div>
          </div>
        </div>
      </div>

      {/* Shoping Card */}
      {context.is_auth && user && (
        <>
          <div className={cx("card", "d-flex", "j-center", "a-center")}>
            <Link to="/card">
              <span>
                <FontAwesomeIcon icon={faShoppingCart} />
              </span>
            </Link>
          </div>
          <div className={cx("number", "d-flex", "j-center", "a-center")}>
            {number}
          </div>
        </>
      )}

      {/* Add Icon */}
      {context.is_auth && admin && (
        <div
          onClick={() => setAp(true)}
          className={cx("plus", "d-flex", "j-center", "a-center")}
        >
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </div>
      )}

      {/* Add function */}
      {ap && (
        <div className={cx("add-product", "d-flex", "f-wrap", "j-center")}>
          <div className={cx("col-12", "text-right", "delete-icon")}>
            <FontAwesomeIcon
              onClick={() => setAp(false)}
              icon={faCircleXmark}
            />
          </div>
          <h1>Add Product</h1>
          <div className={cx("col-11")}>
            <label htmlFor="type"> Type </label>
            <form>
              <select id="type" name="type">
                <option value="B">BreakFast</option>
                <option value="L">Lunch</option>
                <option value="D">Dinner</option>
              </select>
            </form>
          </div>
          <div className={cx("col-11", "d-flex", "f-wrap")}>
            <div className={cx("col-6", "p-l-0","add_name")}>
              {validName && <label htmlFor="name"> Name </label>}
              {!validName && (
                <label htmlFor="name" className={cx("red")}>
                  {" "}
                  Invalid Name{" "}
                </label>
              )}
              <input
                type="text"
                placeholder="name"
                id="name"
                onChange={() => {
                  setValidName(true);
                }}
                onBlur={(e) =>
                  setValidName(e.target.value.trim() === "" ? false : true)
                }
              />
            </div>
            <div className={cx("col-6", "p-r-0")}>
              {validCost && <label htmlFor="cost"> Cost </label>}
              {!validCost && (
                <label htmlFor="name" className={cx("red")}>
                  {" "}
                  Invalid Cost{" "}
                </label>
              )}
              <input
                type="number"
                placeholder="Cost"
                id="cost"
                onChange={() => {
                  setValidCost(true);
                }}
                onBlur={(e) =>
                  setValidCost(e.target.value.trim() === "" ? false : true)
                }
              />
            </div>
          </div>
          <div className={cx("col-11")}>
            {validDescription && (
              <label htmlFor="description"> Description </label>
            )}
            {!validDescription && (
              <label htmlFor="description" className={cx("red")}>
                {" "}
                Invalid Description{" "}
              </label>
            )}
            <input
              type="text"
              placeholder="Description"
              id="description"
              onChange={() => {
                setValidDescription(true);
              }}
              onBlur={(e) => {
                setValidDescription(
                  e.target.value.trim() === "" ? false : true
                );
              }}
            />
          </div>
          <div className={cx("col-11")}>
            {validImage && <label htmlFor="image"> Image </label>}
            {!validImage && (
              <label htmlFor="image" className={cx("red")}>
                {" "}
                Invalid Image{" "}
              </label>
            )}
            <input
              type="file"
              id="image"
              onChange={(e) => {
                setValidImage(e.target.value === undefined ? false : true);
              }}
            />
          </div>
          <div className={cx("col-5", "btn")}>
            <button onClick={handelAp}>Add</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Food;
