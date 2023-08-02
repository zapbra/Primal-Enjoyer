"use client";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import ArticleSection from "../components/ArticleSection";
import { UpperCase } from "../../../../utils/Functions";
const Cont = styled.div`
  padding-top: 6rem;
  padding-bottom: 20rem;
  background: #fff;
  text-align: center;
  h1 {
    margin-bottom: 1rem;
  }
  .title-spec {
    padding: 0.5rem;
    h1 {
      margin-bottom: 0;
    }
    border-bottom: 4px solid black;
    border-top: 4px solid black;
    background: rgb(0, 43, 103);
    background: linear-gradient(
      90deg,
      rgba(0, 43, 103, 1) 0%,
      rgba(233, 241, 253, 1) 51%,
      rgba(0, 43, 103, 1) 100%
    );
  }
  background: white;
`;

const Render = ({ sortedArticles, aajonusCatagory }) => {
  return (
    <Cont colors={COLORS}>
      <div className="title-spec sm-spacer">
        <h1 className="text-shadow">{UpperCase(aajonusCatagory.title)}</h1>
      </div>
      <ArticleSection articles={sortedArticles} />
    </Cont>
  );
};

export default Render;
