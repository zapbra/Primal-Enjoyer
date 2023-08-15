import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  padding: 32px;
  display: flex;
  justify-content: center;
  .searchbar-holder {
    display: inline-flex;
    border-radius: 32px;
    background-color: #fff;
    padding: 4px;
    border: 1px solid ${(props) => props.colors.grey};
    .contrast {
      transition: color 0.25s ease;
    }
    &:focus-within {
      background-color: #fff;
      border: 1px solid ${(props) => props.colors.blue2};
      .contrast {
        color: ${(props) => props.colors.blue2} !important;
      }
    }
  }
  .search-icon {
    background-color: ${(props) => props.colors.darkBlue};
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    transition: box-shadow 0.25s ease;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    &:hover {
      box-shadow: none;
    }
    &:active {
      background-color: ${(props) => props.colors.blue2};
    }
  }
  input {
    border-radius: 32px;
    outline: none;
    border: none;
    background-color: #fff;
    min-width: 5px !important;
  }
  .icon-search {
    position: relative;
    top: 50%;
    transform: translateY(-25%);
    right: 8px;
  }
`;

const SearchBar = ({ text, setText }) => {
  return (
    <Cont colors={COLORS}>
      <div className="searchbar-holder">
        <input
          type="text"
          placeholder="Tomato cheese sauce"
          text={text}
          onChange={(e) => setText(e.target.value)}
        />
        {/* <div className="search-icon light-blue">
          <FontAwesomeIcon icon={faSearch} className="icon-ssm" />
        </div> */}
        <div className="icon-search">
          <FontAwesomeIcon icon={faSearch} className="icon-ssm contrast" />
        </div>
      </div>
    </Cont>
  );
};

export default SearchBar;
