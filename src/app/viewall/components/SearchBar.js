import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../../../data/colors";
import SearchResults from "./SearchResults";

const Cont = styled.div`
  max-width: 600px;
  padding: 32px;
  margin: 0 auto;
  position: relative;
  @media only screen and (max-width: 800px) {
    padding: 32px 16px 16px 16px;
  }
  @media only screen and (max-width: 400px) {
    padding: 32px 8px 8px 8px;
  }
  input {
    border-radius: 32px;
    max-height: 20px !important;
    width: 90%;
    &:focus {
      border: none;
    }
  }

  .search-icon {
    width: 10%;
    cursor: pointer;
    border-radius: 50%;
    height: 100%;
    &:hover {
      background-color: ${(props) => props.colors.lightGrey};
      border: 1px solid ${(props) => props.colors.darkBlue};
    }
  }
  .search-outer-cont {
    display: flex;
    align-items: center;
  }
  .search-bar-cont {
    background-color: ${(props) => props.colors.ultraLightBlue};
    max-width: 100%;
    width: 100%;
    border: 1px solid ${(props) => props.colors.darkBlue};
    border-radius: 32px;
    height: 46px;
    display: inline-flex;
    align-items: center;
    padding-left: 4px;
    padding-right: 4px;
    &:focus-within {
      background-color: #fff;
      border-radius: 32px 32px 0 0;
      input {
        background-color: #fff;
      }
    }
    @media only screen and (max-width: 550px) {
      width: 100%;
    }
  }
`;
const SearchBar = ({
  posts,
  searchValue,
  postList,
  updateSearch,
  searchResults,
  addTag,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownEl = useRef(null);
  const handleClickOutside = useCallback(
    (e) => {
      if (
        showDropdown &&
        e.target.closest(".dropdown-holder") !== dropdownEl.current
      ) {
        setShowDropdown(false);
      }
    },
    [showDropdown, setShowDropdown, dropdownEl]
  );
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);
  return (
    <Cont colors={COLORS}>
      <div className="search-outer-cont">
        <form
          onClick={() => setShowDropdown(true)}
          className="search-bar-cont "
        >
          <input type="text" value={searchValue} onChange={updateSearch} />
          <div className="search-icon flex-center flex-inline justify-center">
            <FontAwesomeIcon icon={faSearch} className="icon-blue icon-ssm" />
          </div>
        </form>

        <p className=" mar-left-8 blue inline-block "> ({postList.length})</p>
      </div>
      {showDropdown && (
        <div className="dropdown-holder" ref={dropdownEl}>
          <SearchResults searchResults={searchResults} addTag={addTag} />
        </div>
      )}

      <div className="ssm-spacer"></div>
    </Cont>
  );
};

export default SearchBar;
