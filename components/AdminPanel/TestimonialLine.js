import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { fetchDaysDiff } from "../../utils/supabaseClient";

const Cont = styled.div`
  border-bottom: 1px solid ${(props) => props.colors.grey};
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .ellipse {
    width: 6px;
    height: 6px;
    background-color: black;
    border-radius: 50%;
  }
`;

const TestimonialLine = ({
  index,
  title,
  id,
  name,
  created_at,
  setIndex,
  activeIndex,
}) => {
  const date = new Date(created_at);
  return (
    <Cont colors={COLORS}>
      <div className="flex align-center">
        <p className="green mar-right-8">[{index + 1}]</p>
        <p className="bold mar-right-8">{title}</p>
        <div className="ellipse mar-right-8"></div>
        <p className="light mar-right-16">{name}</p>
        <div className="ellipse mar-right-16"></div>
        <p className="contrast small">
          {date.toDateString()}{" "}
          <span className="green">({fetchDaysDiff(created_at)})</span>
        </p>
      </div>
      <div className="flex align-center" onClick={() => setIndex(index)}>
        <div
          className="download-green"
          style={{
            backgroundColor: activeIndex == index ? COLORS.green : "white",
          }}
        >
          <h5>Preview</h5>
        </div>
      </div>
    </Cont>
  );
};

export default TestimonialLine;
