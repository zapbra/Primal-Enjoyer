import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import SearchTag from "./SearchTag";
const TagBoxElem = styled.div`
  border-radius: 0.5rem;
  max-height: 200px;
  overflow: hidden;
  overflow-y: scroll;
`;
const TagsCont = styled.div`
  margin: 10px;
  overflow: auto;
`;
const InputLine = styled.input`
  width: 10rem;
  height: 2.5rem;
  margin-top: 5px;
  font-weight: bold;
  border-radius: 0.5rem !important;
  font-size: 1.25rem;
`;
const SearchTagBox = (props) => {
  const tags = props.tags.map((tag, index) => {
    return (
      <SearchTag
        removeSearchTag={props.removeSearchTag}
        key={nanoid()}
        id={tag.id}
        title={tag.title}
        color={tag.color}
      />
    );
  });

  return (
    <TagBoxElem colors={props.colors}>
      <TagsCont>
        {tags}
        <form onSubmit={props.submitSearch}>
          <InputLine
            type="text"
            value={props.text}
            onChange={props.updateText}
            placeholder="Search..."
          />
        </form>
      </TagsCont>
    </TagBoxElem>
  );
};

export default SearchTagBox;
