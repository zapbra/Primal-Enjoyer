import React, { useEffect } from "react";
import { gql, GraphQLClient } from "graphql-request";
import styled from "styled-components";
import COLORS, { tagColors } from "../Data/colors";
import SearchBar from "../components/search/SearchBar";
import { NextSeo } from "next-seo";
import TAGS from "../Data/tags";
import TagBox from "../components/search/TagBox";
import SearchResults from "../components/search/SearchResults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faTags } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
const SearchCont = styled.div`
  border-radius: 1rem;
  background-color: #fff;
  padding: 20px;
`;
const SectionSplit = styled.div`
  display: flex;
  gap: 3rem;
`;
const TopSection = styled.div`
  flex: 1;
  gap: 2rem;
  max-width: 400px;
  margin: 0 auto;
  @media only screen and (max-width: 365px) {
    flex-direction: column;
  }
`;
const SectionHalf = styled.div`
  flex: 1;
  h2 {
    text-shadow: 2px 2px 5px rgba(1, 1, 1, 0.5);
  }
`;

const BottomSection = styled.div`
  overflow-y: scroll;
  height: 800px;
  margin: 0 auto;
  flex: 1;
  max-width: 600px;
`;

const SubTitle = styled.div`
  display: inline-block;

  padding: 0.5rem 1rem;
  border: 2px solid ${(props) => props.colors.grey};
  background-color: ${(props) => props.colors.darkBlue};
  .cont {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 0.5rem;
  }
  .color {
    * {
      color: ${(props) => props.colors.grey};
    }
  }
  &.search {
    h3 {
      color: white;
      font-weight: 400;
    }
  }
  &.tags {
    background-color: ${(props) => props.colors.grey};
    border: 2px solid ${(props) => props.colors.darkBlue};
    h3 {
      font-weight: 400;
    }
    .color {
      * {
        color: ${(props) => props.colors.darkBlue};
      }
    }
  }
`;

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    header: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });
  const query = gql`
    query {
      articles(first: 5000) {
        title
        coverImage {
          url
        }

        tags {
          ... on Tag {
            text
          }
        }
      }
      tags(first: 200) {
        text
      }
    }
  `;
  const data = await graphQLClient.request(query);
  const articlesFetch = data.articles;
  const superTags = data.tags;
  return {
    props: {
      articlesFetch,
      superTags,
    },
  };
};

const Search = ({ articlesFetch, superTags }) => {
  console.log(articlesFetch);
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
  const SEO = {
    title: "Raw Primal Search Bar",
    description: "Search for any topic discussed by Aajonus Vonderplantiz",
  };

  useEffect(() => {
    updateArticles();
  }, [filterTags, searchTags]);

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
      return superTags.map((tag, index) => {
        let newTag = {
          title: tag.text,
          color: generateColor(),
          id: `tag-${index + 1}`,
        };
        return newTag;
      });
    });
    setFilterTags((prevTags) => {
      return superTags.map((tag, index) => {
        let newTag = {
          title: tag.text,
          color: generateColor(),
          id: `tag-${index + 1}`,
        };
        return newTag;
      });
    });
  }, []);

  return (
    <>
      <NextSeo {...SEO} />
      <div className="container">
        <SectionSplit>
          <TopSection>
            <SectionHalf>
              <SubTitle className="search" colors={COLORS}>
                <div className="cont">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    size="xl"
                    className="color"
                  ></FontAwesomeIcon>
                  <h3>Search</h3>
                </div>
              </SubTitle>

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
              <SubTitle className="tags" colors={COLORS}>
                <div className="cont">
                  <FontAwesomeIcon
                    icon={faTags}
                    size="xl"
                    className="color"
                  ></FontAwesomeIcon>
                  <h3>Tags</h3>
                </div>
              </SubTitle>
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
        </SectionSplit>
      </div>
    </>
  );
};

export default Search;
