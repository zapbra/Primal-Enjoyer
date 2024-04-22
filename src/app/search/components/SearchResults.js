import styled from "styled-components";
import Article from "./Article";
import {nanoid} from "nanoid";

const ResultsCont = styled.div`
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    @media only screen and (max-width: 630px) {
        justify-content: flex-start;
    }
    padding: 8px;
`;

const SearchResults = ({articles}) => {
    const sortedArticles = articles.sort((a, b) => {
        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();
        return textA < textB;
    });

    const articleElems = sortedArticles.map((article, index) => {
        return <Article article={article} key={nanoid()} index={index}/>;
    });
    return <div className='bg-white rounded shadow m-4 flex justify-between flex-wrap'> {articleElems}</div>;
};

export default SearchResults;
