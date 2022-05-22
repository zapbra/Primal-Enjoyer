import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const SliderElem = styled.div`
  &::before {
    content: "";
    background-color: white;
    width: 99%;
    height: 9px;
    display: block;
    position: absolute;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .progress-bar-cover {
    background-color: #ff0000;
    width: 50%;
    height: 13px;
    display: block;
    position: absolute;
    border-radius: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    user-select: none;
    pointer-events: none;
  }
  .thumb {
    width: 25px;
    height: 25px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.753);
    z-index: 3;
    background: rgb(255, 255, 255);
    position: absolute;
    border-radius: 50%;
    top: 50%;
    transform: translate(0%, -50%);
    pointer-events: none; /* Remove pointer events on thumb so user can click on the actual thumb beaneath it!  */
    user-select: none; /*  Prevent Accidentally highlighting the number while sliding the cursor  */
  }
  .range {
    -webkit-appearance: none;
    background-color: rgba(240, 9, 9, 0.397);
    height: 10px;
    width: 100%;
    cursor: pointer;
    opacity: 0;
    margin: 0 auto;
    &::-webkit-slider-thumb {
      width: 25px;
      height: 25px;

      background: #350f2d;
      border: 1px solid #000000;
      border-radius: 50%;
      cursor: pointer;
      -webkit-appearance: none;
    }
  }
`;

const Cont = styled.div`
  width: 500px;
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -50%);
`;
const Slider = ({ onChange, percentage }) => {
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const rangeRef = useRef();
  const thumbRef = useRef();
  useEffect(() => {
    const rangeWidth = rangeRef.current.getBoundingClientRect().width;
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const centerThumb = (thumbWidth / 100) * percentage * -1;
    const centerProgressBar =
      thumbWidth +
      (rangeWidth / 100) * percentage -
      (thumbWidth / 100) * percentage;
    setMarginLeft(centerThumb);
    setPosition(percentage);
    setProgressBarWidth(centerProgressBar);
  }, [percentage]);
  return (
    <Cont>
      <SliderElem>
        <div
          className="progress-bar-cover"
          style={{
            width: `${progressBarWidth}px`,
          }}
        ></div>
        <div
          className="thumb"
          style={{
            left: `${position}%`,
            marginLeft: `${marginLeft}px`,
          }}
          ref={thumbRef}
        ></div>
        <input
          type="range"
          ref={rangeRef}
          step="0.01"
          className="range"
          value={position}
          onChange={onChange}
        />
      </SliderElem>
    </Cont>
  );
};

export default Slider;
