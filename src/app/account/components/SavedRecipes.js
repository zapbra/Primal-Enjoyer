import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { getBookmarkedRecipes } from "../../../../utils/Functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBookmark } from "@fortawesome/free-solid-svg-icons";
import Popup from "../../../../components/Utility/Popup";

const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.darkBlue};
  max-width: 400px;
  .popup-spec {
    width: auto;
  }
  .space-between {
    justify-content: space-between !important;
  }
  .header {
    padding: 16px;
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
  }
  .recipe-holder {
    background-color: #fff;
  }
  .line {
    padding: 8px;
    border-bottom: 1px solid ${(props) => props.colors.grey};
    justify-content: space-between;
    cursor: pointer;
    transition: background-color 0.25s ease;
    .light-grey {
      transition: color 0.25s ease;
    }
    &:hover {
      background-color: ${(props) => props.colors.lightGrey};
      .light-grey {
        color: ${(props) => props.colors.black} !important;
      }
    }
  }

  .filter-tag {
    cursor: pointer;
    background-color: #fff;
    transition: background-color 0.25s ease, box-shadow 0.25s ease;
    border-radius: 8px;
    border: 1px solid ${(props) => props.colors.darkBlue};
    display: inline-flex;
    align-items: center;
    margin-left: 4px;
    margin-right: 4px;
    margin-bottom: 8px;
    // box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px 0px;
    padding: 8px 12px;
    &:hover {
      background-color: ${(props) => props.colors.darkBlue};
      h5,
      .dark-blue {
        color: #fff;
      }
    }
    &:active {
      box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
        rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    }
  }
  .filter-holder {
    background-color: #fff;
    padding: 8px;
  }
  .filter-tag-selected {
    background-color: ${(props) => props.colors.darkBlue};
    position: relative;
    box-shadow: inset 2px 2px 2px 0px rgb(128 149 179 / 41%),
      inset -2px -2px 2px 0 rgb(0 43 103 / 70%);
    h5 {
      position: relative;
    }
    h5,
    .dark-blue {
      color: #fff;
    }
  }
`;

const SavedRecipes = ({
  selectCategory,
  categories,
  recipes,
  recipesRender,
}) => {
  const filterElems = categories.map((category, index) => {
    return (
      <Popup key={index} title={category.name}>
        <div
          className={
            category.selected
              ? "filter-tag filter-tag-selected"
              : "filter-tag rounded-shadow"
          }
          onClick={() => selectCategory(category.name)}
        >
          <FontAwesomeIcon
            icon={category.icon}
            className="dark-blue icon-ssm "
          />
          {/* <h5>{category.name}</h5> */}
        </div>
      </Popup>
    );
  });

  const recipeLines = recipesRender.map((recipe, index) => {
    return (
      <Link href={`/recipe/${recipe.name}`} key={index}>
        <div className="line space-between flex align-center ">
          <div className="flex align-center">
            <p className="small light-grey mar-right-8">({index + 1})</p>
            <p>{recipe.name}</p>
          </div>
          <FontAwesomeIcon icon={faArrowRight} className="icon-sm light-grey" />
        </div>
      </Link>
    );
  });

  return (
    <Cont colors={COLORS} className="roundedS-shadow">
      <div className="header flex space-between">
        <h5>Saved recipes</h5>
        <FontAwesomeIcon icon={faBookmark} className="dark-blue icon-sm" />
      </div>
      <div className="flex flex-wrap justify-start filter-holder">
        {filterElems}
      </div>
      <div className="black-line"></div>
      <h5 className="padding-8">Results</h5>
      <div className="black-line"></div>
      <div className="recipe-holder">
        {recipeLines}
        {recipeLines.length == 0 && "Nothing saved here..."}
      </div>
    </Cont>
  );
};

export default SavedRecipes;
