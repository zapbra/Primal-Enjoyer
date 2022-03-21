import React from 'react'
import styled from 'styled-components';
import {nanoid} from 'nanoid';
import SearchTag from './SearchTag';
const TagBoxElem = styled.div`
  border: 1px solid black;
  background-color: ${props => props.colors.grey};
  border-radius: .5rem;
  
 
`;
const TagsCont = styled.div`
    background-color:white;
    margin:10px;
    overflow:auto;
`
const SearchTagBox = (props) => {
  
  const tags = props.tags.map((tag,index)=>{
    return <SearchTag removeTag = {props.removeTag} key = {nanoid()} id = {tag.id} title = {tag.title}  color = {tag.color}/>;
  });
  
  

  
  return (
    <TagBoxElem colors = {props.colors}>
       <TagsCont >{tags}</TagsCont>
       
    </TagBoxElem>

  )
}

export default SearchTagBox;