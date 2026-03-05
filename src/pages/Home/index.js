import { Helmet } from "react-helmet-async";
import Hero from "../../components/Hero";
import PromoBanner from "../../components/PromoBanner";
import ProductSession from "../../components/ProductSection";

function Home() {
    return (
        <>
            <Helmet>
                <title>Trang chủ</title>
                <meta name="description" content="Cửa hàng bán đàn guitar chất lượng cao" />
            </Helmet>
            <Hero/>
            <PromoBanner/>
            <ProductSession title="New Products"/>
            <ProductSession title="Popular Finds"/>
        </>
    )
}

export default Home;