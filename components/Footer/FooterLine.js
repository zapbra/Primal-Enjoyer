import React from "react";
import Link from "next/link";
import styled from "styled-components";
import COLORS from "../../Data/colors";

const Lines = styled.div`
  h3 {
    color: ${(props) => props.colors.white};
    font-weight: 500;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
  p {
    color: ${(props) => props.colors.offWhite};
    font-weight: 400;
    font-size: 18px;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

const FooterLine = ({ lines }) => {
  const lineElems = lines.map((lines, index) => {
    if (index === 0) {
      return (
        <Link href={`/${lines[1]}`}>
          <h3>{lines[0]}</h3>
        </Link>
      );
    } else {
      return (
        <Link href={`/${lines[1]}`}>
          <p>{lines[0]}</p>
        </Link>
      );
    }
  });
  return <Lines colors={COLORS}>{lineElems}</Lines>;
};

export default FooterLine;
