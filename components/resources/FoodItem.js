import styled from "styled-components";

const MarginSmall = styled.div`
  padding: 1rem;

  border-radius: 0.5rem;
  & > div {
    margin-bottom: 1rem;
  }
`;

const Title = styled.div`
  display: inline-block;
  border: 2px solid black;
  border-radius: 1rem;
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  padding: 2px 15px;
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
    width: 100%;
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

const FoodItem = (props) => {
  return (
    <MarginSmall>
      <Title>
        <h2>{props.title}</h2>
      </Title>
      <br />
      <ContentLine colors={props.colors}>
        <p className="semi-lg-bold">Address</p>

        <p className="semi-bold padding-hor-md">{props.address}</p>
      </ContentLine>
      <ContentLine colors={props.colors}>
        <p className="semi-lg-bold">Website</p>
        <a target="_blank" href={props.website}>
          <p className="semi-bold">{props.title}</p>
        </a>
      </ContentLine>
      <Description>
        <p className="semi-lg-bold">Description</p>
        <p>{props.description}</p>
      </Description>
    </MarginSmall>
  );
};

export default FoodItem;
