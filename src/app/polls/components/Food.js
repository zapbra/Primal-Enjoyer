import Image from "next/image";
import { useState, useEffect } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.form`
  padding: 8px;
  width: 320px;
  border-radius: 8px;
  position: relative;
  border: 1px solid ${(props) => props.colors.grey};
  cursor: pointer;

  transition: box-shadow 0.25s ease;
  &:nth-of-type(1) {
    margin-right: 4px;
  }
  &:nth-of-type(2) {
    margin-left: 4px;
  }
  @media only screen and (max-width: 300px) {
    width: 100%;
    margin-bottom: 16px;
    &:nth-of-type(1) {
      margin-right: 0px;
    }
    &:nth-of-type(2) {
      margin-left: 0px;
    }
  }
  button {
    cursor: pointer;
    width: 100%;
    &:disabled {
      cursor: default;
    }
  }

  &:hover {
    box-shadow: none;
    button:not([disabled]) {
      .black.icon-sm {
        color: ${(props) => props.colors.black};
      }
    }
  }
  &:active {
    border: 1px solid ${(props) => props.colors.black};
  }
  .black.icon-sm {
    color: ${(props) => props.colors.lightBlack};
  }
  .image-holder {
    width: 100%;
    height: 200px;
  }
  @media only screen and (max-width: 500px) {
    .image-holder {
      height: 140px;
    }
  }
  .text {
    padding: 16px 8px 8px;
  }
`;

const Food = ({ name, url, tags, submitPoll, loading, index }) => {
  const submitForm = (e) => {
    e.preventDefault();
    submitPoll(index);
  };
  return (
    <Cont
      colors={COLORS}
      className={loading ? "gradient" : "box-shadow-2"}
      onSubmit={submitForm}
      noValidate={loading}
    >
      <button type="submit" disabled={loading}>
        <div className="image-holder relative">
          <Image src={url} priority fill style={{ objectFit: "cover" }} />
        </div>
        <div className="flex space-between align-center text">
          <h5 className="black ">{name}</h5>
          <FontAwesomeIcon
            style={{ transform: "rotate(90deg)" }}
            icon={faArrowTurnUp}
            className="icon-sm black"
          />
        </div>
      </button>
    </Cont>
  );
};

export default Food;
