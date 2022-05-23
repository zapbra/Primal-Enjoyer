import React from "react";
import styled from "styled-components";
import COLORS from "../Data/colors";

const UnknownPage = styled.div`
  overflow: hidden;
  h1 {
    padding: 1rem 2rem;

    background-color: ${(props) => props.colors.darkBlue};
    color: ${(props) => props.colors.white};
  }
  @media only screen and (max-width: 575px) {
    h1 {
      font-size: 2.441rem;
    }
  }
`;

const Unknown = () => {
  return (
    <UnknownPage colors={COLORS}>
      <h1 className="align-center">This page is still under development...</h1>
      <div className="bg"></div>
    </UnknownPage>
  );
};

export default Unknown;
