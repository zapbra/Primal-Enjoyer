import styled from "styled-components";
import COLORS from "../../data/colors";
import { XIcon } from "@heroicons/react/solid";

const Cont = styled.div`
  position: absolute;
  background-color: #fff;
  z-index: 2;
  padding: 32px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  border: 1px solid ${(props) => props.colors.ultraLightGrey};
  &:hover {
    background: rgb(255, 255, 255);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(233, 241, 253, 1) 58%,
      rgba(255, 255, 255, 1) 100%
    );
  }
  .hero-icon-med {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    &:hover {
      background-color: ${(props) => props.colors.ultraLightGrey};
    }
  }
`;

const Popup = ({ hidePopup }) => {
  return (
    <Cont colors={COLORS}>
      <h3 className="mar-bottom-16">Thanks For Siging Up!</h3>
      <p>Please check your email to verify your account.</p>
      <XIcon className="hero-icon-med" onClick={hidePopup} />
    </Cont>
  );
};

export default Popup;
