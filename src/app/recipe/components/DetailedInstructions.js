import React from "react";
import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import COLORS from "../../../../data/colors";

const Cont = styled.div`
  max-width: 800px;
  padding: 16px;
`;

const DetailedInstructions = ({ detailedInstructions }) => {
  return (
    <Cont colors={COLORS} className="mar-bottom-64">
      <ReactMarkdown>{detailedInstructions}</ReactMarkdown>
    </Cont>
  );
};

export default DetailedInstructions;
