import React from "react";
import styled from "styled-components";
import { PlusIcon } from "@heroicons/react/solid";
const TagElem = styled.div`
  float: left;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 2px 10px;
  min-width: 70px;
  margin: 5px;
  cursor: pointer;
  text-align: center;
  background-color: ${(props) => props.color};
  display: flex;
  gap: 0.5rem;

  .plus-icon {
    width: 24px;
  }
  &:hover {
    opacity: 0.7;
  }
  p {
    font-size: 1.25rem;
  }
`;
const Tag = (props) => {
  return (
    <TagElem
      onClick={() => props.removeTag(props.id)}
      id={props.id}
      color={props.color}
    >
      {" "}
      <div className="flex-one">
        <p>{props.title}</p>
      </div>
      <div className="flex-one">
        <PlusIcon className="plus-icon" />
      </div>
    </TagElem>
  );
};

export default Tag;
