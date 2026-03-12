import "./Product.scss";
import { useState, useEffect } from "react";
import { Tag, Skeleton } from 'antd';
import TableCustom from "../../../components/TableCustom";
import FilterStatus from "../../../components/FilterStatus";
import FilterCategory from "../../../components/FilterCategory";
import ActionButton from "../../../components/ActionButton";
import { useOutletContext } from "react-router-dom";
import { useProduct } from "../../../hooks/useProduct";
import { productColumns } from "../../../constants/productColumns";
import { deleteProduct, changeStatusProduct } from "../../../services/admin/productService";
import { notifySuccess, notifyError, notifyInfo } from "../../../utils/toast";

function Product() {
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };

    const { search } = useOutletContext();

    const { products, loading, pagination, query, updateQuery, setRefresh } = useProduct(search)

    const handleChangePagination = (pagination) => {
        updateQuery({
            page: pagination.current,
            limit: pagination.pageSize
        })
    };

    const handleStatusFilter = (value) => {
        updateQuery({
            status: value || "",
            page: 1
        })
    };

    const handleCategoryFilter = (value) => {
        updateQuery({
            category_id: value || "",
            page: 1
        })
    };

    const handleDeleteProduct = async (id) => {
        try {
            const response = await deleteProduct(id);
            notifySuccess("Xoá sản phẩm thành công!");
            console.log(response);
            setRefresh(prev => prev + 1);

        } catch (error) {
            notifyError("Có lỗi xảy khi xoá sản phẩm. Vui lòng thử lại.")
        }
    }

    const handleChangeStatus = async (id) => {
        try {
            const response = await changeStatusProduct(id);
            console.log(response);
            setRefresh(prev => prev + 1);

        } catch (error) {
            console.log(error)
        }
    };

    return (
        <>
            <div className="filter-header">
                <div className="filter-wrapper">
                    <div className="filter-item">
                        <span>Trạng thái:</span>
                        <FilterStatus
                            value={query.status}
                            onChange={handleStatusFilter}
                        />
                    </div>

                    <div className="filter-item">
                        <span>Danh mục:</span>
                        <FilterCategory
                            value={query.category_id}
                            onChange={handleCategoryFilter}
                        />
                    </div>

                    <div className="filter-item">
                        <span>Branch:</span>
                        <FilterCategory
                            value={query.category_id}
                            onChange={handleCategoryFilter}
                        />
                    </div>
                </div>
                <div className="create-button">
                    <ActionButton path="/admin/products/create" text="Thêm" color="default" />
                </div>
            </div>
            <div>
                {loading ? (<>
                    <Skeleton active paragraph={{ rows: 15 }} />
                </>)
                    : (<>
                        <TableCustom
                            rowSelection={rowSelection}
                            columns={productColumns(handleDeleteProduct, handleChangeStatus)}
                            data={products}
                            pagination={pagination}
                            onChange={handleChangePagination}
                        />
                    </>)}

            </div>
        </>
    )
}

export default Product;