import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faWater } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  background-color: rgba(255, 24, 24, 0.5);
  padding: 4px 8px;
  border-radius: 32px;

  .delete {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.colors.lightGrey};
    }
    &:active {
      background-color: ${(props) => props.colors.ultraLightGrey};
    }
  }
`;

const RemoveTag = ({ name, removeTag }) => {
  return (
    <Cont
      colors={COLORS}
      className="flex align-center space-between"
      onClick={() => removeTag(name)}
    >
      <div className="flex align-ceneter">
        <FontAwesomeIcon icon={faWater} className="black icon-sm mar-right-8" />
        <h5 className="black">{name}</h5>
      </div>
      <div className="delete">
        <FontAwesomeIcon icon={faClose} className="icon-sm black" />
      </div>
    </Cont>
  );
};

export default RemoveTag;
