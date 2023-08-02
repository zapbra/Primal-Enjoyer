import styled from "styled-components";
import { PencilIcon } from "@heroicons/react/solid";
import COLORS from "../../data/colors";

const Cont = styled.div`
  padding: 8px 16px;
  border-radius: 32px;
  display: inline-flex;
  background-color: ${(props) => props.colors.green};
  align-items: center;
  cursor: pointer;
  p {
    color: #fff;
    margin-right: 8px;
    font-weight: 500;
  }
  &:hover {
    background-color: ${(props) => props.colors.lightGreen};
  }
  &:active {
    background-color: ${(props) => props.colors.darkGreen};
  }
`;
const Edit = ({ text }) => {
  return (
    <Cont colors={COLORS} className="btn-spec">
      <p className="text-shadow">{text}</p>

      <PencilIcon className=" hero-icon-sm white" />
    </Cont>
  );
};

export default Edit;
