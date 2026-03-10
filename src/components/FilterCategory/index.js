import { Select } from "antd";
import { useState, useEffect } from "react";
import { getCategories } from "../../services/admin/categoryService";

function FilterCategory({ value, onChange }) {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getData = async () => {

            try {
                const response = await getCategories();
                setCategories(response.data);
            } finally {
            }
        }

        getData();
    }, []);

    const categoriesOptions = [
        {
            value: "",
            label: "Tất cả"
        },
        ...categories.map((item) => ({
            value: String(item.id),
            label: item.title
        }))
    ];
    
    return (
        <>
            <Select
                style={{ width: 200 }}
                placeholder="Lọc danh mục"
                value={value}
                onChange={onChange}
                options={categoriesOptions}
                allowClear
            />
        </>
    );
}

export default FilterCategory;