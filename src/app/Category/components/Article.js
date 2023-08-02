import Link from "next/link";
import React from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { ReturnPreview } from "../../../../utils/Functions";
import { RichText } from "@graphcms/rich-text-react-renderer";

const Cont = styled.div`
  width: 240px;
  max-height: 360px;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid ${(props) => props.colors.grey};
  margin-right: 4px;
  margin-left: 4px;
  margin-bottom: 8px;
  border: 1px solid black;
  transition: box-shadow 0.25s ease;

  &:hover {
    box-shadow: none;
    .preview {
      background: rgb(233, 241, 253);
      background: linear-gradient(
        90deg,
        rgba(233, 241, 253, 1) 0%,
        rgba(255, 255, 255, 1) 51%,
        rgba(233, 241, 253, 1) 100%
      );
    }
  }
  .article-title {
    border-bottom: 1px solid black;
    background-color: ${(props) => props.colors.ultraLightBlue};
    padding: 8px;
  }
  .year {
  }
  .preview {
    background-color: #fff;
    padding: 8px;
    p {
      font-size: 14px;
    }
  }
`;

const Article = ({ title, content, year, index }) => {
  return (
    <Link
      href={{
        pathname: `/article/${title}`,
      }}
    >
      <Cont className="box-shadow" colors={COLORS}>
        <div className="article-title">
          <p className="small contrast">#{index + 1}</p>
          <h5 className="text-shadow">{title}</h5>
          {year && (
            <div className="year hover">
              <p className="contrast">{year}</p>
            </div>
          )}
        </div>
        <div className="preview">
          <p>{ReturnPreview(content.raw)}</p>
        </div>
      </Cont>
    </Link>
  );
};

export default Article;
