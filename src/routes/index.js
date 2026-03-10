import LayoutDefault from "../layouts/DefaultLayout/DefaultLayout";
import LayoutAdmin from "../layouts/AdminLayout/AdminLayout";
import PrivateRoutes from "../components/PrivateRoutes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Product from "../pages/Admin/Product";
import Create from "../pages/Admin/Create";
import Edit from "../pages/Admin/Edit";
import Detail from "../pages/Admin/Detail";

export const routes = [
    {
        path: "/",
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
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
                        path: "profile",
                        element: <Profile />
                    }
                ]
            },
        ]
    },
    {
        path: "/admin",
        element: <LayoutAdmin />,
        children: [
            {
                index: true,
                element: <>Tổng quan</>
            },
            {
                path: "products",
                children: [
                    {
                        index: true,
                        element: <Product />
                    },
                    {
                        path: "create",
                        element: <Create />
                    },
                    {
                        path: "detail/:id",
                        element: <Detail />
                    },
                    {
                        path: "edit/:id",
                        element: <Edit />
                    },
                ]
            },
            {
                path: "categories",
                element: <>Danh mục</>
            }
        ]
    }

]
