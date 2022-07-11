import React from "react";
import Link from "next/link";
import styled from "styled-components";
import COLORS from "../../Data/colors";

const Line = styled.div`
  border: 1px solid white;
  padding: 1rem 0.5rem;
  transition: background-color 0.5s ease;
  h4 {
    color: #fff;
  }
  &:hover {
    background-color: white;
    h4 {
      color: ${(props) => props.colors.blue};
    }
  }
`;

const FooterLine = ({ text, link }) => {
  return (
    <Link href={link} passHref>
      <a rel="noopener noreferrer">
        <Line colors={COLORS}>
          <h4>{text}</h4>
        </Line>
      </a>
    </Link>
  );
};

export default FooterLine;
