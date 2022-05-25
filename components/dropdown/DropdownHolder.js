import React from "react";
import styled from "styled-components";
import COLORS from "../../Data/colors";

const DropdownCont = styled.div`
  background-color: ${(props) => props.colors.white};
`;

const DropdownHolder = () => {
  return (
    <DropdownCont colors={COLORS}>
      <h3>Documents</h3>
    </DropdownCont>
  );
};

export default DropdownHolder;
