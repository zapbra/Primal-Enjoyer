import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  padding: 8px;
  border: 1px solid ${(props) => props.colors.grey};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.25s ease;
  &:hover {
    background-color: ${(props) => props.colors.green};
  }
`;

const Tag = ({ name, addTag }) => {
  return (
    <Cont colors={COLORS}>
      <p className="">{name}</p>
      <FontAwesomeIcon icon={faPlus} className="black icon-ssm " />
    </Cont>
  );
};

export default Tag;
