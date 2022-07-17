import React from "react";
import styled from "styled-components";
import COLORS from "../../../Data/colors";
import SectionIcon from "./SectionIcon";
const Header = styled.div`
  background-color: ${(props) => props.colors.ultraLightBlue};
  padding: 2rem 0;
  position: relative;
`;

const SelectCont = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
`;

const ContentCont = styled.div``;

const Article = styled.div``;

const index = () => {
  const sections = [
    { title: 'Read "We Want To Live"', index: "1", link: "#one" },
    { title: "Listen To The Workshop", index: "2", link: "#two" },
    { title: "Listen To One Q&A (Optional)", index: "3", link: "#three" },
    { title: "Find Farms or Butchers Near You", index: "4", link: "#four" },
    { title: "Time To Eat Raw Meat", index: "5", link: "#five" },
  ];
  const SectionElems = sections.map((section) => {
    return (
      <SectionIcon
        title={section.title}
        index={section.index}
        link={section.link}
      />
    );
  });
  return (
    <>
      <Header colors={COLORS}>
        <h2>How Can You Start?</h2>
      </Header>
      <SelectCont>{SectionElems}</SelectCont>
    </>
  );
};

export default index;
