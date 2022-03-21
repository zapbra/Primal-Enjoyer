import React from 'react'
import styled from 'styled-components';
import COLORS, {tagColors} from '../Data/colors';
 
import TAGS from '../Data/tags';
import TagBox from '../components/search/Tags';
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
  border-radius: .5rem;
  padding: 5px;
  background-color ${props => props.colors.grey};
  input{
    border-radius: .25rem;
    border: 1px solid black;
    outline: none;
  }
`;


const search = () => {
  const [tags, setTags] = React.useState('');
  function generateColor(){
    return tagColors[Math.floor(Math.random() * tagColors.length-1)];
  }
  
  React.useEffect(()=>{
    setTags(prevTags=>{
      return TAGS.map(tag=>{
        let newTag = {title:tag,color:generateColor()};
        return newTag;
      })
    });
  },[])
  
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
            <TagBox tags = {tags} colors  = {COLORS}/>
              
                
              
            
          </SectionHalf>
          </TopSection>
    </SearchCont>
  )
}

export default search