import React from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid black;
  width: 100%;

  background-repeat: no-repeat;
  background-size: 100%;
  -webkit-box-shadow: 3px 14px 27px -1px rgba(0, 0, 0, 0.36);
  box-shadow: 3px 14px 27px -1px rgba(0, 0, 0, 0.36);
  img {
    width: 100%;
    object-fit: scale-down;
  }
`;

const Gif = () => {
  return (
    <Container>
      <img src={"/index/gif.gif"} alt="How To Use" />
    </Container>
  );
};

export default Gif;
