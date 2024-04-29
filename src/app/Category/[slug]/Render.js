"use client";
import COLORS from "../../../../data/colors";
import ArticleSection from "../components/ArticleSection";
import {UpperCase} from "../../../../utils/Functions";


const Render = ({sortedArticles, aajonusCatagory}) => {
    return (
        <Cont colors={COLORS}>
            <div className="title-spec sm-spacer">
                <h1 className="text-shadow">{UpperCase(aajonusCatagory.title)}</h1>
            </div>
            <ArticleSection articles={sortedArticles}/>
        </Cont>
    );
};

export default Render;
