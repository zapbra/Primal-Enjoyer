import styled from "styled-components";
import SectionTwo from "./SectionTwo";
const Content = styled.div`
  background-color: #fff;
  text-align: center;
  padding: 3rem;
`;

const SectionOne = styled.div`
  width: 640px;
  margin: 0 auto;
  margin-bottom: 10rem;
  & > * {
    margin-bottom: 2rem;
  }
  .hero {
    width: 100%;
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
      <SectionOne>
        <h1>Welcome Primal Enjoyer</h1>
        <p>
          {" "}
          Primal diet officially created by Aajonus Vonderplanitz in 1997 after
          his release of the book, “We Want To Live”. He had already been
          experimenting with raw meat since 1976 and had cured 100s of patients
          at this point.{" "}
        </p>
        <div className="hero">
          <img src="/logo.jpg" alt="Aajonus" />
        </div>
      </SectionOne>
      <SectionTwo />
    </Content>
  );
};

export default Introduction;
