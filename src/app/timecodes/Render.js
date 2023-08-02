"use client";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import Preview from "./components/Preview";

const Cont = styled.div`
  min-height: 100vh;
  padding-top: 160px;
  background-color: #fff;
  padding-bottom: 128px;
  .previews-holder {
    max-width: 600px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
    @media only screen and (max-width: 400px) {
      padding: 8px;
    }
  }
`;

const Render = ({ previewData }) => {
  const [previews, setPreviews] = useState(
    previewData.map((timecode, index) => (
      <Preview key={index} title={timecode.name} index={index} />
    ))
  );

  return (
    <Cont colors={COLORS}>
      <div className="previews-holder">{previews}</div>
    </Cont>
  );
};

export default Render;
