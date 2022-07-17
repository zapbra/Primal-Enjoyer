import React from "react";
import styled from "styled-components";
import TextInstructions from "./TextInstructions";
import Gif from "./Gif";

import COLORS from "../../Data/colors";
const Title = styled.div`
  text-align: center;
  padding: 1rem;
  background-color: ${(props) => props.colors.ultraLightBlue};
`;

const Content = styled.div`
  display: flex;
  margin-bottom: 4rem;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

const index = () => {
  return (
    <>
      <Title colors={COLORS}>
        <h2>How To Use</h2>
      </Title>
      <Content>
        <TextInstructions />
        <Gif />
      </Content>
    </>
  );
};

export default index;
