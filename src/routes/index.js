import { Children } from "react"
import LayoutDefault from "../layouts/DefaultLayout"
import Login from "../pages/Login"
import Register from "../pages/Register"
import Home from "../pages/Home"
import About from "../pages/About"

export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/about",
                element: <About />
            },
        ]
    },

]
