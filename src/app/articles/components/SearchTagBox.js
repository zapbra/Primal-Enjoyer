import React from "react";
import styled from "styled-components";
import {nanoid} from "nanoid";
import SearchTag from "./SearchTag";

const SearchTagBox = (props) => {
    const tags = props.tags.map((tag, index) => {
        return (
            <SearchTag
                removeSearchTag={props.removeSearchTag}
                key={nanoid()}
                id={tag.id}
                title={tag.title}
                color={tag.color}
            />
        );
    });

    return (
        <TagBoxElem colors={props.colors}>
            <TagsCont>
                {tags} nigga
                <form onSubmit={props.submitSearch}>
                    {/*<input*/}
                    {/*    type="text"*/}
                    {/*    value={props.text}*/}
                    {/*    onChange={props.updateText}*/}
                    {/*    placeholder="coconut cream..."*/}
                    {/*/>*/}

                </form>
            </TagsCont>
        </TagBoxElem>
    );
};

export default SearchTagBox;
