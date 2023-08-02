import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";

const Cont = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr 4fr 1fr;

  border-bottom: 1px solid ${(props) => props.colors.grey};
  padding-bottom: 32px;
  margin-bottom: 32px;
  .text {
    margin-left: 32px;
    margin-right: 32px;
    text-align: left;
  }
  .img-holder {
    width: 100%;
    height: 100px;
    position: relative;
    overflow: hidden;
    border-radius: 16px;
  }
  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr 2fr;
    .time {
      grid-row: 1/2;
      margin-bottom: 16px;
      grid-column: 1/2;
      margin-right: 16px;
    }
    .text {
      grid-row: 2/3;
      grid-column: 1/5;
      margin: 0px;
      margin-top: 32px;
    }
    .img-holder {
    }
  }
`;

const Index = ({ time, text, img }) => {
  const [dimensions, setDimensions] = useState({
    width: "120px",
    height: "80px",
  });
  return (
    <Cont colors={COLORS}>
      <h4 className="time">{time}</h4>
      <p className="text">{text}</p>
      <div className="img-holder box-shadow-2">
        <Image src={img} quality="100" fill style={{ objectFit: "cover" }} />
      </div>
    </Cont>
  );
};

export default Index;
