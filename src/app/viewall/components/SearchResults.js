import React from "react";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import SearchLine from "./SearchLine";

const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.darkBlue};
  background: #fff;
  border-radius: 0px 0px 32px 32px;
  max-height: 400px !important;
  overflow: auto;
  position: absolute;
  width: calc(100% - 93px);
  @media only screen and (max-width: 800px) {
    width: calc(100% - 61px);
  }
  @media only screen and (max-width: 400px) {
    width: calc(100% - 43px);
  }
  z-index: 1;
  ::-webkit-scrollbar {
    width: 0.5rem;
    background: #d8dde3;
  }
  .search-line {
    &:last-of-type {
      border-radius: 0 0 32px 32px;
    }
  }
`;
const SearchResults = ({ searchResults, addTag }) => {
  const searchLines = searchResults.map((tag, index) => {
    return <SearchLine key={index} addTag={addTag} text={tag.title} />;
  });
  return <Cont colors={COLORS}>{searchLines}</Cont>;
};

export default SearchResults;
