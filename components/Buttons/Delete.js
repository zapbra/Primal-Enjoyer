import styled from "styled-components";
import { XIcon } from "@heroicons/react/solid";
import COLORS from "../../data/colors";

const Cont = styled.div`
  padding: 8px 16px;
  border-radius: 32px;
  display: inline-flex;
  background-color: ${(props) => props.colors.red};
  align-items: center;
  cursor: pointer;
  p {
    color: #fff;
    margin-right: 8px;
    font-weight: 500;
  }
  &:hover {
    background-color: ${(props) => props.colors.red2};
  }
  &:active {
    background-color: ${(props) => props.colors.darkRed};
  }
`;
const Delete = () => {
  return (
    <Cont colors={COLORS} className="btn-spec">
      <p className="text-shadow">Delete</p>
      <XIcon className="hero-icon-sm white" />
    </Cont>
  );
};

export default Delete;
