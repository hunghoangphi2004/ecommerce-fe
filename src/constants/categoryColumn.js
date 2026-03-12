import { Tag, Popconfirm, Button } from "antd";
import { Link } from "react-router-dom";
import ActionButton from "../components/ActionButton";

export const categoryColumns = (
    handleDelete,
    handleChangeStatus,
    categories
) => [
        {
            title: "Ảnh",
            dataIndex: "thumbnail",
            render: (img) =>
                img ? <img src={img} width={60} alt="category" /> : "No Image",
        },
        {
            title: "Tên danh mục",
            dataIndex: "title",
        },
        {
            title: "Danh mục cha",
            dataIndex: "parent_id",
            render: (parentId) => {
                if (!parentId) return "Không có";

                const parent = categories.find((c) => c.id === parentId);
                return parent ? parent.title : "Không xác định";
            },
        },
        {
            title: "Mô tả",
            dataIndex: "description",
        },
        {
            title: "Vị trí",
            dataIndex: "position",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            render: (status, record) => (
                <Popconfirm
                    title="Bạn có chắc muốn thay đổi trạng thái?"
                    onConfirm={() => handleChangeStatus(record.id)}
                >
                    {status ? (
                        <Tag color="green" style={{ cursor: "pointer" }}>
                            Đang hoạt động
                        </Tag>
                    ) : (
                        <Tag color="red" style={{ cursor: "pointer" }}>
                            Ngừng hoạt động
                        </Tag>
                    )}
                </Popconfirm>
            ),
        },
        {
            title: "Thao tác",
            render: (_, record) => (
                <div className="table-actions">
                    <ActionButton
                        path={`/admin/categories/detail/${record.id}`}
                        text="Xem"
                    />

                    <ActionButton
                        path={`/admin/categories/edit/${record.id}`}
                        text="Sửa"
                        color="primary"
                    />

                    <Popconfirm
                        title="Xóa danh mục?"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Button danger>Xóa</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];