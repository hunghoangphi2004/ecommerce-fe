import "./Category.scss";
import { Tag, Skeleton } from 'antd';
import TableCustom from "../../../components/TableCustom";
import FilterStatus from "../../../components/FilterStatus";
import FilterCategory from "../../../components/FilterCategory";
import ActionButton from "../../../components/ActionButton";
import { useOutletContext } from "react-router-dom";
import { useCategory } from "../../../hooks/useCategory";
import { categoryColumns } from "../../../constants/categoryColumn";
import { deleteCategory, changeStatusCategory } from "../../../services/admin/categoryService";
import { useCategoryParent } from "../../../hooks/useCategoryParent";
import { notifySuccess, notifyError, notifyInfo } from "../../../utils/toast";

function Category() {
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
    };

    const categoryParent = useCategoryParent();

    const { search } = useOutletContext();

    const { categories, loading, pagination, query, updateQuery, setRefresh } = useCategory(search)

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

    const handleDeleteCategory = async (id) => {
        try {
            const response = await deleteCategory(id);
            notifySuccess("Xoá danh mục thành công!");
            setRefresh(prev => prev + 1);

        } catch (error) {
            console.log(error)
            notifyError(error.message)
        }
    }

    const handleChangeStatus = async (id) => {
        try {
            const response = await changeStatusCategory(id);
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
                </div>
                <div className="create-button">
                    <ActionButton path="/admin/categories/create" text="Thêm" color="default" />
                </div>
            </div>
            <div>
                {loading ? (<>
                    <Skeleton active paragraph={{ rows: 15 }} />
                </>)
                    : (<>
                        <TableCustom
                            rowSelection={rowSelection}
                            columns={categoryColumns(handleDeleteCategory, handleChangeStatus, categoryParent)}
                            data={categories}
                            pagination={pagination}
                            onChange={handleChangePagination}
                        />
                    </>)}

            </div>
        </>
    )
}

export default Category;