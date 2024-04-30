"use client";

import React from "react";

import SearchResults from "./components/SearchResults";
import {useState} from "react";
import {FaPlus} from "react-icons/fa6";
import SuperSearchTagBox from "@/app/articles/components/SuperSearchTagBox";

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

// amount to increase article render length at a time
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
    // list of tags to filter through when the articles text changes.
    // It's a cache of the tags when a filter tag is added/removed
    const [cachedTags, setCachedTags] = useState(formatTags(superTags));
    // list of tags selected by user to render articles
    const [selectedTags, setSelectedTags] = useState([]);
    // the articles text
    const [text, setText] = useState("");

    const articlesLength = filterArticles.length;

    // UPDATE THIS TO ONLY UPDATE AFTER INTERVALS TO REDUCE RE-RENDERS
    const updateText = (newSearchText) => {
        // only filter selected tags if a word is added to the text (longer)
        // filter all tags based on articles text
        setRenderTags(prev => {
            const filteredTags = cachedTags.filter(tag => {
                return tag.includes(newSearchText.toLowerCase());
            });
            return filteredTags;
        });
        // otherwise all tags need to be filtered

        // update the articles text
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

        // set filter tags based on articles and articles text
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


    return (

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
                {/** End of articles bar */}

                {/** Search results */}
                <div>
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
                {/** End of articles results */}
            </div>


        </div>
    );
};

export default Render;
