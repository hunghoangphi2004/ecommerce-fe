import { useRoutes } from "react-router-dom";
import { routes } from "../../routes";

function AllRoutes() {
    let elements = useRoutes(routes);
    return elements;
}

export default AllRoutes