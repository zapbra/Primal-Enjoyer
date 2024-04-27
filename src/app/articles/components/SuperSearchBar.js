import React from "react";
import styled from "styled-components";
import SuperSearchTagBox from "./SuperSearchTagBox";


const SuperSearchBar = (props) => {
    return (
        <div className="box-shadow">
            <SuperSearchTagBox
                pushTag={props.pushTag}
                removeSearchTag={props.removeSearchTag}
                tags={props.tags}
                colors={props.colors}
                text={props.text}
                updateText={props.updateText}
                submitSearch={props.submitSearch}
                pushSearchTag={props.pushSearchTag}
                removeTag={props.removeTag}
                filterTags={props.filterTags}
                clearText={props.clearText}
                clearAllSearchTags={props.clearAllSearchTags}
            />
        </div>
    );
};

export default SuperSearchBar;
