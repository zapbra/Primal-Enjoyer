"use client";

import React, { useEffect, useContext } from "react";

/* import { AppContext } from "../layout"; */
import styled from "styled-components";
import COLORS, { tagColors } from "../../../data/colors";
import SuperSearchBar from "./components/SuperSearchBar";
import SearchResults from "./components/SearchResults";
import Head from "next/head";
import {
  SearchIcon,
  TagIcon,
  BookOpenIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamation } from "@fortawesome/free-solid-svg-icons";
import ReportForm from "../../../components/banners/ReportForm";
import { useState } from "react";

const Cont = styled.div`
  position: relative;
`;
const ArticlesCount = styled.h3`
  color: #000;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 5px black;
`;
const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  h1 {
    margin-bottom: 0.5rem;
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
  @media only screen and (max-width: 600px) {
    gap: 0;
  }
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
const PlaceToggle = styled.div`
  width: 200px;
  margin: 0 auto 4rem;
  display: flex;
  justify-content: center;
`;
const SectionHalf = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  h2 {
    text-shadow: 2px 2px 5px rgba(1, 1, 1, 0.5);
  }
`;

const BottomSection = styled.div`
  overflow-y: scroll;
  max-height: 800px;
  max-width: 90%;
  margin: 0 auto 6rem;
  flex: 1;
  background-color: ${(props) => props.colors.veryLightBlue};
  border: 1px solid ${(props) => props.colors.darkBlue};
  padding: 32px 0;
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

const Render = ({ articlesFetch, superTags }) => {
  const [tags, setTags] = React.useState([]);
  const [searchTags, setSearchTags] = React.useState([]);
  const [text, setText] = React.useState("");
  const [filterTags, setFilterTags] = React.useState([]);
  const [articles, setArticles] = useState(articlesFetch);
  const [filterArticles, setFilterArticles] = React.useState(articlesFetch);
  const [callFilter, setCallFilter] = React.useState([]);
  const [renderCount, setRenderCount] = React.useState(100);
  const [firstRender, setFirstRender] = React.useState(true);
  const [renderArticles, setRenderArticles] = React.useState([]);
  const [alphaTags, setAlphaTags] = React.useState(
    superTags.sort(function (a, b) {
      var textA = a.text.toUpperCase();
      var textB = b.text.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    })
  );

  // Set articles on global context
  /* const [context, setContext] = useContext(AppContext); */

  useEffect(() => {
    if (context.tags.length > 0) {
      setSearchTags(context.tags);
    }
  }, []);
  const [view, setView] = React.useState(false);
  const changeView = () => {
    setView((prevView) => {
      return !prevView;
    });
  };

  const articlesLength = filterArticles.length;
  const allArticlesLength = articles.length;

  function IncreaseRender() {
    if (renderCount + 100 >= filterArticles.length) {
      setRenderCount(filterArticles.length);
    } else {
      setRenderCount((prev) => {
        return prev + 100;
      });
    }
    updateArticles();
  }

  const clearText = () => {
    setText("");
  };

  //#Step 5: Filters fetched articles based on tags, runs useEffect setCallFilter at end, also useEffect on filter articles is called to set renderArticles
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

  // Step 1 (Tags): Removes clicked tag and clears text input
  function submitSearch(e) {
    e.preventDefault();
    let id = filterTags[0].id;
    removeTag(id);
    setText("");
  }

  function generateColor() {
    return tagColors[Math.floor(Math.random() * tagColors.length)];
  }

  //#Step 3 (Searching): Called after text updates to filter tags
  function findClosestTag() {
    setFilterTags((prevTags) => {
      return tags.filter((tag) => {
        return tag.title.includes(text);
      });
    });
  }
  //#Step 1 (Searching): Updates text, which calls useEffect
  function updateText(e) {
    let val = e.currentTarget.value;
    setText((prevText) => {
      return val.toLowerCase();
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
    setContext((prev) => {
      return {
        ...prev,
        tags: searchTags,
      };
    });
  }
  // #Step 7 (Tags): Filters applicable tags based on the tags the articles contain [FINAL STEP]
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
  // #Step 6 (Tags): Updates tags after articles have been filtered, calls updateTags
  useEffect(() => {
    updateTags();
  }, [callFilter]);

  // #Step 3 (Tags): Adds tag to search tags
  function pushSearchTag(tag) {
    setSearchTags((prevTags) => {
      return [...prevTags, tag];
    });
  }
  // #Step 4 (Tags): Calls updateArticles
  useEffect(() => {
    updateArticles();
    setContext((prev) => {
      return {
        ...prev,
        tags: searchTags,
      };
    });
  }, [searchTags]);

  // #Step 2 (Tags): Removes tag from tags, and filterTags based on id, pushes to search tags
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
    setText("");
  }

  useEffect(() => {
    let renderArticleElems = [];
    if (articlesLength >= 100) {
      for (let i = 0; i < renderCount; i++) {
        renderArticleElems.push(filterArticles[i]);
      }
    } else {
      renderArticleElems = [...filterArticles];
    }

    setRenderArticles(renderArticleElems);
  }, [filterArticles]);
  // Set a delay on tag renders until they stop typing for 500ms
  //#Step 2 (Searching): Called after text is input

  React.useEffect(() => {
    if (!firstRender) {
      const delayType = setTimeout(() => {
        findClosestTag();
      }, 500);
      return () => clearTimeout(delayType);
    } else {
      setFirstRender(false);
    }
  }, [text]);

  const [style, setStyle] = React.useState("row");
  React.useEffect(() => {
    if (view) {
      setStyle((prevStyle) => {
        return "row";
      });
    } else {
      setStyle((prevStyle) => {
        return "column";
      });
    }
  }, [view]);

  const [reportActive, setReportActive] = useState(false);
  const hideReport = () => {
    setReportActive(false);
  };

  const meta = {
    title: "Raw Primal Search Bar",
    description:
      "Search for any topic discussed by Aajonus Vonderplantiz. Raw meat articles, Aajonus Vonderplanitz questions and answers about raw food and nutrition topics.",
    link: "https://www.primalenjoyer.com/search",
    type: "website",
    date: "2022-10-11 15:00:00.000",
    image: "/seo/search.PNG",
    keywords:
      "aajonus vonderplanitz, raw meat, health, information, raw primal, diet",
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Primal Enjoyer" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="article:published_time" content={meta.date} />
        <link rel="canonical" href={meta.image} />
        <meta property="og:url" content={meta.link} />
        <meta name="keywords" content={meta.keywords} />

        <meta name="description" content={meta.description} />
      </Head>
      <Cont className="container">
        <Header>
          <h1 className="text-shadow">Search By Tag</h1>
          <h3 className="contrast light">
            This website currently has {allArticlesLength} articles
          </h3>
        </Header>
        <SectionSplit style={{ flexDirection: style }}>
          <TopSection>
            <SectionHalf>
              <SubTitle className="search tablet" colors={COLORS}>
                <div className="cont ">
                  <SearchIcon className="icon-grey" />
                  <h3>Search</h3>
                </div>
              </SubTitle>

              <SuperSearchBar
                text={text}
                updateText={updateText}
                removeSearchTag={removeSearchTag}
                pushTag={pushSearchTag}
                tags={searchTags}
                submitSearch={submitSearch}
                colors={COLORS}
                pushSearchTag={pushSearchTag}
                removeTag={removeTag}
                filterTags={filterTags}
                clearText={clearText}
              />
            </SectionHalf>
          </TopSection>
          <BottomSection colors={COLORS}>
            <SearchResults
              allArticles={articlesFetch}
              articles={renderArticles}
            />
            {articlesLength >= 100 && (
              <div className="plus-cont" onClick={IncreaseRender}>
                <PlusIcon className="icon-misc" />
              </div>
            )}
          </BottomSection>
        </SectionSplit>
        {reportActive && (
          <>
            <div className="popup-screen"></div>
            <ReportForm hideReport={hideReport} />{" "}
          </>
        )}
        <div
          onClick={() => setReportActive(true)}
          className="report-bottom-right flex  cursor"
        >
          <FontAwesomeIcon
            icon={faExclamation}
            className="icon-ssm red mar-right-4"
          />
          <p className="red underline-hover">report issue</p>
        </div>
      </Cont>
    </>
  );
};

export default Render;
