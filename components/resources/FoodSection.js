import styled from "styled-components";
import COLORS from "../../Data/colors";
const WhiteBg = styled.div`
  padding-top: 2rem;
  border-top: 2px solid black;
  background-color: #fff;
`;

const MarginSmall = styled.div`
  padding: 1rem;

  border-radius: 0.5rem;
  & > div {
    margin-bottom: 1rem;
  }
`;
const SectionHeader = styled.div`
  display: flex;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  .flex-one {
    &:nth-of-type(1) {
      border-right: 1px solid black;
    }
    &:nth-of-type(2) {
      background-color: ${(props) => props.colors.ultraLightBlue};
      border-left: 1px solid black;
    }
  }
`;

const Title = styled.div`
  display: inline-block;
  border: 2px solid black;
  border-radius: 1rem;
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  padding: 2px 5px;
`;

const ContentLine = styled.div`
  display: inline-block;
  border: 2px solid black;
  background-color: ${(props) => props.colors.ultraLightBlue};
  p {
    display: inline-block;
    &:nth-of-type(1) {
      border-right: 1px solid black;
      min-width: 150px;
      text-align: center;
      background: #fff;
    }
  }
  a {
    p {
      min-width: 300px !important;
      background-color: ${(props) => props.colors.ultraLightBlue} !important;
    }
  }
  .title {
  }
`;
const Description = styled.div`
  p {
    &:nth-of-type(1) {
      border: 2px solid black;
      min-width: 150px;
      display: inline-block;
      text-align: center;
      margin-bottom: 1rem;
    }
    &:nth-of-type(2) {
      border: 2px solid black;
      box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
      padding: 5px;
    }
  }
`;

const FoodSection = (props) => {
  return (
    <WhiteBg>
      <SectionHeader colors={COLORS}>
        <div className="flex-one">
          <h2 className="text-center">Ottawa</h2>
        </div>
        <div className="flex-one"></div>
      </SectionHeader>
      <MarginSmall>
        <Title>
          <h2>Ottawa Farmers Market</h2>
        </Title>
        <ContentLine colors={COLORS}>
          <p className="semi-lg-bold">Address</p>
          <a
            target="_blank"
            href="https://www.google.com/search?q=landsowne+farmers+market&rlz=1C1GCEB_enCA847CA847&ei=alJLYt7tPNCKptQP5fyz2Ac&ved=0ahUKEwjeyuSSnfv2AhVQhYkEHWX-DHsQ4dUDCA4&uact=5&oq=landsowne+farmers+market&gs_lcp=Cgdnd3Mtd2l6EAMyBAgAEA0yBAgAEA0yBAgAEA0yCgguEMcBEK8BEA0yBggAEBYQHjIGCAAQFhAeMgYIABAWEB4yBggAEBYQHjIICAAQCBANEB46BQgAEJECOg4ILhCABBCxAxDHARCjAjoRCC4QgAQQsQMQxwEQowIQ1AI6DgguEIAEELEDEMcBENEDOhEILhCABBCxAxCDARDHARCjAjoLCC4QgAQQsQMQgwE6CwguELEDEMcBEKMCOgoILhCxAxCDARBDOgQIABBDOgcILhDUAhBDOgsILhDHARCvARCRAjoLCC4QgAQQxwEQowI6CgguEMcBEK8BEEM6BAguEEM6DQguEMcBEK8BENQCEEM6DQguELEDEMcBEK8BEEM6DQguELEDEMcBEK8BEAo6BwgAELEDEAo6CggAELEDEIMBEAo6CwguEIAEEMcBEK8BOgcIABDJAxAKOgUIABCSAzoKCC4QxwEQrwEQCjoECAAQCjoHCAAQsQMQQzoKCAAQsQMQgwEQQzoHCAAQyQMQDToGCAAQDRAeSgQIQRgASgQIRhgAUABY8xlgtxpoAHAAeACAAZsBiAGjGJIBBDAuMjOYAQCgAQHAAQE&sclient=gws-wiz"
          >
            <p className="semi-bold">1000 Exhibition Way, Ottawa</p>
          </a>
        </ContentLine>
        <ContentLine colors={COLORS}>
          <p className="semi-lg-bold">Website</p>
          <a target="_blank" href="https://ottawafarmersmarket.ca/">
            <p className="semi-bold">https://ottawafarmersmarket.ca/</p>
          </a>
        </ContentLine>
        <Description>
          <p className="semi-lg-bold">Description</p>
          <p>
            This is a farmers market located in the middle of Ottawa. It is
            quite large with a variety of vendors. Some of which include, blue
            shoes honey, Earth’s Harvest Farm, and Arc Acres. There is lots of
            high quality grass fed meat, raw honey, fruit, vegetables, starches
            and homemade products. Although, much of it is frozen.
          </p>
        </Description>
      </MarginSmall>
    </WhiteBg>
  );
};

export default FoodSection;
