import React from 'react'
import styled from 'styled-components';
import COLORS from '../Data/colors';
import TAGS from '../Data/tags';
const SearchCont = styled.div`
 border-radius:1rem;
 background-color: #fff;
 
`;
const TopSection = styled.div`
display:flex;
`
const SectionHalf = styled.div`
  flex:1;
  h2{
    text-shadow: 2px 2px 5px rgba(1,1,1,.5);
  }
`;


const TagInput = styled.div`
  border: 1px solid black;
  border-radius: .25rem;
  padding: 5px;
  background-color ${props => props.colors.grey};
  input{
    border-radius: .25rem;
    border: 1px solid black;
    outline: none;
  }
`;

const TagBox = styled.div`
  border: 1px solid black;
  background-color: ${props => props.colors.grey};
`;
const search = () => {
  console.log(TAGS)
  return (
    <SearchCont>
        <TopSection>
          <SectionHalf>
            <h2>Search</h2>
            <TagInput colors = {COLORS}>
              <input type = 'text' />
            </TagInput>
          </SectionHalf>
          <SectionHalf>
            <h2>Tags - Click to add</h2>
            <TagBox colors  = {COLORS}>
              <div className = 'tags'>
                background-color: #fff;
              </div>
            </TagBox>
          </SectionHalf>
          </TopSection>
    </SearchCont>
  )
}

export default search