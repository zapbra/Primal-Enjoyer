import React from "react";
import styled from "styled-components";
import SearchTagBox from "./SearchTagBox";

const TagInput = styled.div`
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 5px;
  background-color: ${(props) => props.colors.grey};
  input {
    border-radius: 0.25rem;
    border: 1px solid black;
    outline: none;
  }
`;

const SearchBar = (props) => {
  return (
    <TagInput colors={props.colors}>
      <SearchTagBox
        pushTag={props.pushTag}
        removeTag={props.removeTag}
        tags={props.tags}
        colors={props.colors}
        text={props.text}
        updateText={props.updateText}
        submitSearch={props.submitSearch}
      />
    </TagInput>
  );
};

export default SearchBar;
