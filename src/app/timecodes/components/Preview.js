import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";

const Cont = styled.div`
  width: 100%;
  margin-bottom: 32px;
  .cont {
    border: 1px solid ${(props) => props.colors.darkBlue};
    padding: 16px;
    flex: 1;

    transition: background-color 0.25s ease, box-shadow 0.25s ease;
    background-color: ${(props) => props.colors.ultraLightBlue};
    text-align: center;
    cursor: pointer;
    &:hover {
      background-color: #fff;
      box-shadow: none;
    }
    &:active {
      background: rgb(255, 255, 255);
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(233, 241, 253, 1) 50%,
        rgba(255, 255, 255, 1) 100%
      );
    }
  }
  .num {
    margin-right: 16px;
    @media only screen and (max-width: 400px) {
      margin-right: 8px;
    }
  }
`;

const Preview = ({ title, index }) => {
  return (
    <Cont colors={COLORS} className="flex align-center">
      <p className="blue num">({index + 1})</p>
      <div className="cont box-shadow-2">
        <Link href={`/timecode/${title}`}>
          <h4 className="">{title}</h4>
        </Link>
      </div>
    </Cont>
  );
};

export default Preview;
