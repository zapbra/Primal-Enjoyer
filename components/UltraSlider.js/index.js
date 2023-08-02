import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { useState, useRef } from "react";
import { UpperCase } from "../../utils/Functions";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";

const Cont = styled.div`
  height: 200px;
  max-width: 1016px;
  width: 100%;
  margin: 0 auto;

  .tablet-hide {
    @media only screen and (max-width: 1030px) {
      display: none !important;
    }
  }
  border: 8px outset ${(props) => props.colors.ultraLightBlue};

  display: flex;
  padding: 0.5rem 0;
  background: ${(props) => props.colors.ultraLightBlue};
  .sidebar {
    width: 64px;
    display: flex;
    flex-shrink: 0;
    border: 1px solid ${(props) => props.colors.darkBlue};
    background-color: ${(props) => props.colors.grey};
    transition: background-color 0.25s ease;
    align-items: center;
    cursor: pointer;
    @media only screen and (max-width: 800px) {
      width: 44px;
    }
    @media only screen and (max-width: 440px) {
      width: 32px;
    }
    .icon-chev {
      color: ${(props) => props.colors.darkBlue};
      transition: color 0.25s ease;
      width: 100%;
      height: 100%;
    }

    &:hover {
      background-color: ${(props) => props.colors.darkBlue};
      .icon-chev {
        color: ${(props) => props.colors.grey};
      }
    }
  }
  .hide-articles {
    width: 888px;

    overflow-x: hidden;
    height: 100%;
    position: relative;
  }
  .articles {
    background: ${(props) => props.colors.desatDarkBlue};
    width: calc(${(props) => props.count} * 128px);
    height: 100%;
    display: flex;
    position: absolute;
    transition: left 0.5s ease;

    .article {
      width: 120px;
      height: 100%;
      border: 1px solid black;
      background: #fff;

      position: relative;
      transition: transform 0.25s ease;

      &:hover {
        transform: scale(0.95);
      }
      cursor: pointer;
      .text {
        word-wrap: break-word;
        position: absolute;
        max-width: 100%;
        z-index: 1;
        background-color: ${(props) => props.colors.darkBlue};
        padding: 4px;
        h6 {
          color: ${(props) => props.colors.ultraLightBlue};
        }
      }
    }
  }
`;

const Index = ({ catagories }) => {
  const count = catagories.length;
  const [iteration, setIteration] = useState(0);
  const sliderRef = useRef(null);
  const slideContRef = useRef(null);
  const slideChange = 874;
  const articleElems = catagories.map((catagory, index) => {
    return (
      <Link
        href={{
          pathname: `/Category/${catagory.title}`,
        }}
        key={index}
      >
        <div className="article">
          <div className="text">
            <h6>{UpperCase(catagory.title)}</h6>
          </div>
          <Image
            alt={catagory.title}
            src={catagory.coverImage.url}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </Link>
    );
  });

  const increaseIteration = () => {
    const left = sliderRef.current.offsetLeft;

    if (iteration >= Math.floor(count / 7)) {
    } else {
      //setIteration(iteration + 1);
      if (left - slideChange <= Math.floor(count / 7) * slideChange * -1) {
        sliderRef.current.style.left = Math.floor(count / 7) * slideChange * -1;
      } else {
        sliderRef.current.style.left = `${
          left - slideContRef.current.offsetWidth
        }px`;
      }
    }
  };

  const decreaseIteration = () => {
    const left = sliderRef.current.offsetLeft;
    if (left + slideChange > 0) {
      sliderRef.current.style.left = `0px`;
    } else {
      sliderRef.current.style.left = `${
        left + slideContRef.current.offsetWidth
      }px`;
    }
  };

  const left = "-" + iteration * slideChange + "px";

  return (
    <>
      <div className="mar-bottom-32 tablet-hide">
        <Cont count={count} colors={COLORS}>
          <div className="sidebar" onClick={decreaseIteration}>
            <ChevronDoubleLeftIcon className="icon-chev" />
          </div>

          <div ref={slideContRef} className="hide-articles">
            <div ref={sliderRef} className="articles" style={{ left: left }}>
              {articleElems}
            </div>
          </div>
          <div className="sidebar" onClick={increaseIteration}>
            <ChevronDoubleRightIcon className="icon-chev" />
          </div>
        </Cont>
      </div>
    </>
  );
};

export default Index;
