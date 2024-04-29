import React from "react";
import Article from "./Article";


const ArticlesSection = ({articles}) => {
    const articleElems = articles.map((article, index) => {
        return (
            <Article
                title={article.title}
                year={article.year}
                content={article.content}
                key={index}
                index={index}
            />
        );
    });
    return <div>{articleElems}</div>;
};

export default ArticlesSection;
