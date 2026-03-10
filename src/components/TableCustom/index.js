import { Table, Pagination, Select } from "antd";
import './TableCustom.scss'

function TableCustom(props) {
    const { data, columns, rowSelection, pagination, onChange } = props;

    return (
        <>
            <Table
                className='table-custom'
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={false}
                rowKey="id"
                locale={{ emptyText: "Không có sản phẩm" }}
            />

            {pagination && (
                <div className="table-footer">

                    <div className="table-left">
                        <div className="table-total">
                            Hiển thị {(pagination.current - 1) * pagination.pageSize + 1}
                            -
                            {Math.min(pagination.current * pagination.pageSize, pagination.total)}{" "}
                            trên {pagination.total} sản phẩm
                        </div>

                        <Select
                            value={pagination.pageSize}
                            style={{ width: 120 }}
                            onChange={(value) =>
                                onChange({
                                    current: 1,
                                    pageSize: value
                                })
                            }
                        >
                            {[4,10,20,50].map(size => (
                                <Select.Option key={size} value={size}>
                                    {size} / trang
                                </Select.Option>
                            ))}
                        </Select>
                    </div>

                    <Pagination
                        current={pagination.current}
                        pageSize={pagination.pageSize}
                        total={pagination.total}
                        onChange={(page) =>
                            onChange({
                                current: page,
                                pageSize: pagination.pageSize
                            })
                        }
                    />

                </div>
            )}
        </>
    )
}

export default TableCustom;