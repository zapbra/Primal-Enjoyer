import React from 'react'
import styled from 'styled-components';
import Tag from './Tag';
const TagBoxElem = styled.div`
  border: 1px solid black;
  background-color: ${props => props.colors.grey};
  border-radius: .5rem;
  
 
`;
const Tags = styled.div`
    background-color:white;
    margin:10px;
    
`
const TagBox = (props) => {
   const tags = Object.entries(props.tags).map(([key,value])=>{
    <Tag title = {value.title} color = {value.color/>
   });
  return (
    <TagBoxElem colors = {props.colors}>
       
    </TagBoxElem>

  )
}

export default TagBox;