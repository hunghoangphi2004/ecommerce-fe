import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
    const tokenUser = localStorage.getItem("tokenUser");

    return (<>
        {tokenUser? (<Outlet/>):(<Navigate to="/login"/>)}
    </>)
}

export default PrivateRoutes