import Home from '../Pages/General/Home'
import Login from '../Pages/General/Login'
import Order from '../Pages/Order'
import Table from '../Pages/Table'
import Food from '../Pages/Food'
import User from '../Pages/User'
import Contact from '../Pages/Contact'
import Profile from '../Pages/Profile'
import Card from '../Pages/Card'
import Landing from '../Pages/Landing'
import History from '../Pages/History'
import Regist from '../Pages/General/Regist'
import AdminHistory from '../Pages/AdminHistory'
import AdminOrder from '../Pages/AdminOrder'

const publicRoute = [
    {path: '/', page: Landing, protected: true},
    {path: '/home', page: Home},
    {path: '/login', page: Login, layout: null, protected: true},
    {path: '/order', page: Order},
    {path: '/table', page: Table},
    {path: '/food', page: Food, protected: true},
    {path: '/user', page: User, layout: 'h'},
    {path: '/contact', page: Contact,},
    {path: '/profile', page: Profile,},
    {path: '/card', page: Card,},
    {path: '/history', page: History,},
    {path: '/adminhistory', page: AdminHistory,},
    {path: '/adminorder', page: AdminOrder,},
    {path: '/regist', page: Regist,layout: null, protected: true},
]

const privateRoute = []

export {publicRoute, privateRoute}