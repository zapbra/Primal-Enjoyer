import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import { nanoid } from "nanoid";
import Image from "next/image";

const Container = styled.div`
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

const ImageCont = styled.div`
  flex: 1;
  flex-basis: 100%;
  height: 100%;
  min-height: 160px;
  position: relative;
  width: 100%;
`;
const Icon = styled.div`
  background-color: ${(props) => props.colors.green};
  border-radius: 3rem;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-shrink: 0;
`;

const Line = ({ title, image, paragraphs, index }) => {
  return (
    <Container className="section">
      <Title>
        <Text>
          <Icon colors={COLORS}>
            <h4>{index}</h4>
          </Icon>
          <h3>{title}</h3>
        </Text>
        <ImageCont>
          <Image
            src={image}
            alt={title}
            fill
            style={{ objectFit: "cover" }}
            quality="100"
          />
        </ImageCont>
      </Title>
      <hr />
      {paragraphs.map((para) => {
        return <p key={nanoid()}>{para}</p>;
      })}
    </Container>
  );
};

export default Line;
