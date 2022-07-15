import React from "react";
import styled from "styled-components";
import TextInstructions from "./TextInstructions";

const Title = styled.div`
  border-bottom: 1px solid black;
  text-align: center;
  padding: 1rem;
`;

const Content = styled.div``;

const index = () => {
  return (
    <>
      <Title>
        <h2>How To Use</h2>
      </Title>
      <Content>
        <TextInstructions />
      </Content>
    </>
  );
};

export default index;
