import React from "react";
import styled from "styled-components";
import COLORS from "../../Data/colors";

const Container = styled.div`
  .label {
    background-color: ${(props) => props.colors.darkBlue};
    width: 100px;
    height: 80px;
    display: flex;
    align-items: center;
    margin-bottom: 0.25rem;
    border-radius: 0.5rem;
    text-align: center;
    h4 {
      color: ${(props) => props.colors.veryLightBlue};
    }
  }
  .toggle-cont {
    border-radius: 32px;
    border: 1px solid black;
    padding: 4px;
    width: 100px;
    height: 40px;
    .toggle {
      cursor: pointer;
      border-radius: 32px;
      border: 1px solid black;
      height: 30px;
      position: relative;
    }
    .icon {
      border-radius: 32px;
      width: 28px;
      height: 28px;
      position: absolute;
      left: 0px;
      transition: left 1s ease;
    }
  }
`;

const ChangeView = ({ func, condition }) => {
  const [colors, setColors] = React.useState({
    background: COLORS.darkGrey,
    foreground: COLORS.darkBlue,
  });
  const [style, setStyle] = React.useState({
    left: "0px",
  });
  React.useEffect(() => {
    const placeholder = colors.background;
    setColors((prevColors) => {
      return { background: prevColors.foreground, foreground: placeholder };
    });
    if (condition) {
      setStyle((prevStyle) => {
        return { left: "calc(100% - 28px)" };
      });
    } else {
      setStyle((prevStyle) => {
        return { left: "0px" };
      });
    }
  }, [condition]);
  return (
    <Container colors={COLORS}>
      <div className="label">
        <h4>Toggle View</h4>
      </div>
      <div className="toggle-cont">
        <div
          style={{ backgroundColor: colors.background }}
          className="toggle"
          onClick={() => func(condition)}
        >
          <div
            style={{ ...{ backgroundColor: colors.foreground }, ...style }}
            className="icon"
          ></div>
        </div>
      </div>
    </Container>
  );
};

export default ChangeView;
