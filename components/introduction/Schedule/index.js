import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import ScheduleData from "../../../Data/Schedule.json";
import Line from "./Line";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
const Cont = styled.div`
  .lines-holder {
    max-width: 1200px;
    margin: 0 auto;
    padding-right: 16px;
    padding-left: 16px;
  }
  .clock-holder {
    display: grid;
    grid-template-columns: 1fr 4fr 1fr;
    justify-items: center;
    @media only screen and (max-width: 600px) {
      margin-bottom: 32px;
    }
  }
`;

const Index = () => {
  const lineElems = ScheduleData.map((line, index) => {
    return (
      <Line key={index} time={line.time} text={line.text} img={line.img} />
    );
  });
  return (
    <Cont colors={COLORS}>
      <h2 className="text-shadow mar-bottom-16">Eating Schedule</h2>
      <div className="blue-line mar-bottom-32"></div>
      <div className="lines-holder">
        <div className="clock-holder">
          <FontAwesomeIcon icon={faClock} className="dark-blue icon-lg" />
        </div>
        {lineElems}
      </div>
      <div className="sm-spacer-bot-res"></div>
    </Cont>
  );
};

export default Index;
