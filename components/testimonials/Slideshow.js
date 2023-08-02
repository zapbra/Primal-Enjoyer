import { useState, useEffect, useRef, useReducer } from "react";
import Image from "next/image";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Cont = styled.div`
  .slider {
    overflow: hidden;
    width: 100%;
    height: 500px;

    @media only screen and (max-width: 600px) {
      height: 300px;
    }

    @media only screen and (max-width: 300px) {
      height: 200px;
    }
  }
  .slide {
    position: relative;
    width: ${(props) => props.slideWidth};
  }
  .navigation-auto {
    @media only screen and (max-width: 600px) {
      margin-top: 260px;
    }
    @media only screen and (max-width: 300px) {
      margin-top: 140px;
    }
  }
  .slide img {
    position: relative;

    width: 100%;
    height: 500px;
    @media only screen and (max-width: 600px) {
      height: 300px;
    }
    @media only screen and (max-width: 300px) {
      height: 200px;
    }
  }
  .slides {
    width: ${(props) => props.allSlidesWidth} !important;

    position: relative;
    height: 500px;
    display: flex;
    @media only screen and (max-width: 600px) {
      height: 300px;
    }
    @media only screen and (max-width: 300px) {
      height: 200px;
    }
  }

  .nav-auto-holder {
    max-width: 1000px;
    width: 100vw;
  }
`;

const Slideshow = ({ photos }) => {
  const [countdown, setCountdown] = useState(1);
  const [photoCopy, setPhotoCopy] = useState(photos);
  const [allSlidesWidth, setAllSlidesWidth] = useState(
    photos.length * 100 + "%"
  );

  const slideWidth = 100 / photos.length + "%";

  const leftOffset = (100 / photos.length) * countdown + "%";

  const [navAutoBtns, setNavAutoBtns] = useState(
    photos.map((photo, index) => {
      return <div key={index} className={`auto-btn${index + 1} `}></div>;
    })
  );

  const [navManBtns, setNavmanBtns] = useState(
    photos.map((photo, index) => {
      return (
        <label
          key={index}
          htmlFor={`radio${index + 1}`}
          className="manual-btn"
        ></label>
      );
    })
  );

  const [radioBtns, setRadioBtns] = useState(
    photos.map((photo, index) => {
      return (
        <input
          key={index}
          type="radio"
          name="radio-btn"
          id={`radio${index + 1}`}
          onChange={(e) => setCountdown(index + 1)}
        />
      );
    })
  );

  const [imageElems, setImageElems] = useState(
    photos.map((photo, index) => {
      return (
        <div className="slide" key={index}>
          <Image src={photo} fill style={{ objectFit: "contain" }} />
        </div>
      );
    })
  );

  let interval;

  useEffect(() => {
    if (photos.length > 0) {
      startTimer();
      return () => {
        clearInterval(interval);
      };
    }
  });

  function startTimer() {
    interval = setInterval(() => {
      document.getElementById("radio" + countdown).checked = true;
      setCountdown(countdown + 1);

      if (countdown > photos.length - 1) {
        setCountdown(1);
      } else {
        clearInterval(interval);
      }
    }, 3000);
  }

  return (
    <Cont
      allSlidesWidth={allSlidesWidth}
      slideWidth={slideWidth}
      photoCount={photos.length}
      colors={COLORS}
    >
      <div
        className="slider"
        style={{ display: photos.length == 0 ? "none" : "block" }}
      >
        <div className="slides ">
          {/* Radio buttons start --> */}

          {/* <input type="radio" name="radio-btn" id="radio1" />
          <input type="radio" name="radio-btn" id="radio2" />
          <input type="radio" name="radio-btn" id="radio3" />
          <input type="radio" name="radio-btn" id="radio4" /> */}
          {radioBtns}

          {/*Radio buttons end--> */}

          {/*Slide images start */}
          <div className="slide first" style={{ marginLeft: `-${leftOffset}` }}>
            <Image src={photos[0]} layout="fill" objectFit="cover" />
          </div>
          {imageElems}

          {/*Slide images end */}
          {/* Automatic navigation start--> */}
          <div className="absolute nav-auto-holder">
            <div className="navigation-auto">
              <div className="flex flex-wrap">{navAutoBtns}</div>
            </div>
          </div>
          {/* Automatic navigation end--> */}
        </div>

        {/* Manual navigation start --> */}
        <div className="navigation-manual">
          <div className="flex flex-wrap">{navManBtns}</div>
        </div>
        {/* Manual navigation end --> */}
      </div>
    </Cont>
  );
};

export default Slideshow;
