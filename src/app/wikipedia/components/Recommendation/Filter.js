import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../../data/colors";

const Cont = styled.div`
  .filter {
    cursor: pointer;
    background-color: #fff;
    border: 1px solid ${(props) => props.colors.brightBlue};
    padding: 8px;
    box-shadow: none;
    h5 {
      color: ${(props) => props.colors.brightBlue};
    }
  }
  .filter-selected {
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    background-color: ${(props) => props.colors.brightBlue};
    h5 {
      color: #fff;
    }
    transition: box-shadow 0.25s ease;
  }
`;

const Filter = ({ tags, setTags, updateTag }) => {
  const filters = tags.map((tag, index) => {
    return (
      <div
        key={index}
        className={
          tag.selected
            ? "mar-right-16 filter filter-selected"
            : "mar-right-16 filter"
        }
        onClick={() => updateTag(tag.name)}
      >
        <h5>{tag.name}</h5>
      </div>
    );
  });
  return (
    <Cont colors={COLORS}>
      <div className="flex">{filters}</div>
    </Cont>
  );
};

export default Filter;
