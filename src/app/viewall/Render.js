"use client";

import {useState, useEffect} from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import PostHolder from "./components/PostHolder";
import Sort from "./components/Sort";
import TagBox from "./components/TagBox";
import SearchBar from "./components/SearchBar";

const Cont = styled.div`
  margin-top: 70px;
  min-height: 100vh;
  background-color: ${(props) => props.colors.ultraLightBlue};
  .header {
    padding-top: 56px;
    padding-bottom: 56px;
  }
  .posts {
    background-color: #fff;
    border-top: 1px solid ${(props) => props.colors.darkBlue};
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
  }
`;

const Render = ({sortedPosts, onlyTitles, tagsSort, tagsUnique}) => {
    const [posts, setPosts] = useState(sortedPosts);
    const [filteredPosts, setFilteredPosts] = useState(sortedPosts);
    const [searchValue, setSearchValue] = useState("");
    const [tags, setTags] = useState(tagsUnique);
    const [postList, setPostList] = useState(onlyTitles);
    const [searchResults, setSearchResults] = useState(tags);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagsTracker, setTagsTracker] = useState(tags);

    const updateSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchValue(value);

        setSearchResults((prev) => {
            return tagsTracker.filter((tag) => {
                return tag.title.includes(value);
            });
        });
    };

    const updateFilteredPosts = () => {
        setFilteredPosts((prev) => {
            if (selectedTags.length === 0) {
                return posts;
            }
            return posts.map((post) => {
                return {
                    ...post,
                    post: post.post.filter((post) =>
                        selectedTags.every((tag) => {
                            return post.tags.some((postTag) => postTag.title === tag);
                        })
                    ),
                };
            });
        });
        filterState.function();
    };

    // on articles line click, add tag to tag list and remove from two tag list arrays
    const addTag = (text) => {
        setSelectedTags((prev) => {
            return [...prev, text];
        });

        setSearchResults((prev) => {
            return [...prev].filter((tag) => tag.title !== text);
        });

        setTagsTracker((prev) => {
            return [...prev].filter((tag) => tag.title !== text);
        });
    };
    // remove from tag box, asdd back to two tag list arrays
    const removeTag = (text) => {
        setSelectedTags((prev) => {
            return [...prev].filter((tag) => tag !== text);
        });
        setSearchResults((prev) => {
            return [...prev, {title: text}].sort((a, b) =>
                a.title > b.title ? 1 : -1
            );
        });

        setTagsTracker((prev) => {
            return [...prev, {title: text}];
        });
    };
    const sortAlphaPosts = () => {
        setFilteredPosts((prev) => {
            return [...prev.sort((a, b) => (a.title > b.title ? 1 : -1))];
        });
        setFilterState(filterStates[0]);
    };

    useEffect(() => {
        updateFilteredPosts();
    }, [selectedTags]);

    const sortAlphaPostsDesc = () => {
        setFilteredPosts((prev) => {
            return [...prev.sort((a, b) => (a.title > b.title ? -1 : 1))];
        });
        setPosts((prev) => {
            return [...prev.sort((a, b) => (a.title > b.title ? -1 : 1))];
        });
        setFilterState(filterStates[1]);
    };

    const sortPostsByLength = () => {
        setFilteredPosts((prev) => {
            return [
                ...prev.sort((a, b) => (a.post.length >= b.post.length ? -1 : 1)),
            ];
        });
        setPosts((prev) => {
            return [
                ...prev.sort((a, b) => (a.post.length >= b.post.length ? -1 : 1)),
            ];
        });
        setFilterState(filterStates[2]);
    };

    const sortPostsByLengthDesc = () => {
        setFilteredPosts((prev) => {
            return [
                ...prev.sort((a, b) => (a.post.length >= b.post.length ? 1 : -1)),
            ];
        });
        setPosts((prev) => {
            return [
                ...prev.sort((a, b) => (a.post.length >= b.post.length ? 1 : -1)),
            ];
        });
        setFilterState(filterStates[3]);
    };
    const [filterStates, setFilteredStates] = useState([
        {title: "a-z", function: sortAlphaPosts},
        {title: "z-a", function: sortAlphaPostsDesc},
        {title: "asc", function: sortPostsByLength},
        {title: "desc", function: sortPostsByLengthDesc},
    ]);
    const [filterState, setFilterState] = useState({
        title: "a-z",
        function: sortAlphaPosts,
    });
    return (
        <Cont colors={COLORS}>
            <div className="header">
                <div className="center-inline">
                    <h1 className="text-shadow text wrap">View All Posts</h1>
                </div>
            </div>
            <section className="posts">
                <TagBox selectedTags={selectedTags} removeTag={removeTag}/>

                <SearchBar
                    posts={posts}
                    searchValue={searchValue}
                    postList={postList}
                    updateSearch={updateSearch}
                    searchResults={searchResults}
                    addTag={addTag}
                />

                <Sort
                    sortAlphaPosts={sortAlphaPosts}
                    sortAlphaPostsDesc={sortAlphaPostsDesc}
                    sortPostsByLength={sortPostsByLength}
                    sortPostsByLengthDesc={sortPostsByLengthDesc}
                />
                <div className="mar-bottom-one"></div>
                <PostHolder posts={filteredPosts} selectedTags={selectedTags}/>
                <div className="sm-spacer"></div>
            </section>
        </Cont>
    );
};

export default Render;
