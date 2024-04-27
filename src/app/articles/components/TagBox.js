import React from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import Tag from "./Tag";

const TagBoxElem = styled.div`
  border: 1px solid black;
  box-shadow: 0px 5px 25px 3px rgba(0, 0, 0, 0.8);
  height: 590px;
  overflow-y: scroll;
`;
const TagsCont = styled.div`
  background-color: white;
  margin: 10px;
`;
const TagBox = (props) => {
  const tags = props.tags.map((tag, index) => {
    return (
      <Tag
        removeTag={props.removeTag}
        key={nanoid()}
        id={tag.id}
        title={tag.title}
        color={tag.color}
      />
    );
  });

  return (
    <TagBoxElem colors={props.colors}>
      <TagsCont>{tags}</TagsCont>
    </TagBoxElem>
  );
};

export default TagBox;
