import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../data/colors";

const Cont = styled.div`
  background-color: ${(props) => props.colors.darkBlue};
  border: 4px solid ${(props) => props.colors.darkBlue};
  display: inline-flex;

  border-radius: 32px;
  padding: 8px 16px;
  align-items: center;
  cursor: pointer;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  transition: box-shadow 0.25s ease;
  h5 {
    color: white;
    margin-right: 8px;
  }
  .icon-blue {
    color: white;
  }
  &:hover {
    box-shadow: none;
    background-color: white;
    h5 {
      color: ${(props) => props.colors.darkBlue};
    }
    .icon-blue {
      color: ${(props) => props.colors.darkBlue};
    }
  }
  &:active {
    background-color: white;
    h5 {
      color: ${(props) => props.colors.blue};
    }
    .icon-blue {
      color: ${(props) => props.colors.blue};
    }
  }
`;
const DefaultBtn = ({ text }) => {
  return (
    <Cont colors={COLORS}>
      <h5>{text}</h5>
      <FontAwesomeIcon icon={faArrowUp} className="icon-blue icon-med" />
    </Cont>
  );
};

export default DefaultBtn;
