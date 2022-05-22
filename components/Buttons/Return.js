import React, { useState, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../Data/colors";

const Button = styled.div`
  background-color: ${(props) => props.colors.darkBlue};
  padding: 0.25rem 0.5rem;
  position: fixed;
  left: 0;
  top: 25px;
  border-radius: 0.5rem;
  box-shadow: 0px 5px 25px 3px rgba(0, 0, 0, 0.8);
  transition: left 1s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &.hide-icon {
    left: -240px;
    transition: left 1s ease;
    .icon-white {
      * {
        transform: rotate(180deg) translate(-100%, -100%);
      }
    }
  }
  .show {
    height: 3rem;
    line-height: 3rem;
    cursor: pointer;
    transition: background-color 0.25s ease;
    &:hover {
      background-color: ${(props) => props.colors.lightGrey};
      h3 {
        color: ${(props) => props.colors.darkBlue};
      }
    }
  }
  .hide {
    cursor: pointer;
    transition: background-color 0.25s ease;
    &:hover {
      background-color: ${(props) => props.colors.lightGrey};
      h3 {
        color: ${(props) => props.colors.darkBlue};
      }
    }
  }
  h3 {
    transition: color 0.25s ease;
    color: ${(props) => props.colors.lightGrey};
    font-weight: 500;
  }
  .hide {
    display: flex;
    flex-direction: column;
  }
`;

const Return = ({ link, text }) => {
  const [shown, setShown] = useState(true);

  const toggleShown = (e) => {
    console.log("k");
    if (shown) {
      setShown(false);
    } else {
      setShown(true);
    }
  };

  return (
    <Button className={shown ? "" : "hide-icon"} colors={COLORS}>
      <Link href={`/${link}`}>
        <div className="show">
          <h3>Back To {text} |</h3>
        </div>
      </Link>
      <div className="hide" onClick={toggleShown}>
        <h3>
          {shown && "Hide"} {!shown && "Show"}
        </h3>
        <FontAwesomeIcon
          icon={faCircleChevronLeft}
          size="xl"
          className="icon-white"
        />
      </div>
    </Button>
  );
};

export default Return;
