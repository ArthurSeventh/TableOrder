import styles from "./header.module.scss";
import classNames from "classnames/bind";
import logo from "../../Images/logo.png";
// import user_setting from '../../../../Images/user.png';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faListUl } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import {loginContext} from '../../App'

const cx = classNames.bind(styles);
function Header() {
  const [toggleState, setToggleState] = useState(true);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1100px)" });
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const context = useContext(loginContext);
  // console.log(`"isUser Header: ${isUser}`)
  // console.log(`"isUser Header: ${isAdmin}`)
  useEffect(()=>{
    // console.log("Header Useffect")
    if(!context.userInfo)
      {
        return 
      }
    else if(context.userInfo.role_key === 'U'){

      setIsUser(true)
      // setIsAdmin(false)
    }
    else
    {
      setIsAdmin(true)
      // setIsUser(false)
    }
  },[context.userInfo])

  useEffect(() => {
    if (!isTabletOrMobile) {
      setToggleState(true);
    }
  }, [isTabletOrMobile]);

  // const [isMobile, setIsMobile] = useState()

  const handledropdown = ()=>{
    setDropdown(!dropdown)
  }



  return (
    <div className={cx("container")}>
      <div className={cx("wrapper", "d-flex", "f-wrap")}>
        <div className={cx("col-2")}>
          <div className={cx("logo", "t-center")}>
            <Link to="/">
              <img src={logo}></img>
            </Link>
          </div>
        </div>
        <div className={cx("responsive-btn")}>
          <button onClick={() => setToggleState(!toggleState)}>
            <FontAwesomeIcon icon={faListUl} />
          </button>
        </div>
        {toggleState && (
          <div
            className={cx("Toggle-responsive", "col-10", "d-flex", "f-wrap")}
          >
            <div className={cx("col-10")}>
              <div className={cx("tab")}>
                <ul className={cx("d-flex", "j-center")}>
                <NavLink
                        to="/home"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? cx("is-active")
                            : ""
                        }
                      >
                        <li>Dashboard</li>
                      </NavLink>
                  {isUser && (
                    <>
              
                      <NavLink
                        to="/history"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? cx("is-active")
                            : ""
                        }
                      >
                        <li>History</li>
                      </NavLink>
                      <NavLink
                        to="/order"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? cx("is-active")
                            : ""
                        }
                      >
                        <li>Order</li>
                      </NavLink>
                      <NavLink
                        to="/profile"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? cx("is-active")
                            : ""
                        }
                      >
                        <li>Profile</li>
                      </NavLink>

                      {/* <li>History </li>
                      <li>Order</li>
                      <li>Profile </li> */}
                    </>
                  )}
                  {isAdmin && (
                    <>
                      <NavLink
                        to="/table"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? cx("is-active")
                            : ""
                        }
                      >
                        <li>Table</li>
                      </NavLink>
                      <NavLink
                        to="/food"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? cx("is-active")
                            : ""
                        }
                      >
                        <li>Menu</li>
                      </NavLink>
                      <NavLink
                        to="/user"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? cx("is-active")
                            : ""
                        }
                      >
                        <li>User</li>
                      </NavLink>
                      <NavLink
                        to="/adminhistory"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? cx("is-active")
                            : ""
                        }
                      >
                        <li>Order</li>
                      </NavLink>
                      <NavLink
                        to="/adminorder"
                        className={({ isActive, isPending }) =>
                          isPending
                            ? "pending"
                            : isActive
                            ? cx("is-active")
                            : ""
                        }
                      >
                        <li>History</li>
                      </NavLink>
                    </>
                  )}
                </ul>
              </div>
            </div>
            <div className={cx("col-2")}>
              <div className={cx("user-logo", "d-flex", "j-right")}>
                <img onClick={handledropdown} src={logo}></img>
                <span>
                  <FontAwesomeIcon icon={faCaretDown} />
                </span>
              </div>
            </div>
            {dropdown && (
              <div className={cx("col-2", "d-flex")}>
                <div className={cx("dropdown-menu", "d-flex")}>
                  <ul>
                    <Link 
                      onClick={()=>setDropdown(!dropdown)}
                      to="/profile">
                      <li>Profile</li>
                    </Link>
                    <Link 
                      to="/login"
                      onClick={()=>{
                        context.set_login(false)
                        localStorage.removeItem("auth")
                      }}
                      >
                      <li>Logout</li>
                    </Link>
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
