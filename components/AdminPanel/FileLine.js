import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { fetchDaysDiff } from "../../utils/Functions";

const Cont = styled.div`
  border-bottom: 1px solid ${(props) => props.colors.grey};
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  .ellipse {
    width: 6px;
    height: 6px;
    background-color: black;
    border-radius: 50%;
  }
`;

const FileLine = ({
  index,
  created_at,
  name,
  username,
  file_name,
  setIndex,
}) => {
  const date = new Date(created_at);
  let activeIndex = 1;
  return (
    <Cont colors={COLORS}>
      <div className="flex align-center flex-wrap">
        <p className="green mar-right-8">[{index + 1}]</p>
        <p className="bold mar-right-8">{file_name}</p>
        <div className="ellipse mar-right-8"></div>
        <p className="light mar-right-16">{name}</p>
        <div className="ellipse mar-right-16"></div>
      </div>
      <div
        className="flex align-center flex-wrap"
        onClick={() => setIndex(index)}
      >
        <p className="contrast small mar-right-16">
          {date.toDateString()}{" "}
          <span className="green">({fetchDaysDiff(created_at)})</span>
        </p>
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

export default FileLine;
