import React from "react";
import styled from "styled-components";
import COLORS from "../../Data/colors";
import FooterLine from "./FooterLine";

const FooterElem = styled.div`
  background-color: ${(props) => props.colors.blue};
  padding: 1rem 2rem;
  display: flex;
  gap: 2rem;
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
    </FooterElem>
  );
};

export default Footer;
