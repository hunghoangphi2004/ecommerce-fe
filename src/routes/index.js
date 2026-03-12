import LayoutDefault from "../layouts/DefaultLayout/DefaultLayout";
import LayoutAdmin from "../layouts/AdminLayout/AdminLayout";
import PrivateRoutes from "../components/PrivateRoutes";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Product from "../pages/Admin/Product";
import CreateProduct from "../pages/Admin/CreateProduct";
import EditProduct from "../pages/Admin/EditProduct";
import DetailProduct from "../pages/Admin/DetailProduct";
import Category from "../pages/Admin/Category";
import CreateCategory from "../pages/Admin/CreateCategory";
import DetailCategory from "../pages/Admin/DetailCategory";
import EditCategory from "../pages/Admin/EditCategory";

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
                        element: <CreateProduct />
                    },
                    {
                        path: "detail/:id",
                        element: <DetailProduct />
                    },
                    {
                        path: "edit/:id",
                        element: <EditProduct />
                    },
                ]
            },
            {
                path: "categories",
                children: [
                    {
                        index: true,
                        element: <Category />
                    },
                    {
                        path: "create",
                        element: <CreateCategory />
                    },
                    {
                        path: "detail/:id",
                        element: <DetailCategory />
                    },
                    {
                        path: "edit/:id",
                        element: <EditCategory />
                    },
                ]
            }
        ]
    }

]
