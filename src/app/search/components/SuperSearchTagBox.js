import React, { useEffect } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import COLORS from "../../../../data/colors";
import SearchTag from "./SearchTag";
import { useState, useCallback, useRef } from "react";
import { ArrowDownIcon } from "@heroicons/react/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const TagBoxElem = styled.div`
  border-radius: 0.5rem;
  max-height: 200px;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  width: 360px;
  @media only screen and (max-width: 426px) {
    width: 100%;
  }
`;

const Content = styled.div`
  .delete-icon {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    &:hover {
      color: black !important;
    }
  }

  .show-more {
    background-color: ${(props) => props.colors.brightBlue} !important;
    padding: 8px 16px;
    text-align: center;
    transition: background-color 0.25s ease;
    &:hover {
      background-color: ${(props) => props.colors.blue} !important;
    }
  }

  .extend {
    max-height: 500px !important;
  }
  .relative {
    width: 100%;
    margin-top: 5px;
  }
`;
const TagsCont = styled.div`
  margin: 10px;
  overflow: auto;
  position: relative;
`;

const FormDropdown = styled.form`
  display: flex;
  justify-content: flex-end;
  position: relative;
  padding: 0.5rem;
`;

const InputLine = styled.input`
  height: 2.5rem;
  width: 100%;

  font-weight: bold;
  border-radius: 0.5rem !important;
  font-size: 1.25rem;
  margin-left: auto;
  &:focus {
    border-radius: 0.5rem 0.5rem 0 0 !important;
  }
  @media only screen and (max-width: 440px) {
    width: 100%;
  }
`;

const DropdownHolder = styled.div`
  position: absolute;
  width: calc(100% - 16px);
  top: 51.5px;

  @media only screen and (min-width: 600px) {
    width: calc(100% - 18px);
  }

  @media only screen and (min-width: 1201px) {
    top: 57.5px;
  }
`;

const Dropdown = styled.div`
  position: relative;
  width: 100%;
  border: 1px solid black;
  max-height: 210px;
  overflow-y: scroll;

  cursor: pointer;

  .item {
    padding-left: 4px;
    background-color: #fff;
    border-bottom: 1px solid ${(props) => props.colors.grey};
    &:hover {
      background: ${(props) => props.colors.green};
    }
  }
`;
const DropdownIcon = styled.div`
  position: relative;
  padding: 4px;
  border: 1px solid black;

  cursor: pointer;
  width: 100%;
  background: ${(props) => props.colors.darkBlue};
  transition: background-color 0.25s ease;
  display: flex;
  justify-content: center;
  &:hover {
    background-color: ${(props) => props.colors.green};
    .icon-green {
      color: ${(props) => props.colors.darkBlue};
    }
  }
  .rotate {
    transform: rotate(180deg);
  }
`;
const SuperSearchTagBox = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [extendDropdown, setExtendDropdown] = useState(false);
  const [renderTagCount, setRenderTagCount] = useState(50);
  const [lines, setLines] = useState([]);
  const [renderTags, setRenderTags] = useState(
    props.filterTags.slice(0, renderTagCount)
  );
  const dropdownEl = useRef();

  const tagsText = props.tags.map((tag) => {
    return tag.title;
  });

  const showMore = () => {
    if (renderTagCount + 50 <= props.filterTags.length) {
      setRenderTagCount(renderTagCount + 50);
    } else {
      setRenderTagCount(props.filterTags.length);
    }
  };

  useEffect(() => {
    setRenderTags(props.filterTags.slice(0, renderTagCount));
    setLines((prev) => {
      const newLines = [];
      for (let tag of props.filterTags.slice(0, renderTagCount)) {
        if (tagsText.includes(tag.title)) {
        } else {
          newLines.push(
            <div
              key={tag.id}
              onClick={() => props.removeTag(tag.id)}
              id={tag.id}
              className="item"
            >
              <p>{tag.title}</p>
            </div>
          );
        }
      }
      renderTagCount < props.filterTags.length &&
        newLines.push(
          <div key={nanoid()} className="item show-more" onClick={showMore}>
            <h5 className="white ">Show More</h5>
          </div>
        );

      return newLines;
    });
  }, [renderTagCount, props.filterTags]);
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

  const handleClickOutside = useCallback(
    (e) => {
      if (
        showDropdown &&
        e.target.closest(".form-dropdown") !== dropdownEl.current
      ) {
        setShowDropdown(false);
      }
    },
    [showDropdown, setShowDropdown, dropdownEl, props.filterTags]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  function Focus() {
    setShowDropdown(true);
  }

  function toggleExtendDropdown() {
    setExtendDropdown((prev) => !prev);
  }

  return (
    <Content colors={COLORS}>
      <TagBoxElem colors={props.colors}>
        <TagsCont>{tags}</TagsCont>
      </TagBoxElem>
      <FormDropdown
        className="form-dropdown"
        onSubmit={props.submitSearch}
        ref={dropdownEl}
      >
        <div className="relative">
          <InputLine
            onFocus={Focus}
            type="text"
            value={props.text}
            onChange={props.updateText}
            placeholder="coconut cream..."
          />
          {props.text != "" && (
            <FontAwesomeIcon
              onClick={props.clearText}
              icon={faCircleXmark}
              className="icon-ssm contrast cursor delete-icon"
            />
          )}
        </div>
        {showDropdown && (
          <DropdownHolder>
            <Dropdown
              className={extendDropdown ? "extend" : ""}
              colors={COLORS}
            >
              {lines}
            </Dropdown>
            <DropdownIcon
              className={extendDropdown ? "extend-icon" : ""}
              onClick={toggleExtendDropdown}
              colors={props.colors}
            >
              <ArrowDownIcon
                className={extendDropdown ? "icon-green rotate" : "icon-green"}
              />
            </DropdownIcon>
          </DropdownHolder>
        )}
      </FormDropdown>
    </Content>
  );
};

export default SuperSearchTagBox;
