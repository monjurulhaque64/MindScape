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
import AddClass from "../Pages/Dashboard/AddClass/AddClass";
import AdminRoute from "./AdminRoute";
import InstructorRoute from "./InstructorRoute";
import ManageInstractorClass from "../Pages/Dashboard/ManageInstractorClass/ManageInstractorClass";
import UpdateClass from "../Pages/Dashboard/UpdateClass/UpdateClass";
import Instracutor from "../Pages/Instratur/Instracutor";
import ManageClasses from "../Pages/Dashboard/ManageClass/ManageClasses";
import Feedback from "../Pages/Dashboard/Feedback/Feedback";
import Payment from "../Pages/Dashboard/Payment/Payment";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import MyEnrollClases from "../Pages/Dashboard/MyEnrollClass/MyEnrollClases";
import GiveRiview from "../Pages/Dashboard/GiveRiview/GiveRiview";

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
      },
      {
        path: '/instracutor',
        element: <Instracutor></Instracutor>
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
        path: 'allusers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'adminhome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'instructorhome',
        element: <InstructorRoute><InstructorHome></InstructorHome></InstructorRoute>
      },
      {
        path: 'myhome',
        element: <StudentHome></StudentHome>
      },
      {
        path: 'paymenthistory',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: 'myenrollclasses',
        element: <MyEnrollClases></MyEnrollClases>
      },
      {
        path: 'addreview',
        element: <GiveRiview></GiveRiview>
      },
      {
        path: 'myselectedclass/payment/:id',
        element: <Payment></Payment>,
        loader: ({ params }) => fetch(`http://localhost:5000/enrolls/${params.id}`)
      },
      {
        path: 'addclass',
        element: <InstructorRoute><AddClass></AddClass></InstructorRoute>
      },
      {
        path: 'manageinstructorclass',
        element: <InstructorRoute><ManageInstractorClass></ManageInstractorClass></InstructorRoute>
      },
      {
        path: 'manageinstructorclass/update/:id',
        element: <InstructorRoute><UpdateClass></UpdateClass></InstructorRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/classes/instructor/${params.id}`)
      },
      {
        path: 'manageclass',
        element: <AdminRoute><ManageClasses></ManageClasses></AdminRoute>
      },
      {
        path: 'manageclass/feedback/:id',
        element: <AdminRoute><Feedback></Feedback></AdminRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/classes/instructor/${params.id}`)
      },
    ]
  }
]);

export default router;