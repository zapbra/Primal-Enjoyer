import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Image from "next/image";
import COLORS from "../../../../data/colors";
import { UpperCase } from "../../../../utils/Functions";

const Cont = styled.div`
  width: 240px;
  height: 440px;
  //border: 1px solid ${(props) => props.colors.darkBlue};
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid grey;
  cursor: pointer;
  @media only screen and (max-width: 550px) {
    width: 100%;
  }
  margin-bottom: 36px;

  .line {
    width: 100%;
    height: 2px;
    background-color: black;
  }
  box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset,
    rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  transition: box-shadow 0.25s ease, transform 0.25s ease;

  &:hover {
    box-shadow: none;
    transform: scale(0.95);
  }
  .title-article {
    width: 200px;
    padding: 0.5rem;
    border: 1px solid black;
    justify-content: center;
    text-align: center;
    position: absolute;
    left: calc(50% - 100px);
    height: 100px;
    display: flex;
    align-items: center;
    top: calc(50% - 50px);
    word-wrap: break-word;
    background-color: ${(props) => props.colors.ultraLightBlue};
    @media only screen and (max-width: 375px) {
      width: 100%;
      left: calc(50% - 50%);
    }
  }
  &:hover {
    .icon {
      background-color: ${(props) => props.colors.darkBlue};
      h4 {
        color: ${(props) => props.colors.green};
      }
    }
  }
  .icon {
    transition: background-color 0.25s ease, color 0.25s ease;
    background-color: ${(props) => props.colors.green};
    border-radius: 3rem;
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-shrink: 0;
    position: absolute;
    top: 4px;
    left: 4px;
    border: 1px solid ${(props) => props.colors.darkBlue};
    h4 {
      transition: color 0.25s ease;
    }
  }
`;

const Articles = styled.div`
  background-color: ${(props) => props.colors.veryLightBlue};
  padding: 8px 8px 8px;
  bottom: 0;
  width: 100%;
  position: absolute;
`;

const ArticleCont = styled.div``;

const Article = ({ title }) => {
  return (
    <Link
      href={{
        pathname: `/article/${title}`,
      }}
    >
      <ArticleCont>
        <p className="small">{title}</p>
      </ArticleCont>
    </Link>
  );
};

const Catagory = ({ title, articles, img, index }) => {
  const articleElems = articles.map((article, index) => {
    return (
      <div key={index}>
        <Article title={article.title} />
        <div className="line"></div>
      </div>
    );
  });

  return (
    <Cont colors={COLORS}>
      <Link
        href={{
          pathname: `/Category/${title}`,
        }}
      >
        <div>
          <Image alt={title} src={img} layout="fill" objectFit="cover" />
        </div>

        <div className="title-article">
          <h4 style={{ minWidth: "0" }}>{UpperCase(title)}</h4>
        </div>
        <div className="icon" colors={COLORS}>
          <h4>{index + 1}</h4>
        </div>
      </Link>
      <Articles colors={COLORS}>{articleElems}</Articles>
    </Cont>
  );
};

export default Catagory;
