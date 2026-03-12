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
import { getCategory } from "../../../services/admin/categoryService";
import { useParams } from "react-router-dom";
import { useCategoryParent } from "../../../hooks/useCategoryParent";

const { TextArea } = Input;

function DetailCategory() {

    const { id } = useParams();
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const categoryParent = useCategoryParent();

    const handlePreview = async (file) => {
        const src = file.url || file.thumbUrl;
        setPreviewImage(src);
        setPreviewOpen(true);
    };

    useEffect(() => {

        const getData = async () => {

            try {
                const category = await getCategory(id);
                console.log(category)

                form.setFieldsValue({
                    ...category,
                    thumbnail: category.thumbnail
                        ? [
                            {
                                uid: "-1",
                                name: "thumbnail",
                                status: "done",
                                url: category.thumbnail
                            }
                        ]
                        : []
                });

            } catch (error) {
                console.log("ERROR:", error);
            }

        };

        getData();

    }, [id, form]);

    return (
        <Card title="Chi tiết danh mục" style={{ maxWidth: 900, margin: "0 auto" }}>
            <Form
                layout="vertical"
                form={form}
                variant="underlined"
                disabled
            >

                <Row gutter={24}>

                    <Col span={12}>
                        <Form.Item label="Tên danh mục" name="title">
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Danh mục cha" name="parent_id">
                            <Select
                                allowClear
                                options={categoryParent.map((item) => ({
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
                        <Form.Item label="Vị trí" name="position">
                            <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Trạng thái"
                            name="status"
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item
                            label="Ảnh thumbnail"
                            name="thumbnail"
                            valuePropName="fileList"
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

                </Row>

            </Form>
        </Card>
    );
}

export default DetailCategory;