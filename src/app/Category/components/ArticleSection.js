import React from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import Article from "./Article";

const Cont = styled.div`
  padding: 32px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 32px;
  background: rgb(0, 43, 103);
  background: linear-gradient(
    90deg,
    rgba(0, 43, 103, 1) 0%,
    rgba(233, 241, 253, 1) 51%,
    rgba(0, 43, 103, 1) 100%
  );
`;

const ArticlesSection = ({ articles }) => {
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
  return <Cont colors={COLORS}>{articleElems}</Cont>;
};

export default ArticlesSection;
