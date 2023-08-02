import React from "react";
import styled from "styled-components";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import COLORS from "../../../../data/colors";

const Cont = styled.div`
  display: flex;
  width: 100%;
  margin-top: 2rem;
  justify-content: center;
  align-items: center;
  .lrg-icon {
    cursor: pointer;
    color: ${(props) => props.colors.green};
    &:hover {
      background-color: ${(props) => props.colors.grey};
    }
  }
  .active {
    text-decoration: underline;
  }
  .index {
    margin-right: 2px;
    margin-left: 2px;
    cursor: pointer;
    text-decoration-color: ${(props) => props.colors.green};
    &:hover {
      h4 {
        text-decoration: underline;
      }
    }
    h4 {
      color: ${(props) => props.colors.green};
    }
  }
`;
const PageIndex = ({
  length,
  page,
  incrementPage,
  decrementPage,
  setCustomPage,
}) => {
  const indexes = [];
  for (let i = 0; i < length; i++) {
    indexes.push(
      <a href="#topCata" key={i}>
        <div
          onClick={() => setCustomPage(i)}
          className={i == page ? "index active" : "index"}
        >
          <h4>{i + 1}</h4>
        </div>
      </a>
    );
  }
  return (
    <Cont colors={COLORS}>
      {page > 0 && (
        <a href="#topCata">
          <ChevronLeftIcon onClick={decrementPage} className="lrg-icon" />
        </a>
      )}
      {indexes}
      {page < length - 1 && (
        <a href="#topCata">
          <ChevronRightIcon onClick={incrementPage} className="lrg-icon" />
        </a>
      )}
    </Cont>
  );
};

export default PageIndex;
