import React from "react";
import styled from "styled-components";
import COLORS from "../../../Data/colors";

const Header = styled.div`
  background-color: ${(props) => props.colors.ultraLightBlue};
  padding: 2rem 0;
`;

const index = () => {
  return (
    <>
      <Header colors={COLORS}>
        <h2>How Can You Start?</h2>
      </Header>
      <div>words</div>
    </>
  );
};

export default index;
