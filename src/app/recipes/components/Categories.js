import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import Category from "./Category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faSort, faTag } from "@fortawesome/free-solid-svg-icons";
import RemoveTag from "./RemoveTag";

const Cont = styled.div`
  .category-holder {
    border: 1px solid ${(props) => props.colors.grey};
  }

  .unselected-holder {
    padding: 8px;
  }

  .selected-tags {
    padding: 8px;
    background-color: ${(props) => props.colors.grey};
  }
`;

const Categories = ({
  unselectedCategories,
  selectedCategories,
  removeCategory,
}) => {
  const categoryElems = unselectedCategories.map((category) => {
    return <Category name={category} />;
  });

  const selectedCategoryElems = selectedCategories.map((category) => {
    return <RemoveTag name={category} removeTag={removeCategory} />;
  });
  return (
    <Cont colors={COLORS}>
      <div className="header flex align-center mar-bottom-16">
        <h5 className="mar-right-8">Categories</h5>
        <FontAwesomeIcon icon={faFolder} className="icon-sm dark-blue" />
      </div>
      <div className="category-holder">
        <div className="selected-tags">{selectedCategoryElems}</div>
        <div className="unselected-holder">{categoryElems}</div>
      </div>
    </Cont>
  );
};

export default Categories;
