import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { UpperCase } from "../../../../utils/Functions";

const Cont = styled.div`
  max-width: 1016px;
  margin: 0 auto;

  padding: 16px;
  @media only screen and (max-width: 400px) {
    padding: 8px;
  }
`;
const TextPreview = ({ categories }) => {
  const [categoryLines, setCategoryLines] = useState(
    categories.map((category, index) => {
      return (
        <Link key={index} href={`/Category/${category.title}`}>
          <p className="inline-block mar-right-8">
            {UpperCase(category.title)},{" "}
          </p>
        </Link>
      );
    })
  );
  return <Cont colors={COLORS}>{categoryLines}</Cont>;
};

export default TextPreview;
