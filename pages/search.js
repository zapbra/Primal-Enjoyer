import React from 'react'
import styled from 'styled-components';
import COLORS, {tagColors} from '../Data/colors';
 import SearchBar from '../components/search/SearchBar';
import TAGS from '../Data/tags';
import TagBox from '../components/search/TagBox';
const SearchCont = styled.div`
 border-radius:1rem;
 background-color: #fff;
 
`;
const TopSection = styled.div`
display:flex;
gap:2rem;
`
const SectionHalf = styled.div`
  flex:1;
  h2{
    text-shadow: 2px 2px 5px rgba(1,1,1,.5);
  }
`;




const search = () => {
  const [tags, setTags] = React.useState([]);
  const [searchTags, setSearchTags] = React.useState([]);
  const [text, setText] = React.useState('');
  const [filterTags, setFilterTags] = React.useState([]);

  function submitSearch(e){
    e.preventDefault();
    let id = filterTags[0].id;
    
    removeTag(id);
    setText(prevText=>{
      return '';
    })
    
  }
  function generateColor(){
    return tagColors[Math.floor(Math.random() * tagColors.length-1)];
    
  }
  function findClosestTag(){
    setFilterTags(prevTags=>{
      return  tags.filter(tag=>{
        return tag.title.includes(text);
      });
      
    });
  }

  function updateText(e){
    let val = e.currentTarget.value;
    setText(prevText=>{
      return val;
    })
    
  }
  React.useEffect(()=>{
    findClosestTag();
    
  },[text])

  function pushSearchTag(tag){
    setTags(prevTags=>{
      return [...prevTags, tag];
    });
  }
  function removeSearchTag(id){
    const item = searchTags.find(tag=>{
      return tag.id === id;
    })
    pushSearchTag(item);
    setSearchTags(prevTags=>{
      const tags = prevTags.filter(tag=>{
        return tag.id !== id;
      });
      return [...tags];
    })
  }

  function pushTag(tag){
    setSearchTags(prevTags=>{
      return [...prevTags, tag];
    });
  }

  function removeTag(id){ //THIS IS THE PROBLEM!
    
    const item = tags.find(tag=>{
      return tag.id === id;
    })
    pushTag(item);
    setTags(prevTags=>{
      const tags = prevTags.filter(tag=>{
        return tag.id !== id;
      });
      return [...tags];
    })
  }
  
  
  React.useEffect(()=>{
    setTags(prevTags=>{
      return TAGS.map((tag,index)=>{
        let newTag = {title:tag,color:generateColor(),id:`tag-${index+1}`};
        return newTag;
      })
    });
    setFilterTags(prevTags=>{
      return TAGS.map((tag,index)=>{
        let newTag = {title:tag,color:generateColor(),id:`tag-${index+1}`};
        return newTag;
      })
    })
  },[])
  
  return (
    <SearchCont>
        <TopSection>
          <SectionHalf>
            <h2>Search</h2>
            <SearchBar text = {text} 
            updateText = {updateText} 
            removeTag = {removeSearchTag} 
            pushTag = {pushSearchTag} 
            tags = {searchTags} 
            submitSearch = {submitSearch}
            colors = {COLORS} 
            />
          </SectionHalf>
          <SectionHalf>
            <h2>Tags - Click to add</h2>
            <TagBox pushTag = {pushTag} removeTag = {removeTag} tags = {filterTags} colors  = {COLORS}/>
              
                
              
            
          </SectionHalf>
          </TopSection>
    </SearchCont>
  )
}

export default search