import React from "react";
import Link from "next/link";
import styled from "styled-components";
import COLORS from "../../data/colors";
import FooterLine from "./FooterLine";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

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
    position: relative;
    padding: 0.5rem 0.25rem;
    box-shadow: 5px 5px ${(props) => props.colors.darkBlue},
      5px 5px 0px 3px white;

    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.colors.ultraLightBlue};
    }
    h3 {
      color: ${(props) => props.colors.darkBlue};
    }
    &:active {
      box-shadow: none;
      right: -5px;
      top: 5px;
    }
  }
  @media only screen and (max-width: 1050px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Footer = () => {
  return (
    <FooterElem colors={COLORS}>
      <FooterLine text="Search" link="/search" title="Search" />
      <FooterLine text="Home" link="/" title="Home" />

      <FooterLine
        text="Encyclopedia"
        link="/encyclopedia"
        title="Encyclopedia"
      />
      <FooterLine text="Categories" link="/categories" title="Categories" />
      {/* <FooterLine
        text="Testimonials"
        link="/testimonials"
        title="Testimonials"
      /> */}
      <FooterLine text="Polls" link="/polls" title="Polls" />
      <FooterLine text="Contact" link="/contact" title="Contact" />
      <Link href="https://www.instagram.com/primalenjoyer/">
        <FontAwesomeIcon icon={faInstagram} className="icon-lg white" />
      </Link>
      <a href="#top" title="top of page">
        <div className="top">
          <h5>
            Back <br></br>To Top
          </h5>
        </div>
      </a>
    </FooterElem>
  );
};

export default Footer;
