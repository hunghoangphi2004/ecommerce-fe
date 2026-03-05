import './Header.scss';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { CiShoppingCart, CiUser } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import logo from '../../assets/images/logo.png'
import { logout } from "../../services/client/authService";
import { notifySuccess, notifyError, notifyInfo } from "../../utils/toast";

function Header() {
    const tokenUser = localStorage.getItem("tokenUser");
    const navigate = useNavigate();

    const [isOpenBar, setIsOpenBar] = useState(false);
    const [isOpenUser, setIsOpenUser] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 992) {
                setIsOpenBar(false);
            }
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    }, [])

    let menuItems = [
        { label: "Đàn guitar", path: "/guitars" },
        { label: "Phụ kiện", path: "/accessories" },
        { label: "Bao & giá đỡ", path: "/storage" },
        { label: "Bài học", path: "/lessons" },
        { label: "Sửa chữa", path: "/repairs" },
    ];

    const handleClickBar = (e) => {
        setIsOpenBar(!isOpenBar);
    }

    const handleClickUser = (e) => {
        setIsOpenUser(!isOpenUser);
        if (isOpenBar) {
            setIsOpenBar(!isOpenBar);
        }
    }

    const handleLogout = async (e) => {
        if (!tokenUser) return;
        try {
            const response = await logout();
            notifySuccess(response.message || "Đăng xuất thành công");
        } catch (err) {
            notifyError(err.message);
        } finally {
            localStorage.removeItem("tokenUser");
            localStorage.removeItem("user");
            setIsOpenUser(false);
            navigate("/login")
        }
    }

    return (
        <>
            <div className="header">
                <div className='container header__inner'>
                    <div className='header__logo'>
                        <Link to="/">
                            <img src={logo} alt="Guitar Shop Logo" />
                        </Link>
                    </div>

                    <div className={`header__nav ${isOpenBar ? "active" : ""}`}>
                        <ul>
                            <li>
                                {isOpenBar && (
                                    <div className='header__logo'>
                                        <img src={logo} alt='logo' />
                                    </div>
                                )}
                            </li>
                            {menuItems && menuItems.map((item) => (
                                <li key={item.path}>
                                    <Link to={item.path} target='_self'>{item.label}</Link>
                                </li>
                            ))}
                            <li>
                                {isOpenBar && (
                                    <div className='header__action-single'>Giỏ hàng</div>
                                )}
                            </li>
                            <>
                                {isOpenBar && (
                                    <>
                                        {tokenUser ? (
                                            <>
                                                <li>
                                                    <div className='header__action-single'>
                                                        <Link onClick={handleClickUser} to="/profile">Hồ sơ</Link>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='header__action-single'>
                                                        <Link onClick={handleLogout}>Đăng xuất</Link>
                                                    </div>
                                                </li>
                                            </>
                                        ) : (
                                            <>
                                                <li>
                                                    <div className='header__action-single'>
                                                        <Link onClick={handleClickUser} to="/register">Đăng ký</Link>
                                                    </div>
                                                </li>

                                                <li>
                                                    <div className='header__action-single'>
                                                        <Link onClick={handleClickUser} to="/login">Đăng nhập</Link>
                                                    </div>
                                                </li>
                                            </>
                                        )}
                                    </>
                                )}
                            </>
                            <li>
                                {isOpenBar && (
                                    <div className="header__close" onClick={() => setIsOpenBar(false)}>
                                        <FaTimes />
                                    </div>
                                )}
                            </li>
                        </ul>

                    </div>

                    <div className='header__nav-mobi' onClick={handleClickBar}>
                        <FaBars />
                    </div>

                    <div className={`header__actions ${isOpenBar ? "active" : ""}`} >
                        <div><CiShoppingCart /> </div>
                        <div className={`header__user ${isOpenUser ? "active" : ""}`} >
                            {< CiUser onClick={handleClickUser} />}

                            {isOpenUser && (
                                <>
                                    {tokenUser ? (
                                        <>
                                            <div className="header__dropdown">
                                                <Link onClick={handleClickUser} to="/profile">Hồ sơ</Link>
                                                <button onClick={handleLogout}>Đăng xuất</button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="header__dropdown">
                                                <Link onClick={handleClickUser} to="/login">Đăng nhập</Link>
                                                <Link onClick={handleClickUser} to="/register">Đăng ký</Link>
                                            </div>
                                        </>
                                    )}

                                </>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header;