import classNames from "classnames/bind";
import styles from "./card.module.scss";
import Logo from "../../Images/User-logo.png";
import comkimchi from "../../Images/comkimchi.jpeg";
import canhkimchi from "../../Images/canh_kim_chi_3.jpeg";
import ga from "../../Images/chiken 2.jpeg";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// const data = [
//   {
//     type: "Lunch",
//     image: comkimchi,
//     name: "KimChi Rice",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora perferendis quos consequatur error itaque cumque velit natus",
//     price: "20",
//   },
//   {
//     type: "Lunch",
//     image: canhkimchi,
//     name: "kimchi Soup",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora perferendis quos consequatur error itaque cumque velit natus",
//     price: "10",
//   },
//   {
//     type: "Lunch",
//     image: ga,
//     name: "Chiken",
//     description:
//       "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora perferendis quos consequatur error itaque cumque velit natus",
//     price: "25",
//   },
// ];

const cx = classNames.bind(styles);
function Card() {
   //================================Use State===========================
  const [data, setData] = useState([])
  const [delet, setDelet] = useState(true)
  const [order, setOrder] = useState(true)

 //================================Use Effect===========================
 //---------------Get Card Detail-------------
 useEffect(()=>{
  axios.get("cards/get-card")
  .then(res=>{
    setData(res.data.detail)
  })
  .catch(er=>{
    alert("Get Card Fail")
    console.log(er)
  })
 },[delet, order])



  //================================Function===========================
  const handleDelete = (id) => {
    // const target = document.getElementById(id);
    // console.log(id)
      axios.delete(`cards/pop-out-card/${id}`)
      .then(res=>{
        setDelet(!delet)
        alert("Delete Succes")
      })
      .catch(er=>{
        console.log(er)
        alert("Delete Fail")
      })
    // send API Delete
  };

  const getCurrentDate = () => {
    const day = new Date()
    const date = day.getDate()
    const month = day.getMonth() + 1
    const year = day.getFullYear()
    const cur_day = `${year}-${month<10?`0${month}`:month}-${date<10?`0${date}`:date}`
    return cur_day
  }

  const handleOrder = () => {
    const list_dish = data.map(item=>item.dish_id)
    const date = getCurrentDate()
    
    if(list_dish.length > 0)
    {
      axios.post("orders/make-order-dishes",{
        dishes_id : list_dish,
        issue_date: date,
      })
      .then(res=>{
        console.log(res);
        alert("Order Successfully")
        setOrder(!order)
      })
      .catch(er=>{
        console.log(er)
        alert("Order Fail")
      })
  
      axios.delete("cards/clean-card")
      .then(res=>{
      })
      .catch(er=>{
        alert("Clean Card Fail")
        console.log(er)
      })
    }
    else{
      alert("There are no dishes in Card")
    }
  };

  return (
    <div className={cx("container")}>
       <div className={cx("container-fluid", "banner", "d-flex")}>
          <h1>Card</h1>
        </div>
      <div className={cx("col-12", "d-flex", "f-wrap", "j-center")}>     
        <div className={cx('col-12','text-center', 'h1-title')}>
          <h1>Dishes Order</h1>
        </div>
        {data.map((item) => {
          return (
            <div
              key={item.dish_id}
              id={item.dish_id}
              className={cx("col-10", "item", "d-flex", "f-wrap")}
            >
              <div className={cx("col-2", "d-flex", "a-center", "j-center")}>
                <div className={cx("logo")}>
                  <img src={`${axios.defaults.baseURL}${item.dish.image}`}></img>
                </div>
              </div>
              <div className={cx("col-8", "d-flex", "a-center")}>
                <div className={cx("info")}>
                  <h2>{item.dish.name}</h2>
                  <p>
                    <span>Price </span>: {`${item.dish.price}$`}
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
                <button onClick={() => handleDelete(item.dish_id)}>Delete</button>
              </div>
            </div>
          );
        })}

        <div className={cx("total", "d-flex", "j-center", "a-center")}>
          <div className={cx("col-12", "d-flex", "f-wrap", "t-center")}>
            <div className={cx("col-10")}>
              <h1>
                Total: <span>{`${data.reduce((ac,cur)=>ac+cur.dish.price,0)} $`}</span>
              </h1>
              <h1>
                Payment: <span>Pay on the spot</span>
              </h1>
            </div>
            <div className={cx("col-2", "text-center")}>
              {/* <Link to="/history"> */}
                <button onClick={handleOrder} className={cx("order-btn")}>
                  Order
                </button>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
