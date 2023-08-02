"use client";
import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTurnDown } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../../../data/colors";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import Featured from "@/app/timecodes/components/Featured";

const Cont = styled.div`
  min-height: 100vh;
  background-color: ${(props) => props.colors.ultraLightBlue};

  .header {
    background-color: ${(props) => props.colors.ultraLightBlue};
    padding: 120px 16px 16px;
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
    text-align: center;
  }
  .content {
    padding: 32px;
    @media only screen and (max-width: 800px) {
      padding: 16px;
    }
    @media only screen and (max-width: 400px) {
      padding: 0;
    }
  }

  .text-holder {
    background-color: #fff;
    margin: 0 auto;
    max-width: 800px;
    border-right: 1px solid ${(props) => props.colors.ultraLightGrey};
    border-left: 1px solid ${(props) => props.colors.ultraLightGrey};
    padding: 16px;
  }
  .link-back-holder {
    max-width: 800px;
    margin: 0 auto;
    padding: 16px 16px 0px;
    @media only screen and (max-width: 400px) {
      padding: 8px;
    }
  }
`;

import React from "react";

const Render = ({ timecode }) => {
  return (
    <Cont colors={COLORS}>
      <div className="header">
        <h2 className="text-shadow">{timecode.name} </h2>
      </div>
      <div className="link-back-holder">
        <Link
          href={{
            pathname: `/timecodes`,
          }}
        >
          <div className="mar-bottom-one  sm-icon-circle">
            <FontAwesomeIcon
              style={{ transform: "rotate(90deg)" }}
              icon={faTurnDown}
              className="icon-blue icon-med"
            />
          </div>
        </Link>
      </div>
      <div className="content">
        {/*  <Sorter /> */}
        <Featured titles={timecode.article_titles} />
        <div className="ssm-spacer"></div>
        <div className="text-holder">
          <ReactMarkdown className="markdown-2">
            {timecode.content}
          </ReactMarkdown>
        </div>
        <p id="hello">hello</p>
      </div>
    </Cont>
  );
};

export default Render;
