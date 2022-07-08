import React from "react";
import styled from "styled-components";
import COLORS from "../../../Data/colors";

const Container = styled.div`
  margin-bottom: 128px;
  hr {
    margin-bottom: 2rem;
  }
  p {
    text-align: left;
    margin-bottom: 1rem;
  }
`;

const Title = styled.div`
  display: flex;
  margin-bottom: 1rem;
  gap: 2rem;
  @media only screen and (max-width: 599px) {
    flex-direction: column;
  }
`;

const Text = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  gap: 1rem;
  @media only screen and (max-width: 599px) {
    margin: 0 auto;
  }
`;

const Image = styled.div`
  flex: 1;
  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
  }
`;
const Icon = styled.div`
  background-color: ${(props) => props.colors.green};
  border-radius: 3rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const line = ({ title, image, paragraphs, index }) => {
  return (
    <Container>
      <Title>
        <Text>
          <Icon colors={COLORS}>
            <h4>{index}</h4>
          </Icon>
          <h3>{title}</h3>
        </Text>
        <Image>
          <img src={image} alt={title} />
        </Image>
      </Title>
      <hr />
      {paragraphs.map((para) => {
        return <p>{para}</p>;
      })}
    </Container>
  );
};

export default line;
