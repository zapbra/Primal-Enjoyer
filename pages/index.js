import React, { useEffect } from "react";
import { gql, GraphQLClient } from "graphql-request";
import styled from "styled-components";
import COLORS, { tagColors } from "../Data/colors";
import SearchBar from "../components/search/SearchBar";
import { NextSeo } from "next-seo";
import TAGS from "../Data/tags";
import TagBox from "../components/search/TagBox";
import SearchResults from "../components/search/SearchResults";
import { SearchIcon, TagIcon, BookOpenIcon } from "@heroicons/react/solid";
import Icon from "../components/Buttons/Icon";
import Instructions from "../components/Instructions";
import ChangeView from "../components/Buttons/ChangeView";
import { useState } from "react";

const Header = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 3rem;
  gap: 2rem;
  .flex-one {
    &:nth-of-type(2) {
      display: flex;
      align-items: center;
      gap: 2rem;
      & > div {
        display: flex;
        align-items: center;
        gap: 8px;
      }
    }
  }
  @media only screen and (max-width: 680px) {
    flex-direction: column;
  }
`;
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
  height: 800px;

  @media only screen and (max-width: 365px) {
    flex-direction: column;
  }
`;
const PlaceToggle = styled.div`
  width: 100px;
  margin: 0 auto 4rem;
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
  max-width: 900px;
  margin: 0 auto;
  flex: 1;
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
const Title = styled.div`
  margin: 0 auto;
  padding: 1rem 2rem;
  border-radius: 3rem;
  display: inline-block;
  border: 2px solid ${(props) => props.colors.darkBlue};
  background-image: linear-gradient(
    to right,
    ${(props) => props.colors.veryLightBlue},
    ${(props) => props.colors.ultraLightBlue}
  );
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
      articles(first: 5001) {
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
      tags(first: 1000) {
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

const SearchPage = ({ articlesFetch, superTags }) => {
  const [tags, setTags] = React.useState([]);
  const [searchTags, setSearchTags] = React.useState([]);
  const [text, setText] = React.useState("");
  const [filterTags, setFilterTags] = React.useState([]);
  const [articles, setArticles] = useState(articlesFetch);
  const [filterArticles, setFilterArticles] = React.useState(articlesFetch);
  const [callFilter, setCallFilter] = React.useState([]);
  const [alphaTags, setAlphaTags] = React.useState(
    superTags.sort(function (a, b) {
      var textA = a.text.toUpperCase();
      var textB = b.text.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    })
  );
  const [view, setView] = React.useState(false);
  const changeView = () => {
    setView((prevView) => {
      return !prevView;
    });
  };
  const articlesLength = filterArticles.length;
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
    setCallFilter((prev) => {
      return [...prev];
    });
  }

  const SEO = {
    title: "Raw Primal Search Bar",
    description: "Search for any topic discussed by Aajonus Vonderplantiz",
  };

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
      return val.toLowerCase();
    });
  }

  /*function pushSearchTag(tag) {
    setTags((prevTags) => {
      return [...prevTags, tag];
    });
  } NO IDEA */
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

  function updateTags() {
    let tags = [];

    filterArticles.map((article) => {
      article.tags.map((tag) => {
        if (
          tags.some((innerTag) => {
            return innerTag.text == tag.text;
          })
        ) {
        } else {
          tags.push(tag);
        }
      });
    });

    setTags((prevTags) => {
      let returnTags = tags.map((tag, index) => {
        let newTag = {
          title: tag.text,
          color: generateColor(),
          id: `tag-${index + 1}`,
        };
        return newTag;
      });
      returnTags = returnTags.sort(function (a, b) {
        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      return returnTags;
    });

    setFilterTags((prevTags) => {
      let returnTags = tags.map((tag, index) => {
        let newTag = {
          title: tag.text,
          color: generateColor(),
          id: `tag-${index + 1}`,
        };
        return newTag;
      });
      return returnTags.sort(function (a, b) {
        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });
      return returnTags;
    });
  }
  useEffect(() => {
    updateTags();
  }, [callFilter]);
  function pushSearchTag(tag) {
    setSearchTags((prevTags) => {
      return [...prevTags, tag];
    });
  }
  useEffect(() => {
    updateArticles();
  }, [searchTags]);

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
    findClosestTag();
  }, [text]);

  // #1 Page loads and sets all the tags into state objects
  /* React.useEffect(() => {
    setTags((prevTags) => {
      return alphaTags.map((tag, index) => {
        let newTag = {
          title: tag.text,
          color: generateColor(),
          id: `tag-${index + 1}`,
        };
        return newTag;
      });
    });
    setFilterTags((prevTags) => {
      return alphaTags.map((tag, index) => {
        let newTag = {
          title: tag.text,
          color: generateColor(),
          id: `tag-${index + 1}`,
        };
        return newTag;
      });
    });
  }, []);
*/
  const [style, setStyle] = React.useState("row");
  React.useEffect(() => {
    if (view) {
      setStyle((prevStyle) => {
        return "column";
      });
    } else {
      setStyle((prevStyle) => {
        return "row";
      });
    }
  }, [view]);

  return (
    <>
      <NextSeo {...SEO} />

      <div className="container">
        <Header>
          <Title colors={COLORS}>
            <h1>Aajonus Search</h1>
          </Title>
        </Header>
        <Instructions />

        <PlaceToggle>
          <ChangeView condition={view} func={changeView} />
        </PlaceToggle>
        <Header>
          <Title colors={COLORS}>
            <h1 className="light green">{articlesLength}</h1>
          </Title>
        </Header>
        <SectionSplit style={{ flexDirection: style }}>
          <TopSection>
            <SectionHalf>
              <SubTitle className="search" colors={COLORS}>
                <div className="cont">
                  <SearchIcon className="icon-grey" />
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
                  <TagIcon className="icon-blue" />
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

export default SearchPage;
