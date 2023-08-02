import React from "react";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";

const Cont = styled.div`
  background: #fff;
  border-bottom: 1px solid ${(props) => props.colors.grey};
  padding: 0 4px 4px 8px;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.colors.green};
  }
`;
const SearchLine = ({ text, addTag }) => {
  return (
    <Cont onClick={() => addTag(text)} className="search-line " colors={COLORS}>
      <p>{text}</p>
    </Cont>
  );
};

export default SearchLine;
