import React from "react";
import Link from "next/link";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Line = styled.div`
  transition: background-color 0.5s ease;
  h5 {
    color: #fff;
  }
  &:hover {
    background-color: white;
    h5 {
      color: ${(props) => props.colors.blue};
    }
  }
  @media only screen and (max-width: 760px) {
    padding: 1rem 2rem;
  }
`;

const FooterLine = ({ text, link }) => {
  return (
    <Link href={link}>
      <Line colors={COLORS}>
        <h5>{text}</h5>
      </Line>
    </Link>
  );
};

export default FooterLine;
