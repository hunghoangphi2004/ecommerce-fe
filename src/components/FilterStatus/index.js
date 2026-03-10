import { Select } from "antd";
import { statusOptions } from "../../constants/filterOptions";

function FilterStatus({ value, onChange }) {
    return (
        <>
            <Select
                style={{ width: 200 }}
                placeholder="Lọc trạng thái"
                value={value}
                onChange={onChange}
                options={statusOptions}
                allowClear
            />
        </>
    );
}

export default FilterStatus;