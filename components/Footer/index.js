import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import COLORS from "../../Data/colors";
import FooterLine from "./FooterLine";

const FooterElem = styled.div`
  background-color: ${(props) => props.colors.blue};
  padding: 1rem 2rem;
  display: flex;
  gap: 2rem;
  margin-top: 4rem;
  justify-content: space-between;
  @media only screen and (max-width: 760px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Footer = () => {
  return (
    <FooterElem colors={COLORS}>
      <FooterLine
        lines={[
          ["Course", "course"],
          ["Introduction", "course/introduction"],
          ["Why Do The Diet", "course/whydothediet"],
          ["How To Start", "course/howtostart"],
        ]}
      />
      <FooterLine
        lines={[
          ["Documents", "documents"],
          [
            "Books",
            "https://drive.google.com/drive/u/0/folders/1YxtuNUHFupiccplUtJQjBSjil8y1QeK9",
          ],
          ["Recipes", "recipes"],
        ]}
      />
      <FooterLine lines={[["Search", ""]]} />
      <FooterLine lines={[["Resources", "resources"]]} />
      <a href="" target="_blank" rel="noreferrer">
        <FontAwesomeIcon
          icon={faInstagram}
          size="3x"
          className="icon-white blue-icon-hover"
        />
      </a>
    </FooterElem>
  );
};

export default Footer;
