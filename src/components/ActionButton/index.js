import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";

function ActionButton(props) {
    const navigate = useNavigate();
    const { path, text, color } = props;
    return (
        <>
            <Button color={color} variant="outlined" onClick={() => navigate(path)}>
                {text}
            </Button>
        </>
    )
}
export default ActionButton;