import React, {useEffect} from "react";
import {nanoid} from "nanoid";
import SearchTag from "./SearchTag";
import {useState, useCallback, useRef} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {FaArrowDown, FaMagnifyingGlass} from "react-icons/fa6";

const SuperSearchTagBox = (props) => {
    const searchBar = useRef(null);
    const [extendDropdown, setExtendDropdown] = useState(false);
    const [renderTagCount, setRenderTagCount] = useState(50);
    const tagElements = props.renderTags.map((tag, index) => {
        return (
            <div
                key={index}
                onClick={() => selectTagWrapper(tag)}
                className="px-2 py-1 cursor-pointer hover:bg-slate-50 transition hover:text-blue-500"
            >
                <p>{tag}</p>
            </div>
        )
    });


    const [showDropdown, setShowDropdown] = useState(false);

    function Focus() {
        setShowDropdown(true);
    }

    // hides the dropdown
    function deFocus() {
        setShowDropdown(false);
    }

    const dropdownEl = useRef();

    const tagsText = props.tags.map((tag) => {

        return tag.title;
    });

    const showMore = () => {
        if (renderTagCount + 50 <= props.renderTags.length) {
            setRenderTagCount(renderTagCount + 50);
        } else {
            setRenderTagCount(props.renderTags.length);
        }
    };

    // When a tag is clicked it will call the parent remove tag function
    // and hide the dropdown/defocus the articles bar
    const selectTagWrapper = (tagText) => {
        props.selectTag(tagText);
        deFocus();
        searchBar.current.blur();
    }


    const tags = props.selectedTags.map((tag, index) => {
        return (
            <SearchTag
                removeTag={props.removeTag}
                deFocus={deFocus}
                key={nanoid()}
                id={index}
                text={tag}
            />
        );
    });

    const handleClickOutside = useCallback(
        (e) => {
            if (
                showDropdown &&
                e.target.closest(".form-dropdown") !== dropdownEl.current
            ) {
                setShowDropdown(false);
            }
        },
        [showDropdown, setShowDropdown, dropdownEl, props.renderTags]
    );

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);

    // shows the dropdown


    function toggleExtendDropdown() {
        setExtendDropdown((prev) => !prev);
    }

    // Adds a tag to selected tag list when articles/enter key pressed on articles bar
    function submitSearch(e) {
        e.preventDefault();
        // get first tag
        const selectedTag = props.renderTags[0];
        // select the first tag
        props.selectTag(selectedTag);
        deFocus();
        //searchBar.current.blur();
    }


    return (
        <div>
            <div className='relative mb-4 flex-wrap flex gap-4'>{tags}
                {props.selectedTags.length > 0 &&
                    <p onClick={props.clearAllSelectedTags}
                       className='underline text-slate-500 hover:text-slate-900 cursor-pointer transition'>Clear</p>}
            </div>


            <form
                className="form-dropdown block relative"
                onSubmit={submitSearch}
                ref={dropdownEl}
            >
                <div className="relative">

                    {/** Search bar */}
                    <label className="input input-bordered flex items-center gap-2 py-8 px-4 relative">
                        <input ref={searchBar} type="text" value={props.text}
                               onChange={(e) => props.updateText(e.target.value)}
                               onFocus={Focus}
                               className="grow min-w-5" placeholder="coconut cream"/>
                        {props.text !== "" && (
                            <FontAwesomeIcon
                                onClick={() => props.updateText("")}
                                icon={faCircleXmark}
                                className="text-slate-500 absolute right-20 cursor-pointer hover:text-slate-950 transition res-text-base"
                            />
                        )}
                        <button
                            className="transition bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            <FaMagnifyingGlass
                                className='res-text-base'
                            />
                        </button>
                    </label>
                    {/** End of articles bar*/}


                </div>

                {/** Search tags dropdown */}
                {showDropdown && (
                    <div className='bg-white shadow absolute w-full'>
                        <div
                            className={extendDropdown ? 'max-h-96 overflow-y-scroll transition' : 'max-h-60 overflow-y-scroll transition'}

                        >
                            {tagElements}

                        </div>
                        <div
                            className='flex justify-center p-2 bg-slate-200 text-blue-500 cursor-pointer hover:bg-blue-500 hover:text-slate-200 transition'
                            onClick={toggleExtendDropdown}
                        >
                            <FaArrowDown
                                className={extendDropdown ? 'text-2xl rotate-180 transition-all' : 'text-2xl rotate-0 transition-all'}/>
                        </div>
                    </div>
                )}
                {/** End of articles tags dropdown */}

            </form>
        </div>
    );
};

export default SuperSearchTagBox;
