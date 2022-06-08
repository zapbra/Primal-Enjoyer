import React from "react";
import { BookOpenIcon } from "@heroicons/react/solid";
import styled from "styled-components";
import COLORS from "../../Data/colors";

const Cont = styled.div`
  background-color: ${(props) => props.colors.darkBlue};
  display: flex;
  width: 10rem;
  margin: auto;
  justify-content: space-between;
  box-shadow: 5px 5px 0 rgba(0, 0, 0, 1);
  align-items: center;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  .icon-grey {
    width: 2.5rem;
  }
  h3 {
    &:nth-of-type(1) {
      color: #dc143c;
    }
    color: ${(props) => props.colors.lightBlue};
  }
`;

const Icon = ({ number }) => {
  return (
    <Cont colors={COLORS}>
      <BookOpenIcon className="icon-grey"></BookOpenIcon>
      <h3>x</h3>
      <h3>{number}</h3>
    </Cont>
  );
};

export default Icon;
