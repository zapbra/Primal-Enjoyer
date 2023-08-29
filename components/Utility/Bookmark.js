import { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import COLORS from "../../data/colors";
import toast, { Toaster } from "react-hot-toast";

const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.darkGrey};
  position: relative;
  cursor: pointer;
  background-color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  display: flex;
  transition: border 0.25s ease;
  .grey {
    transition: color 0.25s ease;
  }
  &:hover {
    border: 1px solid ${(props) => props.colors.darkBlue};
    .grey {
      color: ${(props) => props.colors.darkBlue} !important;
    }
  }
`;

const Bookmark = ({ addBookmark, removeBookmark, bookmarkState }) => {
  const bookmarkRef = useRef(null);

  const toggleBookmark = () => {
    // add animation

    // if bookmarked remove bookmark
    if (bookmarkState) {
      toast.success("Recipe removed!");
      removeBookmark();
      // add bookmark
    } else {
      toast.success("Recipe saved!");
      addBookmark();
    }
    bookmarkRef.current.classList.add("shift-text");
    setTimeout(() => {
      bookmarkRef.current.classList.remove("shift-text");
    }, 1000);
  };
  return (
    <Cont
      colors={COLORS}
      onClick={toggleBookmark}
      ref={bookmarkRef}
      className="rounded-shadow"
    >
      <Toaster />
      <h5 className={bookmarkState ? "mar-right-16" : "mar-right-16 grey"}>
        {bookmarkState ? "Saved" : "Save"}
      </h5>
      <FontAwesomeIcon
        icon={faBookmark}
        className={
          bookmarkState ? "icon-sm relative dark-blue" : "icon-sm relative grey"
        }
      />
    </Cont>
  );
};

export default Bookmark;
