import "./Artical.scss";

function Article(props) {
    const { title, articles } = props;

    return (
        <>
            {articles ?
                (
                    <>
                        <div className="article">
                            <div className="article__title">
                                <h4>{title}</h4>
                            </div>
                            <div className="article__grid container">
                                {articles.slice(0, 5).map((item, index) => (
                                    <div
                                        className={`article__card article__item-${index + 1}`}
                                        key={item.id}
                                    >
                                        <img src={item.thumbnail} />

                                        <div className="article__overlay">
                                            <h4>{item.title}</h4>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )
                :
                (
                    <>

                    </>
                )}
        </>
    )
}

export default Article;

