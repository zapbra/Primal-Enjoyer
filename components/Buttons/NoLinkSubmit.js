import styled from "styled-components";
import COLORS from "../../data/colors";
import { PaperAirplaneIcon } from "@heroicons/react/solid";

const SubmitElem = styled.button`
  background: linear-gradient(#dc143c, #ff6d50);
  padding: 16px 32px !important;
  border: none;

  border-radius: 2rem;
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  &:disabled {
    background: ${(props) => props.colors.desatRed} !important;
  }
  .flexing {
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 0.5rem;
  }
  &:active {
    opacity: 0.8;
  }
  &:hover {
    background: #dc143c;
  }
  cursor: pointer;
  .white-icon {
    color: #fff;
    width: 32px;
  }
  h5 {
    color: #fff;
    font-weight: 500;
    text-decoration: none !important;
  }
  a:hover {
    text-decoration: none !important;
  }
`;

const NoLinkSubmit = ({ text, disabled }) => {
  return (
    <SubmitElem colors={COLORS} disabled={disabled}>
      <div className="flexing">
        <h5>{text}</h5>
        <PaperAirplaneIcon className="white-icon"></PaperAirplaneIcon>
      </div>
    </SubmitElem>
  );
};

export default NoLinkSubmit;
