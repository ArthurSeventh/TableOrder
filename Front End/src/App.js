import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import axios from "axios";

import { publicRoute, privateRoute } from "./Routes";
import {DefaultLayout, HeaderOnly} from './Layouts'
import ProtectedRoute from './Component/ProtectedRoute'
export const loginContext = createContext();


axios.defaults.baseURL = `http://127.0.0.1:5000/api/v1/`;

function App() {

  const [auth, setIsLogin] = useState(false)
  const [userinfo, setuserinfo] = useState(null);
  useEffect(()=>{
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('auth');
    axios
      .post('auth/token')
      .then((resp) => {
          if (resp.statusText === 'OK') {
              setuserinfo(resp.data.user);
              // console.log('app.js userEffect')
          }
          setIsLogin(true)

      })
      .catch((err) => {
        setuserinfo(false)
      });
}, [auth]);

  if(userinfo === null)
  {
    return <h1>Loading</h1>
  }
  return (
    <loginContext.Provider 
      value = {{
        userInfo: userinfo,
        is_auth: auth,
        set_login: (v)=>{
          setIsLogin(v)
        },
        setUserInfo: (v)=>{
          setuserinfo(v)
        }
      }}
    >
      <Router>
        <Routes>
          {publicRoute.map((route, index)=> {
            let Layout = DefaultLayout
            if(route.layout === null)
            {
              Layout = Fragment
            }
            else if(route.layout)
            {
              Layout = HeaderOnly
            }
            else
            {
              Layout = DefaultLayout
            }
  
            const Page = route.page
            return <Route 
                      key ={index} 
                      path={route.path} 
                      element={
                        route.protected
                        ? <Layout><Page /></Layout>
                        : <ProtectedRoute><Layout><Page /></Layout></ProtectedRoute>
                      }
                      />
          } )}
        </Routes>
      </Router>
    </loginContext.Provider >
  )
}

export default App;
