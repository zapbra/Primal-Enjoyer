import React, { useEffect } from "react";
import styled from "styled-components";
import COLORS, { tagColors } from "../Data/colors";
import SearchBar from "../components/search/SearchBar";
import TAGS from "../Data/tags";
import TagBox from "../components/search/TagBox";
import SearchResults from "../components/search/SearchResults";
import getArticlePreviews, { fetchTags } from "./services";
import { useState } from "react";
const SearchCont = styled.div`
  border-radius: 1rem;
  background-color: #fff;
  padding: 20px;
`;
const TopSection = styled.div`
  display: flex;
  gap: 2rem;
`;
const SectionHalf = styled.div`
  flex: 1;
  h2 {
    text-shadow: 2px 2px 5px rgba(1, 1, 1, 0.5);
  }
`;

const BottomSection = styled.div`
  margin-top: 3rem;
`;

export const getStaticProps = async () => {
  const articlesFetch = getArticlePreviews();
  const superTags = fetchTags();
  return articlesFetch;
};

const Search = ({ articlesFetch }) => {
  const [tags, setTags] = React.useState([]);
  const [searchTags, setSearchTags] = React.useState([]);
  const [text, setText] = React.useState("");
  const [filterTags, setFilterTags] = React.useState([]);
  const [articles, setArticles] = useState(articlesFetch);
  const [filterArticles, setFilterArticles] = React.useState(articlesFetch);

  function updateArticles() {
    setFilterArticles((prevArticles) => {
      const articles = articlesFetch.filter((article) => {
        return searchTags.every((tag) => {
          return article.tags.some((artTag) => {
            return artTag.text === tag.title;
          });
        });
      });
      return articles;
    });
  }

  useEffect(() => {
    updateArticles();
  }, [filterTags, searchTags]);

  useEffect(() => {
    console.log(filterArticles);
  }, [filterArticles]);
  function submitSearch(e) {
    e.preventDefault();
    let id = filterTags[0].id;

    removeTag(id);
    setText((prevText) => {
      return "";
    });
  }

  function generateColor() {
    return tagColors[Math.floor(Math.random() * tagColors.length)];
  }
  function findClosestTag() {
    setFilterTags((prevTags) => {
      return tags.filter((tag) => {
        return tag.title.includes(text);
      });
    });
  }

  function updateText(e) {
    let val = e.currentTarget.value;
    setText((prevText) => {
      return val;
    });
  }
  React.useEffect(() => {
    findClosestTag();
  }, [text]);

  function pushSearchTag(tag) {
    setTags((prevTags) => {
      return [...prevTags, tag];
    });
  }
  function removeSearchTag(id) {
    const item = searchTags.find((tag) => {
      return tag.id === id;
    });
    setFilterTags((prevTags) => {
      return [...prevTags, item];
    });
    setTags((prevTags) => {
      return [...prevTags, item];
    });
    setSearchTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
  }

  function pushSearchTag(tag) {
    setSearchTags((prevTags) => {
      return [...prevTags, tag];
    });
  }

  function removeTag(id) {
    const item = tags.find((tag) => {
      return tag.id === id;
    });
    pushSearchTag(item);
    setTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
    setFilterTags((prevTags) => {
      const tags = prevTags.filter((tag) => {
        return tag.id !== id;
      });
      return [...tags];
    });
  }

  React.useEffect(() => {
    setTags((prevTags) => {
      return TAGS.map((tag, index) => {
        let newTag = {
          title: tag,
          color: generateColor(),
          id: `tag-${index + 1}`,
        };
        return newTag;
      });
    });
    setFilterTags((prevTags) => {
      return TAGS.map((tag, index) => {
        let newTag = {
          title: tag,
          color: generateColor(),
          id: `tag-${index + 1}`,
        };
        return newTag;
      });
    });
  }, []);

  return (
    <SearchCont>
      <TopSection>
        <SectionHalf>
          <h2>Search - </h2>
          <h3>Type and click enter to auto-fill</h3>
          <SearchBar
            text={text}
            updateText={updateText}
            removeSearchTag={removeSearchTag}
            pushTag={pushSearchTag}
            tags={searchTags}
            submitSearch={submitSearch}
            colors={COLORS}
          />
        </SectionHalf>
        <SectionHalf>
          <h2>Tags - </h2>
          <h3>Click to add</h3>
          <TagBox
            pushSearchTag={pushSearchTag}
            removeTag={removeTag}
            tags={filterTags}
            colors={COLORS}
          />
        </SectionHalf>
      </TopSection>
      <BottomSection>
        <SearchResults articles={filterArticles} />
      </BottomSection>
    </SearchCont>
  );
};

export default Search;
