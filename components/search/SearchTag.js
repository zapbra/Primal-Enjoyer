import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
const TagElem = styled.div`
  float: left;
  border: 1px solid black;
  border-radius: 1rem;
  padding: 2px 5px;
  min-width: 70px;
  margin: 5px;
  text-align: center;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
  gap: 5px;
  height: 32px;
`;
const SearchTag = (props) => {
  return (
    <TagElem id={props.id} color={props.color}>
      {props.title}
      <FontAwesomeIcon
        onClick={() => props.removeSearchTag(props.id)}
        icon={faCircleXmark}
        className="icon"
      ></FontAwesomeIcon>
    </TagElem>
  );
};

export default SearchTag;
