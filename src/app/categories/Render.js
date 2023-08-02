"use client";

import React from "react";
import styled from "styled-components";

import Container from "./components/Container";
import { useState } from "react";
import Slider from "../../../components/UltraSlider.js";
import TextPreview from "./components/TextPreview";

const Cont = styled.div`
  .main-title {
    background: rgb(0, 43, 103);
    background: linear-gradient(
      90deg,
      rgba(0, 43, 103, 1) 0%,
      rgba(233, 241, 253, 1) 51%,
      rgba(0, 43, 103, 1) 100%
    );
  }
`;
const Title = styled.div`
  text-align: center;
  background: #fff;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  padding: 0.5rem;
  word-break: break-all;
  h1 {
    margin-bottom: 1rem;
  }
`;

const Categories = ({ catagoriesFetch }) => {
  const [catagories, setCatagories] = useState(
    catagoriesFetch.sort(function (a, b) {
      var textA = a.title.toUpperCase();
      var textB = b.title.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    })
  );

  return (
    <Cont>
      <div className="content ">
        <Title className="sm-spacer main-title">
          <h2 className="text-shadow">Categories</h2>
          <p className="dark-blue text-shadow">
            Click any catagory to view the articles contained.
          </p>
        </Title>
        <Slider catagories={catagories} />

        <TextPreview categories={catagories} />

        <div className="ssm-spacer-bot-res"></div>
        <Container catagories={catagories} />
      </div>
    </Cont>
  );
};

export default Categories;
