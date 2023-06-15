import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Pages/Home/Home/Home";
import Classes from "../Pages/Classes/Classes";
import Login from "../Pages/Login/Login";
import Singup from "../Pages/SingUp/Singup";
import PrivetRoute from "./PrivetRoute";
import Dashboard from "../Layouts/Dashboard";
import MySelectedClasses from "../Pages/Dashboard/MySelectedClasses/MySelectedClasses";
import ManageUsers from "../Pages/Dashboard/manageUsers/ManageUsers";
import AdminHome from "../Pages/Dashboard/AdminHome/AdminHome";
import InstructorHome from "../Pages/Dashboard/InstructorHome/InstructorHome";
import StudentHome from "../Pages/Dashboard/StudentHome/StudentHome";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: "/",
            element: <Home></Home>
        },
        {
            path: '/classes',
            element: <Classes></Classes>
        },
        {
            path: '/login',
            element: <Login></Login>
        },
        {
          path: '/register',
          element: <Singup></Singup>
      }
      ]
    },
    {
      path: 'dashboard',
      element: <PrivetRoute><Dashboard></Dashboard></PrivetRoute>,
      children: [
        {
          path: 'myselectedclass',
          element: <MySelectedClasses></MySelectedClasses>
        },
        {
          path:'allusers',
          element: <ManageUsers></ManageUsers>
        },
        {
          path:'adminhome',
          element:<AdminHome></AdminHome>
        },
        {
          path:'instructorhome',
          element:<InstructorHome></InstructorHome>
        },
      {
        path: 'myhome',
        element:<StudentHome></StudentHome>
      }
      ]
    }
  ]);

  export default router;