import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import TextParser from "./TextParser";

const Cont = styled.div`
  position: relative;

  .popup-spec {
    position: absolute;
    z-index: 1;
    border-radius: 16px;
    border: 1px solid ${(props) => props.colors.darkBlue};
    padding: 8px;
    background-color: #fff;
    bottom: 100%;
    left: -50%;
    width: 300px;
    max-height: 200px;
    overflow: auto;
  }
`;

const Popup = ({ children, text, link }) => {
  const [popupVisible, setPopupVisible] = useState(false);

  const showPopup = () => {
    setPopupVisible(true);
  };

  const hidePopup = () => {
    setPopupVisible(false);
  };
  return (
    <Cont colors={COLORS}>
      <div onMouseEnter={showPopup} onMouseLeave={hidePopup}>
        {children}
        <div
          style={{
            opacity: popupVisible ? 1 : 0,
            display: popupVisible ? "block" : "none",
          }}
          className="popup-spec box-shadow-2 small-scrollbar"
        >
          <TextParser>{text != null ? text : ""}</TextParser>
        </div>{" "}
      </div>
    </Cont>
  );
};

export default Popup;
