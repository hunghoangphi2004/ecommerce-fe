import "./ProductSection.scss"

function ProductSession(props) {
    const { title } = props;

    return (
        <>
            <div className="product-section">
                <div className="product-section__inner container">
                    <div className="product-section__title">
                        <h4>{title}</h4>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductSession;