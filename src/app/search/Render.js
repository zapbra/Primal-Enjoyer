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
import SuperSearchTagBox from "@/app/search/components/SuperSearchTagBox";

/**
 * Returns a sorted string array list of tags
 * @param tagsInput an unsorted array list of tag objects
 * @returns {*}
 */
function formatTags(tagsInput) {
    return tagsInput.sort((a, b) => {
        let textA = a.text.toUpperCase();
        let textB = b.text.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
    }).map(tag => {
        return tag.text;
    });
}

const RENDER_ITERATION = 100;

const Render = ({articlesFetch, superTags}) => {
    const [renderCount, setRenderCount] = useState(RENDER_ITERATION);
    // list of all articles
    const [articles, setArticles] = useState(articlesFetch);
    // list of articles filtered when the user selects tags
    const [filterArticles, setFilterArticles] = useState(articlesFetch);
    // the articles to render on the screen based on selected tags
    const [renderArticles, setRenderArticles] = useState(articlesFetch.slice(0, renderCount));
    // list of all tags
    const [tags, setTags] = useState(formatTags(superTags));
    // list of tags to actually render based on selected tags and render articles
    const [renderTags, setRenderTags] = useState(formatTags(superTags));
    // list of tags to filter through when the search text changes.
    // It's a cache of the tags when a filter tag is added/removed
    const [cachedTags, setCachedTags] = useState(formatTags(superTags));
    // list of tags selected by user to render articles
    const [selectedTags, setSelectedTags] = useState([]);
    // the search text
    const [text, setText] = useState("");


    const articlesLength = filterArticles.length;

    // UPDATE THIS TO ONLY UPDATE AFTER INTERVALS TO REDUCE RE-RENDERS
    const updateText = (newSearchText) => {
        // only filter selected tags if a word is added to the text (longer)
        // filter all tags based on search text
        setRenderTags(prev => {
            const filteredTags = cachedTags.filter(tag => {
                return tag.includes(newSearchText);
            });
            return filteredTags;
        });
        // otherwise all tags need to be filtered

        // update the search text
        setText(prev => {
            return newSearchText;
        });

    }


    // increase the article render count by 100 if it isn't greater than total number of articles
    const increaseRender = () => {
        // the count to set renderCount to
        let newRenderCount = 0;
        // make sure render count isn't longer than filter articles with new increase
        // if it it just make it to filter articles size
        if (renderCount + RENDER_ITERATION > filterArticles.length) {
            newRenderCount = filterArticles.length;
            // else you can increase it by regular iteration of 100
        } else {
            newRenderCount = renderCount + RENDER_ITERATION;
        }

        setRenderCount(newRenderCount);
        // update the render articles length
        setRenderArticles(filterArticles.slice(0, newRenderCount));

    }


    // When the user clicks on a tag, adds it to the list, and filters the articles to display ones with the
    // updated tag list
    const selectTag = (tagText) => {
        const selectedTagsCopy = selectedTags;
        selectedTagsCopy.push(tagText);

        setSelectedTags(selectedTagsCopy);


        // get filtered articles
        const filterArticlesCopy = filterArticles.filter(article => {
            // iterate over each article tags and compare each tag to all the selected tags to find a match
            // this checks to see if the article contains a searched tag
            return selectedTagsCopy.every(selTag => {
                return article.tags.some(tag => {
                    return selTag === tag.text;
                })
            })
        });


        const uniqueTagsMap = new Map();

        for (let i = 0; i < filterArticlesCopy.length; i++) {
            const articleTags = filterArticlesCopy[i].tags;
            articleTags.forEach(tag => {
                if (uniqueTagsMap.get(tag.text) === undefined) {
                    uniqueTagsMap.set(tag.text, tag.text);
                }
            });
        }
        // set cached tags based on articles
        let uniqueTagsArray = Array.from(uniqueTagsMap.keys());

        uniqueTagsArray = uniqueTagsArray.sort((a, b) => {
            let textA = a.toUpperCase();
            let textB = b.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        // set cached tags based on articles
        setCachedTags(uniqueTagsArray);
        // reset render count so only 100 articles get rendered each time a new tag is added
        setRenderCount(RENDER_ITERATION);
        // update state
        setFilterArticles(filterArticlesCopy);
        setRenderArticles(filterArticlesCopy.slice(0, RENDER_ITERATION));
        setRenderTags(uniqueTagsArray);
        // clear the text
        setText("");
    }

    const removeTag = (tagText) => {
        let selectedTagsCopy = selectedTags;
        // remove tag from selected tag list
        selectedTagsCopy = selectedTagsCopy.filter(tag => {
            return tag !== tagText;
        });

        setSelectedTags(selectedTagsCopy);


        const filterArticlesCopy = articles.filter(article => {
            return selectedTagsCopy.every(selTag => {
                return article.tags.some(tag => {
                    return tag.text === selTag;
                })
            });
        });

        const uniqueTagsMap = new Map();

        for (let i = 0; i < filterArticlesCopy.length; i++) {
            const articleTags = filterArticlesCopy[i].tags;
            articleTags.forEach(tag => {
                if (uniqueTagsMap.get(tag.text) === undefined) {
                    uniqueTagsMap.set(tag.text, tag.text);
                }
            });
        }

        let uniqueTagsArray = Array.from(uniqueTagsMap.keys());

        uniqueTagsArray = uniqueTagsArray.sort((a, b) => {
            let textA = a.toUpperCase();
            let textB = b.toUpperCase();
            return textA < textB ? -1 : textA > textB ? 1 : 0;
        });
        // set cached tags based on articles
        setCachedTags(uniqueTagsArray);

        // set filter tags based on articles and search text
        uniqueTagsArray = uniqueTagsArray.filter(tag => {
            return tag.includes(text);
        })

        // update state
        setFilterArticles(filterArticlesCopy);
        setRenderArticles(filterArticlesCopy.slice(0, renderCount));
        setRenderTags(uniqueTagsArray);


    };

    const clearAllSelectedTags = () => {
        // Make render tags whole tag list
        setRenderTags(tags);
        // clear all selected tags
        setSelectedTags([]);
        // reset render count to 100
        setRenderCount(RENDER_ITERATION);
        // set filtered articles to all of them
        setFilterArticles(articles);
        // set render articles to first 100
        setRenderArticles(articles.slice(0, RENDER_ITERATION));
    }

    /*
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

        updateTags();
        /*
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
        let localTags = [];
        console.log("called update tags");
        filterArticles.map((article) => {
            article.tags.map((tag) => {
                if (
                    localTags.some((innerTag) => {
                        return innerTag.text === tag.text;
                    })
                ) {
                } else {
                    localTags.push(tag);
                }
            });
        });

        setTags((prevTags) => {
            let returnTags = localTags.map((tag, index) => {
                let newTag = {
                    title: tag.text,
                    color: generateColor(),
                    id: `tag-${index + 1}`,
                };
                return newTag;
            });
            console.log('return tags');
            console.log(returnTags)
            returnTags = returnTags.sort(function (a, b) {
                var textA = a.title.toUpperCase();
                var textB = b.title.toUpperCase();
                return textA < textB ? -1 : textA > textB ? 1 : 0;
            });

            return returnTags;
        });

        setFilterTags((prevTags) => {
            let returnTags = localTags.map((tag, index) => {
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

    } */


    const meta = {
        title: "Raw Primal Search Bar",
        description:
            "Search for any topic discussed by Aajonus Vonderplantiz. Raw meat articles, Aajonus Vonderplanitz questions and answers about raw food and nutrition topics.",
        link: "https://www.primalenjoyer.com/search",
        type: "website",
        date: "2024-04-24 20:30:00.000",
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
                            <SuperSearchTagBox
                                text={text}
                                updateText={updateText}
                                removeSearchTag={() => {
                                }}
                                pushTag={() => {
                                }}
                                selectTag={selectTag}
                                removeTag={removeTag}
                                tags={[]}
                                submitSearch={() => {
                                }}
                                colors={COLORS}
                                pushSearchTag={() => {
                                }}

                                renderTags={renderTags}
                                selectedTags={selectedTags}
                                clearText={() => {
                                }}
                                clearAllSelectedTags={clearAllSelectedTags}
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
                                        onClick={increaseRender}
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
