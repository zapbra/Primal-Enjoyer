import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import Tag from "./Tag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import RemoveTag from "./RemoveTag";

const Cont = styled.div`
  .tag-holder {
    border: 1px solid ${(props) => props.colors.grey};
  }
  .selected-tags {
    padding: 8px;
    background-color: ${(props) => props.colors.grey};
  }
`;

const Tags = ({ selectedTags, unselectedTags, removeTag }) => {
  const tagElems = unselectedTags.map((tag, index) => {
    return <Tag name={tag} key={index} />;
  });

  const removeTagElems = selectedTags.map((tag, index) => {
    return <RemoveTag name={tag} removeTag={removeTag} key={index} />;
  });

  return (
    <Cont colors={COLORS}>
      <div className="header flex align-center mar-bottom-16">
        <h5 className="mar-right-8">Tags</h5>
        <FontAwesomeIcon icon={faTag} className="icon-sm dark-blue" />
      </div>
      <div className="tag-holder">
        <div className="selected-tags">{removeTagElems}</div>
        {tagElems}
      </div>
    </Cont>
  );
};

export default Tags;
