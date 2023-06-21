import {
    createBrowserRouter,
} from "react-router-dom";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Dashboard from "../Pages/Dashboard";
import ManageUsers from "../Pages/ManageUsers";
import NotFound from "../Pages/NotFound";
import Instructor from "../Pages/Instructor";
import Student from "../Pages/Student";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: "/dashboard/admin",
                element: <ManageUsers />
            },
            {
                path: "/dashboard/instructor",
                element: <Instructor />
            },
            {
                path: "/dashboard/student",
                element: <Student />
            }
        ]
    },
    {
        path: "/*",
        element: <NotFound></NotFound>
    }
])

export default router;