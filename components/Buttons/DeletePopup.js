import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../data/colors";
const Cont = styled.div`
  cursor: pointer;
  border: 1px solid black;

  display: inline-block;
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  &:hover {
    background-color: ${(props) => props.colors.lightGrey};
  }
  &:active {
    border: 3px solid black;
  }
`;
const DeleteBtn = () => {
  return (
    <Cont colors={COLORS}>
      <FontAwesomeIcon icon={faClose} className="icon-xl red" />
    </Cont>
  );
};

export default DeleteBtn;
