import Login from "../pages/Login"
import Register from "../pages/Register"

export const routes = [
    {
        path: "/",
        element: <h1>Home</h1>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path: "/register",
        element: <Register/>
    },
]
