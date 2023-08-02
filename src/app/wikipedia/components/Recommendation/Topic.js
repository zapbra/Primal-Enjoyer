import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../../data/colors";

const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.darkBlue};
`;

const Topic = () => {
  return <Cont colors={COLORS}>hey</Cont>;
};

export default Topic;
