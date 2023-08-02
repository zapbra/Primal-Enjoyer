import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../data/colors";
import ArticleLink from "./ArticleLink";
import { useEffect, useState, useReducer } from "react";
import { useContext } from "react";
import { AppContext } from "../../src/app/layout";

const Cont = styled.div`
  max-width: 700px;
  max-height: 600px;
  position: relative;
  overflow-y: auto;
  transition: height 0.25s ease;
  border: 1px solid ${(props) => props.colors.darkBlue};
  background: rgb(15, 82, 186);
  background: radial-gradient(
    circle,
    rgba(15, 82, 186, 1) 0%,
    rgba(0, 43, 103, 1) 0%,
    rgba(15, 82, 186, 1) 100%
  );
  .x-cont {
    justify-content: flex-end !important;
    padding-top: 8px;
    padding-right: 8px;
  }

  .header {
    position: relative;
    word-wrap: break-word;
  }
  h3 {
    color: ${(props) => props.colors.ultraLightBlue};
    text-align: center;
    padding: 8px;
    word-wrap: break-word;
  }
  .load-more {
    background: #fff;
    cursor: pointer;
    display: inline-block;
    padding: 8px 16px;
    border: 2px solid ${(props) => props.colors.darkBlue};
    &:hover {
      background: ${(props) => props.colors.lightBlue};
    }
    &:active {
      background: ${(props) => props.colors.darkBlue};
      h4 {
        color: #fff;
      }
    }
  }
`;

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
    <Cont colors={COLORS}>
      <div className="header">
        <div className="flex x-cont">
          <FontAwesomeIcon
            onClick={() => deleteCollectionFunctional(id, title)}
            icon={faClose}
            className="delete-btn icon-lg hero-icon-med"
          />
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
    </Cont>
  );
};

export default SavedCollection;
