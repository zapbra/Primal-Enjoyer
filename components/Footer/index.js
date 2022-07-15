import React from "react";
import styled from "styled-components";
import COLORS from "../../Data/colors";
import FooterLine from "./FooterLine";

const FooterElem = styled.div`
  background-color: ${(props) => props.colors.darkBlue};
  padding: 1rem 2rem;
  display: flex;
  position: relative;
  display: flex;
  justify-content: center;
  padding-bottom: 3rem;

  gap: 2rem;
  .top {
    background: #fff;
    padding: 0.5rem 0.25rem;
    box-shadow: 5px 5px ${(props) => props.colors.darkBlue},
      5px 5px 0px 3px white;
    position: absolute;
    right: 2rem;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.colors.ultraLightBlue};
    }
    h3 {
      color: ${(props) => props.colors.darkBlue};
    }
    &:active {
      box-shadow: none;
      right: 27px;
      top: 21px;
    }
  }
`;

const Footer = () => {
  return (
    <FooterElem colors={COLORS}>
      <a href="#top">
        <div className="top">
          <h3>
            Back <br></br>To Top
          </h3>
        </div>
      </a>
      <FooterLine text="Search" link="/" />
      <FooterLine text="Home" link="/introduction" />
      <FooterLine text="Contact" link="/contact" />
    </FooterElem>
  );
};

export default Footer;
