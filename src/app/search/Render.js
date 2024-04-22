"use client";

import React, {useEffect, useContext} from "react";

import {AppContext} from "../layout";
import styled from "styled-components";
import COLORS, {tagColors} from "../../../data/colors";
import SuperSearchBar from "./components/SuperSearchBar";
import SearchResults from "./components/SearchResults";
import Head from "next/head";
import {
    SearchIcon,
    TagIcon,
    BookOpenIcon,
    PlusIcon,
} from "@heroicons/react/solid";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamation} from "@fortawesome/free-solid-svg-icons";
import ReportForm from "../../../components/banners/ReportForm";
import {useState} from "react";
import {FaPlus} from "react-icons/fa6";

const Render = ({articlesFetch, superTags}) => {
    // list of all articles tags
    const [tags, setTags] = React.useState([]);
    // tags filtered by search text
    const [searchTags, setSearchTags] = React.useState([]);
    // search text
    const [text, setText] = React.useState("");
    // list of currently applied tags
    const [filterTags, setFilterTags] = React.useState([]);
    // all articles
    const [articles, setArticles] = useState(articlesFetch);
    // articles filtered by selected tags
    const [filterArticles, setFilterArticles] = React.useState(articlesFetch);
    const [callFilter, setCallFilter] = React.useState([]);
    // number of articles rendered
    const [renderCount, setRenderCount] = React.useState(100);
    const [firstRender, setFirstRender] = React.useState(true);
    // article elements to display on screen
    const [renderArticles, setRenderArticles] = React.useState([]);
    const [alphaTags, setAlphaTags] = React.useState(
        superTags.sort(function (a, b) {
            var textA = a.text.toUpperCase();
            var textB = b.text.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        })
    );

    // Set articles on global context
    const [context, setContext] = useContext(AppContext);

    // set tags based on context
    useEffect(() => {
        if (context.tags.length > 0) {
            setSearchTags(context.tags);
        }
    }, []);

    // was used to change view. Can be removed I think.
    const [view, setView] = React.useState(false);
    const changeView = () => {
        setView((prevView) => {
            return !prevView;
        });
    };

    // length of filtered articles
    const articlesLength = filterArticles.length;
    // length of all articles
    const allArticlesLength = articles.length;

    // renders more articles by 100
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
        // find the tag to remove
        const item = tags.find((tag) => {
            return tag.id === id;
        });
        // push it to end of search tags
        pushSearchTag(item);
        // remove it from the tags
        setTags((prevTags) => {
            const tags = prevTags.filter((tag) => {
                return tag.id !== id;
            });
            return [...tags];
        });
        // remove it from filter tags
        setFilterTags((prevTags) => {
            const tags = prevTags.filter((tag) => {
                return tag.id !== id;
            });
            return [...tags];
        });
        // clear the text
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

    // removes all the tags selected by the user in the search bar
    function clearAllSearchTags() {

        // add the search tags to all tags and filter tags
        setFilterTags(prev => {
            return [...prev, ...searchTags];
        });

        setTags(prev => {
            return [...prev, ...searchTags];
        });

        // remove all search tags
        setSearchTags([]);

    }


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
                <meta name="robots" content="follow, index"/>
                <meta property="og:type" content={meta.type}/>
                <meta property="og:site_name" content="Primal Enjoyer"/>
                <meta property="og:description" content={meta.description}/>
                <meta property="og:title" content={meta.title}/>
                <meta property="og:image" content={meta.image}/>
                <meta property="article:published_time" content={meta.date}/>
                <link rel="canonical" href={meta.image}/>
                <meta property="og:url" content={meta.link}/>
                <meta name="keywords" content={meta.keywords}/>

                <meta name="description" content={meta.description}/>
            </Head>
            <div className='pt-20 px-4 mb-32'>
                {/** Title header */}
                <div className='text-center mb-6'>
                    <h1 className="res-heading-2xl mb-2">
                        Browse Articles
                    </h1>
                    <h3 className="res-heading-base">
                        Filter primal diet Q&A transcription articles by tag
                    </h3>
                </div>
                {/** End of title header */}

                {/** Search bar*/}
                <div className='max-w-7xl mx-auto'>
                    <div className='max-w-3xl mx-auto mb-8'>
                        <div>
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
                                clearAllSearchTags={clearAllSearchTags}
                            />
                        </div>
                    </div>
                    {/** End of search bar */}

                    {/** Search results */}
                    <div colors={COLORS}>
                        <SearchResults
                            allArticles={articlesFetch}
                            articles={renderArticles}
                        />
                        {articlesLength >= 100 && (
                            <div className="flex justify-center">
                                <div className='flex flex-col items-center'>
                                    <p className='mb-4 text-slate-500'>{filterArticles.length - renderArticles.length} more...</p>
                                    <FaPlus
                                        onClick={IncreaseRender}
                                        className='text-4xl cursor-pointer text-slate-500 hover:text-slate-950 transition'
                                    />
                                </div>

                            </div>
                        )}
                    </div>
                    {/** End of search results */}
                </div>


            </div>
        </>
    );
};

export default Render;
