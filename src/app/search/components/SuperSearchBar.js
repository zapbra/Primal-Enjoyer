import React from "react";
import styled from "styled-components";
import SuperSearchTagBox from "./SuperSearchTagBox";

const TagInput = styled.div`
  border: 1px solid black;
  padding: 5px;
  background-color: ${(props) => props.colors.darkGrey};

  margin-bottom: 2rem;

  input {
    border-radius: 0.25rem;
    border: 1px solid black;
    outline: none;
  }
`;

const SuperSearchBar = (props) => {
  return (
    <TagInput className="box-shadow" colors={props.colors}>
      <SuperSearchTagBox
        pushTag={props.pushTag}
        removeSearchTag={props.removeSearchTag}
        tags={props.tags}
        colors={props.colors}
        text={props.text}
        updateText={props.updateText}
        submitSearch={props.submitSearch}
        pushSearchTag={props.pushSearchTag}
        removeTag={props.removeTag}
        filterTags={props.filterTags}
        clearText={props.clearText}
      />
    </TagInput>
  );
};

export default SuperSearchBar;
