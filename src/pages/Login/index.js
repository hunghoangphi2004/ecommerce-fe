import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { login } from "../../services/client/authService";
import { notifySuccess, notifyError, notifyInfo } from "../../utils/toast";
import loginImage from '../../assets/images/login.png';
import CustomButton from "../../components/CustomButton";
import "./Login.scss";

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
            <Helmet>
                <title>Đăng nhập</title>
                <meta name="description" content="Đăng nhập" />
            </Helmet>
            <div className="login">
                <div className="login__image">

                </div>
                <div className="login__content container">
                    <div className="login__content-inner">
                        <div className="login__left">
                            <h1 className="login__title">
                                Chào mừng quay trở lại
                            </h1>

                            <p className="login__sub-title">Đăng nhập để tiếp tục khám phá <br />không gian âm nhạc</p>

                            <form className="login__form" onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control login__input"
                                        value={email}
                                        onChange={handleChangeEmail}
                                        placeholder="Nhập email của bạn"
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        ref={passwordRef}
                                        type="password"
                                        name="password"
                                        className="form-control login__input"
                                        placeholder="Nhập mật khẩu của bạn"
                                        value={password}
                                        onChange={handleChangePassword}
                                    />
                                </div>
                                <div className="login__password">
                                    <a href="/register" target="_self">Quên mật khẩu?</a>
                                </div>

                                <div className="d-grid d-flex mt-4">
                                    <CustomButton type="submit"
                                        className="custom__button"
                                        loading={loading}
                                    >Đăng nhập
                                    </CustomButton>
                                </div>
                            </form>

                            <div className="login__signup">
                                Chưa có tài khoản? <a href="/register" target="_self">Đăng ký</a>
                            </div>
                        </div>

                        <div className="login__right">
                            <img src={loginImage} alt="login illustration" />
                        </div>
                    </div>
                </div >
            </div >
        </>
    )
}

export default Login