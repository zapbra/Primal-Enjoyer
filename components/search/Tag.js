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

  gap: 0.5rem;

  .plus-icon {
    width: 24px;
    display:inline-block;
   
    
  }
  &:hover {
    opacity: 0.7;
  }
  p {
    font-size: 1.25rem;
    display:inline-block;
    
  }
  .flex-cont{
    display:flex;
    vertical-align: center;
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
      <div className="flex-cont">
      <p>{props.title}</p>

      <PlusIcon className="plus-icon" />
      </div>
    </TagElem>
  );
};

export default Tag;
