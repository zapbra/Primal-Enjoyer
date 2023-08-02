import React, { useState } from "react";
import styled from "styled-components";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Catagory from "./Catagory";
import { nanoid } from "nanoid";
import COLORS from "../../../../data/colors";
import PageIndex from "./pageIndex";

const Cont = styled.div`
  background: rgb(0, 19, 46);
  background: linear-gradient(
    90deg,
    rgba(0, 19, 46, 1) 0%,
    rgba(0, 43, 103, 1) 50%,
    rgba(0, 19, 46, 1) 100%
  );
  border-top: 2px solid black;
  .cont {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 4rem;

    @media only screen and (max-width: 677px) {
      justify-content: center;
      padding: 32px;
    }
    @media only screen and (max-width: 400px) {
      padding: 16px;
    }
  }
`;

const Container = ({ catagories }) => {
  const [page, setPage] = useState(0);
  const catagoryElems = catagories.map((catagory, index) => {
    return (
      <Catagory
        key={nanoid()}
        title={catagory.title}
        articles={catagory.article}
        img={catagory.coverImage.url}
        index={index}
      />
    );
  });
  const splitCatas = [];
  const articlesPer = 15;
  const pages = Math.ceil(catagories.length / articlesPer);
  for (let i = 0; i < pages; i++) {
    splitCatas.push([]);
  }
  let counter = 0;
  catagoryElems.map((catagory, index) => {
    splitCatas[Math.floor(index / articlesPer)].push(catagory);
  });

  function incrementPage() {
    if (page + 1 > splitCatas.length) {
    } else {
      setPage(page + 1);
    }
  }

  function decrementPage() {
    if (page - 1 < 0) {
    } else {
      setPage(page - 1);
    }
  }

  function setCustomPage(index) {
    setPage(index);
  }

  const [listRef] = useAutoAnimate();

  return (
    <Cont colors={COLORS} id="topCata">
      <div className="cont" ref={listRef}>
        {splitCatas[page]}
      </div>
      <PageIndex
        length={splitCatas.length}
        page={page}
        incrementPage={incrementPage}
        decrementPage={decrementPage}
        setCustomPage={setCustomPage}
      />
    </Cont>
  );
};

export default Container;
