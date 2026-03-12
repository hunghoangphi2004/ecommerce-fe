import { useState, useEffect } from "react";
import { getCategories } from "../services/admin/categoryService";

export const useCategoryParent = () => {
    const [categoryParent, setCategoryParent] = useState([]);

    useEffect(() => {
        const getData = async () => {

            try {
                const response = await getCategories();
                console.log(response)

                setCategoryParent(response.data);
            } catch (error) {
                console.log(error);
            };
        }

        getData();
    }, [])

    return categoryParent;
}