import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";

const Cont = styled.div`
  p {
    cursor: pointer;
    text-decoration: underline;
  }
  &:hover {
    p {
      color: ${(props) => props.colors.darkBlue};
    }
  }
`;
const PostHolder = ({ title, created_at }) => {
  return (
    <Cont colors={COLORS}>
      <Link href={{ pathname: `/encyclopedia/${title}` }} passHref>
        <p className="black small">{title}</p>
      </Link>
    </Cont>
  );
};

export default PostHolder;
