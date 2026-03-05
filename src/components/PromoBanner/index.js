import "./PromoBanner.scss";
import bannerLarge from "../../assets/images/banner-large.png";
import bannerExpanded from "../../assets/images/banner-expanded.png";
import bannerCompact from "../../assets/images/banner-compact.png";
import { useNavigate } from "react-router-dom";

function PromoBanner() {
    const navigate = useNavigate();

    return (
        <div className="banner">
            <div
                className="banner__image container"
                onClick={() => navigate("/lessons")}
            >
                <picture>
                    <source media="(max-width:576px)" srcSet={bannerCompact}/>
                    <source media="(max-width:992px)" srcSet={bannerExpanded}/>
                    <img src={bannerLarge} alt="Banner"/>
                </picture>
            </div>
        </div>
    );
}

export default PromoBanner;