import {
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
    Row,
    Col,
    Card,
    Switch,
    Button,
    Modal
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Edit.scss";
import { useState, useEffect } from "react";
import { getProduct, updateProduct } from "../../../services/admin/productService";
import { useParams } from "react-router-dom";
import { useCategoryParent } from "../../../hooks/useCategoryParent";
import { notifySuccess, notifyError, notifyInfo } from "../../../utils/toast";
const { TextArea } = Input;

function EditProduct() {

    const { id } = useParams();
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const categoryParent = useCategoryParent();

    const handlePreview = async (file) => {
        const src = file.url || file.thumbUrl || URL.createObjectURL(file.originFileObj);
        setPreviewImage(src);
        setPreviewOpen(true);
    };

    useEffect(() => {

        const getData = async () => {

            try {
                const product = await getProduct(id);
                form.setFieldsValue({
                    ...product,
                    category_id: Number(product.category_id) || null,
                    thumbnail: product.thumbnail
                        ? [{
                            uid: "-1",
                            name: "thumbnail",
                            status: "done",
                            url: product.thumbnail
                        }]
                        : []
                });

            } catch (error) {
                console.log("ERROR:", error);
            }

        };

        if (categoryParent.length) {
            getData();
        }

    }, [id, form, categoryParent]);

    const onFinish = async (values) => {

        try {

            const formData = new FormData();

            formData.append("title", values.title);
            formData.append("category_id", values.category_id);
            formData.append("description", values.description || "");
            formData.append("price", values.price);
            formData.append("discount_percentage", values.discount_percentage || 0);
            formData.append("stock", values.stock);
            formData.append("is_featured", values.is_featured ? 1 : 0);

            if (values.position !== undefined) {
                formData.append("position", values.position);
            }

            if (values.thumbnail?.length) {
                const file = values.thumbnail[0];

                if (file.originFileObj) {
                    formData.append("thumbnail", file.originFileObj);
                }
            }

            const response = await updateProduct(id, formData);
            notifySuccess("Cập nhật sản phẩm thành công.")

            console.log(response);

        } catch (error) {
            notifyError("Có lỗi xảy ra khi cập nhật sản phẩm, vui lòng thử lại.")
            console.log("ERROR:", error);

        }

    };

    return (
        <Card title="Chỉnh sửa sản phẩm" style={{ maxWidth: 900, margin: "0 auto" }}>
            <Form
                layout="vertical"
                form={form}
                variant="underlined"
                onFinish={onFinish}
            >
                <Row gutter={24}>

                    <Col span={12}>
                        <Form.Item label="Tên sản phẩm" name="title">
                            <Input placeholder="Nhập tên sản phẩm" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Danh mục" name="category_id">
                            <Select
                                placeholder="Chọn danh mục"
                                allowClear
                                options={categoryParent.map(item => ({
                                    label: item.title,
                                    value: item.id
                                }))}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={24}>
                        <Form.Item label="Mô tả" name="description">
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Giá" name="price">
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Giảm giá (%)" name="discount_percentage">
                            <InputNumber style={{ width: "100%" }} min={0} max={100} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Số lượng" name="stock">
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Vị trí" name="position">
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Ảnh thumbnail"
                            name="thumbnail"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => e?.fileList}
                        >
                            <Upload
                                listType="picture-card"
                                maxCount={1}
                                beforeUpload={() => false}
                                onPreview={handlePreview}
                            >
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            </Upload>
                        </Form.Item>
                    </Col>

                    <Modal
                        open={previewOpen}
                        footer={null}
                        onCancel={() => setPreviewOpen(false)}
                    >
                        <img
                            alt="preview"
                            style={{ width: "100%" }}
                            src={previewImage}
                        />
                    </Modal>

                    <Col span={12}>
                        <Form.Item
                            label="Nổi bật"
                            name="is_featured"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>

                </Row>

                <Form.Item style={{ marginTop: 20 }}>
                    <Button type="primary" size="large" htmlType="submit">
                        Cập nhật sản phẩm
                    </Button>
                </Form.Item>

            </Form>
        </Card>
    );
}

export default EditProduct;