import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../data/colors";
const Cont = styled.div`
  background-color: #fff;
  border: 4px solid ${(props) => props.colors.darkBlue};
  display: inline-flex;
  border-radius: 32px;
  padding: 8px 16px;
  align-items: center;
  cursor: pointer;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  transition: box-shadow 0.25s ease;
  h5 {
    margin-right: 8px;
  }
  &:hover {
    box-shadow: none;
    background-color: ${(props) => props.colors.darkBlue};
    h5 {
      color: white;
    }
    .icon-blue {
      color: white;
    }
  }
  &:active {
    background-color: ${(props) => props.colors.blue};
    h5 {
      color: white;
    }
    .icon-blue {
      color: white;
    }
  }
`;
const DefaultBtn = ({ text }) => {
  return (
    <Cont colors={COLORS}>
      <h5>{text}</h5>
      <FontAwesomeIcon icon={faArrowDown} className="icon-blue icon-med" />
    </Cont>
  );
};

export default DefaultBtn;
