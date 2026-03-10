import { Tag, Popconfirm, Button } from "antd";
import { Link } from "react-router-dom";
import ActionButton from "../components/ActionButton";

export const productColumns = (handleDelete, handleChangeStatus) => [
  {
    title: "Ảnh",
    dataIndex: "thumbnail",
    render: (img) =>
      img ? (
        <img src={img} width={60} alt="product" />
      ) : (
        "No Image"
      ),
  },
  {
    title: "Tên sản phẩm",
    dataIndex: "title",
  },
  {
    title: "Giá",
    dataIndex: "price",
    render: (price) => Number(price).toLocaleString() + " đ",
  },
  {
    title: "Giảm giá",
    dataIndex: "discount_percentage",
    render: (discount) => Number(discount).toLocaleString() + " %",
  },
  {
    title: "Số lượng",
    dataIndex: "stock",
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    render: (status, record) => (
      <Popconfirm
        title="Bạn có chắc muốn thay đổi trạng thái?"
        onConfirm={() => handleChangeStatus(record.id)}
        okText="Đồng ý"
        cancelText="Hủy"
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
          path={`/admin/products/detail/${record.id}`}
          text="Xem"
          color="default"
        />

        <ActionButton
          path={`/admin/products/edit/${record.id}`}
          text="Sửa"
          color="primary"
        />

        <Popconfirm
          title="Xóa sản phẩm?"
          onConfirm={() => handleDelete(record.id)}
        >
          <Button danger> Xóa </Button>
        </Popconfirm>
      </div>
    )
  }
];