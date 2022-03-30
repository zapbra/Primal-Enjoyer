import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import SearchTag from "./SearchTag";
const TagBoxElem = styled.div`
  background-color: ${(props) => props.colors.grey};
  border-radius: 0.5rem;
`;
const TagsCont = styled.div`
  margin: 10px;
  overflow: auto;
`;
const InputLine = styled.input`
  width: 75px;
  height: 25px;
  margin-top: 5px;
  font-weight: bold;
`;
const SearchTagBox = (props) => {
  console.log(props.tags);
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
