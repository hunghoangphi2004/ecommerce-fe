import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/client/authService";
import { notifySuccess, notifyError, notifyInfo } from "../../utils/toast";


function Login() {
    const navigate = useNavigate();
    const passwordRef = useRef(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(email, password);

        try {
            setLoading(true);
            const data = await login(email, password);
            if (data.tokenUser) {
                localStorage.setItem('tokenUser', data.tokenUser);
                localStorage.setItem('user', JSON.stringify(data.user));
                notifySuccess("Đăng nhập thành công");
                navigate("/");
            }
        } catch (err) {
            notifyError(err.message);
            setPassword("");
            passwordRef.current.focus();
        } finally {
            setLoading(false)
        }
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }


    return (
        <>
            <div>
                <h2>Login</h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email: </label>
                        <input type="email" name="email" className="form-control" id="email" value={email} onChange={handleChangeEmail} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Mật khẩu: </label>
                        <input ref={passwordRef} type="password" name="password" className="form-control" id="password" value={password} onChange={handleChangePassword} />
                    </div>

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Đang xử lý...
                                </>
                            ) : (
                                <> Đăng nhập </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login