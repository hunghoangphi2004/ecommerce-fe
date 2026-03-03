import { useState } from "react";
import { register } from "../../services/client/authService";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError, notifyInfo } from "../../utils/toast";

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
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "500px" }}>

                <h3 className="text-center mb-4">Đăng ký tài khoản</h3>

                <form onSubmit={handleSubmit}>
                    {/* Name */}
                    <div className="mb-3">
                        <label className="form-label">Tên</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Nhập tên của bạn"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            value={form.email}
                            placeholder="Nhập email"
                            onChange={handleChange}
                            
                        />
                    </div>

                    {/* Phone */}
                    <div className="mb-3">
                        <label className="form-label">Số điện thoại</label>
                        <input
                            type="text"
                            name="phone"
                            className="form-control"
                            placeholder="Nhập số điện thoại"
                            value={form.phone}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-3">
                        <label className="form-label">Mật khẩu</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={form.password}
                            placeholder="Nhập mật khẩu"
                            onChange={handleChange}
                            
                        />
                    </div>

                    {/* Confirm Password */}
                    <div className="mb-3">
                        <label className="form-label">Nhập lại mật khẩu</label>
                        <input
                            type="password"
                            name="password_confirmation"
                            className="form-control"
                            placeholder="Nhập lại mật khẩu"
                            value={form.password_confirmation}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Avatar */}
                    <div className="mb-3">
                        <label className="form-label">Ảnh đại diện</label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleFileChange}

                        />
                    </div>

                    {/* Button */}
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2"></span>
                                    Đang xử lý...
                                </>
                            ) : (
                                <> Đăng ký </>
                            )}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default Register;