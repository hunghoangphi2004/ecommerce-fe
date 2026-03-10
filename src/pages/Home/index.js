import { Helmet } from "react-helmet-async";
import Hero from "../../components/Hero";
import PromoBanner from "../../components/PromoBanner";
import ProductSession from "../../components/ProductSection";
import Article from "../../components/Article";
import { getHome } from "../../services/client/homeService";
import { useState, useEffect } from "react";

function Home() {

    const [latestProduct, setLatestProduct] = useState([]);
    useEffect(() => {
        const getData = async () => {
            const response = await getHome();
            setLatestProduct(response.latestProduct)
        }

        getData();
    }, [])

    return (
        <>
            <Helmet>
                <title>Trang chủ</title>
                <meta name="description" content="Cửa hàng bán đàn guitar chất lượng cao" />
            </Helmet>
            <Hero />
            <PromoBanner />
            <ProductSession title="Sản Phẩm Mới" products={latestProduct} className="new-product" />
            <ProductSession title="Sản Phẩm Nổi Bật" products={latestProduct} background="#ECECEC" className="featured-product" />
            <Article title="Bài Viết" articles={latestProduct}/>
        </>
    )
}

export default Home;