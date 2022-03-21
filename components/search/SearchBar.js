import React from 'react'
import styled from 'styled-components';

const TagInput = styled.div`
  border: 1px solid black;
  border-radius: .5rem;
  padding: 5px;
  background-color ${props => props.colors.grey};
  input{
    border-radius: .25rem;
    border: 1px solid black;
    outline: none;
  }
`;


const SearchBar = (colors) => {
  return (
    <TagInput colors = {props.colors}>
              <input type = 'text' />
            </TagInput>
  )
}

export default SearchBar