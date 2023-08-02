import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import { ArrowCircleRightIcon } from "@heroicons/react/solid";

const SectionCont = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 4px;
  border: 2px solid ${(props) => props.colors.darkBlue};
  width: 200px;
  height: 224px;
  border-radius: 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  position: relative;
  transition: 0.5s ease;
  top: 0px;
  background-color: ${(props) => props.colors.veryLightBlue};
  .lrg-icon {
    transition: color 0.5s ease;
  }
  &:hover {
    top: -10px;
    background-color: ${(props) => props.colors.ultraLightBlue};
    .lrg-icon {
      color: white;
      background-color: ${(props) => props.colors.darkBlue};
      border-radius: 32px;
    }
  }

  .icon-spec {
    width: 40px;
    height: 40px;
    border-radius: 3rem;
    background-color: ${(props) => props.colors.green};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    &:hover {
      color: pink;
    }
  }
`;
const Section = ({ title, index, link }) => {
  return (
    <a href={link}>
      <SectionCont colors={COLORS}>
        <div className="icon-spec">
          <h4>{index}</h4>
        </div>

        <h4>{title}</h4>
        <ArrowCircleRightIcon className="lrg-icon" />
      </SectionCont>
    </a>
  );
};

export default Section;
