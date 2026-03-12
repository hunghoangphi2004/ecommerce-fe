import {
    Form,
    Input,
    InputNumber,
    Select,
    Upload,
    Button,
    Switch,
    Row,
    Col,
    Card,
    Modal
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    getCategory,
    updateCategory,
} from "../../../services/admin/categoryService";
import { useCategoryParent } from "../../../hooks/useCategoryParent";
import { notifySuccess, notifyError, notifyInfo } from "../../../utils/toast";

const { TextArea } = Input;

function EditCategory() {

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
                const category = await getCategory(id);

                form.setFieldsValue({
                    ...category,
                    parent_id: category.parent_id || null,
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
                console.log(error);
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
            formData.append("description", values.description || "");
            formData.append("parent_id", values.parent_id || "");
            formData.append("status", values.status ? 1 : 0);

            if (values.position !== undefined) {
                formData.append("position", values.position);
            }

            if (values.thumbnail?.length) {
                const file = values.thumbnail[0];

                if (file.originFileObj) {
                    formData.append("thumbnail", file.originFileObj);
                }
            }

            const response = await updateCategory(id, formData);
             notifySuccess("Sửa danh mục thành công")
        } catch (error) {
            notifySuccess("Có lỗi xảy khi cập nhật danh mục. Vui lòng thử lại.")
            console.log("ERROR:", error);
        }

    };

    return (
        <Card title="Chỉnh sửa danh mục" style={{ maxWidth: 900, margin: "0 auto" }}>
            <Form
                layout="vertical"
                form={form}
                variant="underlined"
                onFinish={onFinish}
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

                </Row>

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

                <Form.Item style={{ marginTop: 20 }}>
                    <Button type="primary" size="large" htmlType="submit">
                        Cập nhật danh mục
                    </Button>
                </Form.Item>

            </Form>
        </Card>
    );
}

export default EditCategory;