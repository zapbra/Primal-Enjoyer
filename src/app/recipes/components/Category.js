import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWater } from "@fortawesome/free-solid-svg-icons";
import { lightColors } from "../../../../data/colors";
import { returnRandom } from "../../../../utils/Functions";

const Cont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${(props) => props.colors.black};
  border-radius: 32px;
  padding: 4px 8px;
  margin-bottom: 8px;
  cursor: pointer;
  background-color: ${(props) => props.color};
  transition: padding 0.5s ease;
  &:hover {
    padding: 4px 32px;
  }
  &:active {
    box-shadow: none;
  }
`;

const Category = ({ name, icon }) => {
  const color = returnRandom(lightColors);

  console.log("color");
  console.log(color);
  return (
    <Cont
      color={returnRandom(lightColors)}
      colors={COLORS}
      className="box-shadow-2"
    >
      <div className="flex align-center">
        <FontAwesomeIcon
          icon={faWater}
          className="mar-right-8 icon-ssm black"
        />
        <h5 className="black">{name}</h5>
      </div>

      <FontAwesomeIcon icon={faPlus} className="icon-sm black" />
    </Cont>
  );
};

export default Category;
