import "./Profile.scss";
import { useState } from "react";
import CustomButton from "../../components/CustomButton";

function Profile() {
    const [loading, setLoading] = useState(false);
    const user = JSON.parse(localStorage.getItem("user"));  
    const { name, email, avatar, phone } = user;

    return (
        <>
            <div className="profile">
                <div className="profile__inner container">
                    <div className="profile__content">

                        <div className="profile__header">
                            <div className="profile__avatar">
                                <img src={avatar} alt="avatar" />
                            </div>

                            <div className="profile__basic">
                                <h2 className="profile__name">{name}</h2>
                                <p className="profile__email">{email}</p>
                            </div>
                        </div>

                        <div className="profile__body">

                            <div className="profile__info">
                                <h3 className="profile__title">Thông tin cá nhân</h3>

                                <div className="profile__item">
                                    <span>Họ tên</span>
                                    <p>{name}</p>
                                </div>

                                <div className="profile__item">
                                    <span>Email</span>
                                    <p>{email}</p>
                                </div>

                                <div className="profile__item">
                                    <span>Số điện thoại</span>
                                    <p>{phone}</p>
                                </div>

                                <div className="profile__item">
                                    <span>Địa chỉ</span>
                                    <p>TP Hồ Chí Minh</p>
                                </div>

                            </div>

                            <div className="profile__actions">
                                <CustomButton type="submit"
                                    className="custom__button"
                                    loading={loading}
                                >Chỉnh sửa
                                </CustomButton>
                                <CustomButton type="submit"
                                    className="custom__button"
                                    loading={loading}
                                >Đổi mật khẩu
                                </CustomButton>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile;