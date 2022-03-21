import React from 'react'
import styled from 'styled-components';

const TagElem = styled.div`
  float:left;
  border: 1px solid black;
  border-radius:1rem;
  padding:2px 10px;
  min-width: 70px;
  margin:5px;
  cursor:pointer;
  text-align:center;
  background-color: ${props => props.color};
  &:hover{
    opacity: .7;
  }
`;
const Tag = (props) => {
  return (
    <TagElem color = {props.color}>{props.title}</TagElem>
  )
}

export default Tag;