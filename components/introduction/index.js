import styled from "styled-components";
import SectionTwo from "./SectionTwo";
import SectionThree from "./sectionThree";
import SectionFour from "./sectionFour";
import SubmitBtn from "../../components/Buttons/SubmitBtn";
const Content = styled.div`
  padding-top: 6rem;
  background-color: #fff;
  text-align: center;
  & > div {
    margin-bottom: 196px;
  }
  .button-spec {
    display: none;
  }
`;

const SectionOne = styled.div`
  max-width: 640px;
  margin: 0 auto;

  & > * {
    margin-bottom: 2rem;
  }
  .hero {
    max-width: 100%;
    margin: 0 auto;
    margin-top: 6rem;
    img {
      width: 100%;
    }
  }
`;

const Introduction = (props) => {
  return (
    <Content>
      {/*
      <SectionOne className="section">
        
        <h1>Welcome Primal Enjoyer</h1>
        <p className="contrast">
          {" "}
          Primal diet officially created by Aajonus Vonderplanitz in 1997 after
          his release of the book, “We Want To Live”. He had already been
          experimenting with raw meat since 1976 and had cured 100s of patients
          at this point.{" "}
        </p>
        <SubmitBtn text="Primal Search" link="/" className="button-spec" />
        <div className="hero">
          <img src="/logo.jpg" alt="Aajonus" />
        </div>
      </SectionOne>

      <SectionTwo />
      <SectionThree />
      */}
      <SectionFour />
    </Content>
  );
};

export default Introduction;
