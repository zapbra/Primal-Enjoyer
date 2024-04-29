import ArticleLink from "./ArticleLink";
import {useState, useReducer} from "react";

const SavedCollection = ({
                             title,
                             id,
                             articles,
                             removeFromCollectionFunctional,
                             deleteCollectionFunctional,
                         }) => {
    const iteration = 10;
    const [renderCount, setRenderCount] = useState(iteration);
    const renderElems = [];

    const articleElems = articles.map((article, index) => {
        return (
            <ArticleLink
                key={index}
                id={article.id}
                removeFromCollectionFunctional={removeFromCollectionFunctional}
                title={article.title}
            />
        );
    });
    // set visible articles based on iterations of 10
    for (let i = 0; i < renderCount && i < articles.length; i++) {
        renderElems.push(articleElems[i]);
    }

    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const increaseMultiplier = () => {
        setRenderCount((prev) => {
            return prev + 10;
        });
    };
    const increaseIteration = () => {
        setRenderCount((prev) => {
            return prev + iteration;
        });
    };
    return (
        <div>
            <div className="header">
                <div className="flex x-cont">
                    {/*<FontAwesomeIcon*/}
                    {/*    onClick={() => deleteCollectionFunctional(id, title)}*/}
                    {/*    icon={faClose}*/}
                    {/*    className="delete-btn icon-lg hero-icon-med"*/}
                    {/*/>*/}
                </div>
                <h3 className="text-shadow">
                    {title} <span className="light contrast">({articles.length})</span>
                </h3>
            </div>
            <div className="mar-bottom-16">{renderElems}</div>
            {articles.length > renderCount && (
                <div className="center-inline mar-bottom-16">
                    <div onClick={increaseIteration} className="white-btn">
                        <p>Show more</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SavedCollection;
