import { useState, useRef, use } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Cont = styled.div`
  .filters-holder {
    justify-content: center;
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
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px 0px;
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
  .filter-tag-selected {
    background-color: ${(props) => props.colors.darkBlue};
    position: relative;
    h5 {
      position: relative;
    }
    h5,
    .dark-blue {
      color: #fff;
    }
  }
`;

const FilterBar = ({ categories, setCategories, selectCategory }) => {
  const filterElems = categories.map((category) => {
    return (
      <div
        className={
          category.selected ? "filter-tag filter-tag-selected" : "filter-tag"
        }
        onClick={() => selectCategory(category.name)}
      >
        <FontAwesomeIcon
          icon={category.icon}
          className="dark-blue icon-ssm mar-right-8"
        />
        <h5>{category.name}</h5>
      </div>
    );
  });
  return (
    <Cont colors={COLORS}>
      <div className="filters-holder flex-wrap flex">{filterElems}</div>
    </Cont>
  );
};

export default FilterBar;
