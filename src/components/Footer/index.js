import "./Footer.scss";
import { FaYoutube, FaTwitter, FaInstagram, FaFacebook } from "react-icons/fa";
import logo from '../../assets/images/logo.png'

function Footer() {
    return (
        <>
            <div className="footer">
                <div className="footer-inner">
                    <div className="footer__top container">
                        <div className="footer__top-left">
                            <div className="footer__column">
                                <h4 className="footer__column-title">My Account</h4>
                                <ul className="footer__column-menu">
                                    <li className="footer__column-item">Overview</li>
                                    <li className="footer__column-item">Order History</li>
                                    <li className="footer__column-item">Wishlist</li>
                                    <li className="footer__column-item">Account Information</li>
                                </ul>
                            </div>
                            <div className="footer__column">
                                <h4 className="footer__column-title">Store</h4>
                                <ul className="footer__column-menu">
                                    <li className="footer__column-item">Security Notice</li>
                                    <li className="footer__column-item">Location & Hours</li>
                                    <li className="footer__column-item">Rentals</li>
                                    <li className="footer__column-item">Privacy Notice</li>
                                </ul>
                            </div>
                        </div>
                        <div className="footer__top-right">
                            <div className="footer__logo">
                                <img src={logo} alt="login illustration" />
                            </div>

                            <div className="footer__social">
                                <FaYoutube />
                                <FaTwitter />
                                <FaInstagram />
                                <FaFacebook />
                            </div>
                        </div>
                    </div>
                    <div className="footer__bottom">
                        <div className="footer__bottom-content">
                            ©2021 Music Store
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;