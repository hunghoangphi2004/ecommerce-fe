import { useState, useEffect } from "react";
import { getProducts } from "../services/admin/productService";
import { useSearchParams } from "react-router-dom";

export const useProduct = (search) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const cleanParams = (params) => {
        return Object.fromEntries(
            Object.entries(params).filter(([_, value]) => value !== "" && value !== undefined)
        );
    };

    const query = {
        page: Number(searchParams.get("page")) || 1,
        limit: Number(searchParams.get("limit")) || 4,
        search: searchParams.get("search") || "",
        status: searchParams.get("status") || "",
        category_id: searchParams.get("category_id") || ""
    };

    const [pagination, setPagination] = useState({
        current: query.page,
        pageSize: query.limit,
        total: 0
    });

    const updateQuery = (newData) => {
        const updated = {
            ...query,
            ...newData
        };

        const cleaned = cleanParams(updated);

        setSearchParams(new URLSearchParams(cleaned));
    }

    useEffect(() => {
        if (search !== query.search) {
            updateQuery({
                search: search,
                page: 1
            });
        }
    }, [search]);

    useEffect(() => {
        const getData = async () => {

            setLoading(true);

            try {
                const response = await getProducts(query);
                console.log(response)

                setProducts(response.data);

                setPagination({
                    current: response.pagination.currentPage,
                    pageSize: response.pagination.perPage,
                    total: response.pagination.totalItems
                });
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [searchParams, refresh])

    return {
        products,
        loading,
        pagination,
        query,
        updateQuery,
        setRefresh
    };
};