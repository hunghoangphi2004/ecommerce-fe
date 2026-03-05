import { useState } from "react";
import { register } from "../../services/client/authService";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError, notifyInfo } from "../../utils/toast";
import { Helmet } from "react-helmet-async";
import "./Register.scss"
import registerImage from '../../assets/images/register.png';
import CustomButton from "../../components/CustomButton";

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: ""
    })
    const [avatar, setAvatar] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleFileChange = (e) => {
        setAvatar(e.target.files[0])
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return;

        try {
            setLoading(true);

            const data = await register(form, avatar);
            if (data.tokenUser) {
                localStorage.setItem('tokenUser', data.tokenUser);
                localStorage.setItem('user', JSON.stringify(data.user));
                notifySuccess("Đăng ký thành công");
                navigate("/");
            }
        } catch (err) {
            console.log("Status:", err.status);
            console.log("Data:", err.data);
            notifyError(err.message)
        } finally {
            setLoading(false)
        }
    }


    return (
        <>
            <Helmet>
                <title>Đăng ký</title>
                <meta name="description" content="Đăng ký" />
            </Helmet>
            <div className="register">
                <div className="register__image">

                </div>

                <div className="register__content container">
                    <div className="register__content-inner">
                        <div className="register__left">
                            <h3 className="register__title mb-4">
                                Đăng ký
                            </h3>

                            <form onSubmit={handleSubmit}>
                                {/* Name */}
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="name"
                                        className="form-control register__input"
                                        placeholder="Nhập tên của bạn"
                                        value={form.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="mb-3">
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control register__input"
                                        value={form.email}
                                        placeholder="Nhập email"
                                        onChange={handleChange}

                                    />
                                </div>

                                {/* Phone */}
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        name="phone"
                                        className="form-control register__input"
                                        placeholder="Nhập số điện thoại"
                                        value={form.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Password */}
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control register__input"
                                        value={form.password}
                                        placeholder="Nhập mật khẩu"
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div className="mb-3">
                                    <input
                                        type="password"
                                        name="password_confirmation"
                                        className="form-control register__input"
                                        placeholder="Nhập lại mật khẩu"
                                        value={form.password_confirmation}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Avatar */}
                                <div className="mb-3">
                                    <input
                                        type="file"
                                        className="form-control register__input"
                                        accept="image/*"
                                        onChange={handleFileChange}

                                    />
                                </div>

                                {/* Button */}
                                <div className="d-grid mt-4">
                                    <CustomButton type="submit"
                                        className="custom__button"
                                        loading={loading}
                                    >Đăng ký
                                    </CustomButton>
                                    {/* <button type="submit" className="btn btn-primary" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2"></span>
                                            Đang xử lý...
                                        </>
                                    ) : (
                                        <> Đăng ký </>
                                    )}
                                </button> */}
                                </div>

                                <div className="register__signup">
                                    Đã có tài khoản? <a href="/login" target="_self">Đăng nhập</a>
                                </div>
                            </form>
                        </div>

                        <div className="register__right">
                            <img src={registerImage} alt="register illustration" />
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Register;