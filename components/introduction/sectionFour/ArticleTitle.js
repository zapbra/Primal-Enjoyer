import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import Youtube from "react-youtube";

const ArticleElem = styled.article``;

const Title = styled.div`
  max-width: 1000px;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 0 auto 52px;
  padding: 1rem 2rem;
  border-radius: 3rem;
  border: 2px solid ${(props) => props.colors.darkBlue};
  background-image: linear-gradient(
    to right,
    ${(props) => props.colors.veryLightBlue},
    ${(props) => props.colors.ultraLightBlue}
  );

  .icon-spec {
    width: 48px;
    height: 48px;
    border-radius: 3rem;
    background-color: ${(props) => props.colors.green};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
  }
`;

const Article = ({ index, title }) => {
  return (
    <ArticleElem>
      <Title colors={COLORS}>
        <div className="icon-spec">
          <h3>{index}</h3>
        </div>
        <h3>{title}</h3>
      </Title>
    </ArticleElem>
  );
};

export default Article;
