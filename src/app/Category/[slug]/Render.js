import {UpperCase} from "../../../../utils/Functions";
import ArticleSection from "@/app/Category/components/ArticleSection";


const Render = ({sortedArticles, aajonusCatagory}) => {
    return (
        <div>
            <div className="title-spec sm-spacer">
                <h1 className="text-shadow">{UpperCase(aajonusCatagory.title)}</h1>
            </div>
            <ArticleSection articles={sortedArticles}/>
        </div>
    );
};

export default Render;
