import React from "react";
import styled from "styled-components";
import colors from "../../Data/colors";

const Content = styled.div`
  padding: 0.5rem;

  -webkit-box-shadow: 3px 14px 27px -1px rgba(0, 0, 0, 0.36);
  box-shadow: 3px 14px 27px -1px rgba(0, 0, 0, 0.36);
`;

const List = styled.div``;
const Icon = styled.ul`
  border-radius: 3rem;
  width: 32px;
  height: 32px;
`;

const TextInstructions = () => {
  return (
    <Content>
      <List>

      </List>
    </Content>
  );
};

export default TextInstructions;
