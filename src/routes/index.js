import LayoutDefault from "../layouts/DefaultLayout";
import PrivateRoutes from "../components/PrivateRoutes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";


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
            // {
            //     path: "*",
            //     element: <Error404 />
            // },
            {
                element: <PrivateRoutes />,
                children: [
                    {
                        path: "/profile",
                        element: <Profile />
                    }
                ]
            },
        ]
    },

]
