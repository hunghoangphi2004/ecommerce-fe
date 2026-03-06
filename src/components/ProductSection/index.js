import "./ProductSection.scss";
import logoImage from '../../assets/images/login.png';
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function ProductSession(props) {
    const { title, products, background, className } = props;

    return (
        <>
            {products ? (
                <>
                    <div className={className} style={{ background }}>
                        <div className="product-section">
                            <div className="product-section__inner container">
                                <div className="product-section__title">
                                    <h4>{title}</h4>
                                </div>

                                <div className="product-section__content">

                                    {/* Desktop swiper */}
                                    <div className="desktop-swiper">
                                        <Swiper
                                            spaceBetween={40}
                                            slidesPerView={3}
                                        >
                                            {products.map((product) => (
                                                <SwiperSlide key={product.id}>
                                                    <div className="product-section__box">
                                                        <div className="product-section__image">
                                                            <img src={product.thumbnail} />
                                                        </div>

                                                        <div className="product-section__info">
                                                            <div className="product-section__info-left">
                                                                <Link to="#" className="product-section__branch">
                                                                    Branch Name
                                                                </Link>
                                                                <Link to="#" className="product-section__desc">
                                                                    Product description here
                                                                </Link>
                                                            </div>

                                                            <div className="product-section__info-right">
                                                                <span className="product-section__price">
                                                                    VNĐ {Number(product.price).toLocaleString("vi-VN")}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <div className="product-section__quantity">
                                                            <span className="product-section__quantity-button"> {product.stock} có sẵn</span>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </div>

                                    {/* Mobile grid */}
                                    <div className="mobile-grid row">
                                        {products.map((product) => (
                                            <div
                                                key={product.id}
                                                className="col-xl-12 col-lg-6 col-md-6 col-sm-12 col-xs-12"
                                            >
                                                <div className="product-section__box">
                                                    <div className="product-section__image">
                                                        <img src={product.thumbnail} />
                                                    </div>

                                                    <div className="product-section__info">
                                                        <div className="product-section__info-left">
                                                            <Link to="#" className="product-section__branch">
                                                                Branch Name
                                                            </Link>
                                                            <Link to="#" className="product-section__desc">
                                                                Product description here
                                                            </Link>
                                                        </div>

                                                        <div className="product-section__info-right">
                                                            <span className="product-section__price">
                                                                VNĐ {Number(product.price).toLocaleString("vi-VN")}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="product-section__quantity">
                                                        <span className="product-section__quantity-button"> {product.stock} có sẵn</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>

                </>
            )}

        </>
    )
}

export default ProductSession;