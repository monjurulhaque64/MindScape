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
            element: <PrivetRoute><Classes></Classes></PrivetRoute>
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
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: 'myselectedclass',
          element: <MySelectedClasses></MySelectedClasses>
        }
      ]
    }
  ]);

  export default router;