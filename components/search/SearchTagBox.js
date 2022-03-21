import React from 'react'
import styled from 'styled-components';
import {nanoid} from 'nanoid';
import SearchTag from './SearchTag';
const TagBoxElem = styled.div`
  
  background-color: ${props => props.colors.grey};
  border-radius: .5rem;
  
 
`;
const TagsCont = styled.div`
    
    margin:10px;
    overflow:auto;
`
const InputLine = styled.input`
  width:75px;  
  height:25px;
   margin-top:5px;
   font-weight:bold;
   
`;
const SearchTagBox = (props) => {
  
  const tags = props.tags.map((tag,index)=>{
    return <SearchTag removeTag = {props.removeTag} key = {nanoid()} id = {tag.id} title = {tag.title}  color = {tag.color}/>;
  });
  
  

  
  return (
    <TagBoxElem colors = {props.colors}>
       <TagsCont >{tags}<InputLine type = 'text' placeholder = 'Search...'/></TagsCont>
       
    </TagBoxElem>

  )
}

export default SearchTagBox;