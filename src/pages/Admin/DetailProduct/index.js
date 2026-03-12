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
    Modal
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Detail.scss";
import { useState, useEffect } from "react";
import { getProduct } from "../../../services/admin/productService";
import { useParams } from "react-router-dom";
import { getCategories } from "../../../services/admin/categoryService";

const { TextArea } = Input;

function DetailProduct() {

    const { id } = useParams();
    const [form] = Form.useForm();

    const [categories, setCategories] = useState([]);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");

    const handlePreview = async (file) => {
        const src = file.url || file.thumbUrl;
        setPreviewImage(src);
        setPreviewOpen(true);
    };

    useEffect(() => {

        const getData = async () => {

            try {

                const categoryResponse = await getCategories();
                setCategories(categoryResponse.data);

                const product = await getProduct(id);

                form.setFieldsValue({
                    ...product,
                    thumbnail: [
                        {
                            uid: "-1",
                            name: "thumbnail",
                            status: "done",
                            url: product.thumbnail
                        }
                    ]
                });

            } catch (error) {
                console.log("ERROR:", error);
            }

        };

        getData();

    }, [id, form]);

    return (
        <Card title="Chi tiết sản phẩm" style={{ maxWidth: 900, margin: "0 auto" }}>
            <Form
                layout="vertical"
                form={form}
                variant="underlined"
                disabled
            >
                <Row gutter={24}>

                    <Col span={12}>
                        <Form.Item label="Tên sản phẩm" name="title">
                            <Input placeholder="Tên sản phẩm" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Danh mục" name="category_id">
                            <Select
                                options={categories.map((item) => ({
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
                            <InputNumber
                                style={{ width: "100%" }}
                                min={0}
                                max={100}
                            />
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
            </Form>
        </Card>
    );
}

export default DetailProduct;