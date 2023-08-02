import styled from "styled-components";
import COLORS from "../../data/colors";
const Cont = styled.div`
  display: inline-block;
  padding: 8px 16px;
  background-color: #fff;
  border: 3px solid ${(props) => props.colors.red};
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  cursor: pointer;
  transition: box-shadow 0.25s ease;
  h1,
  h2,
  h3,
  h4,
  h5 {
    color: ${(props) => props.colors.red};
  }
  &:hover {
    box-shadow: none;
    background-color: ${(props) => props.colors.lightRed};
  }
  &:active {
    background-color: ${(props) => props.colors.red};
    h1,
    h2,
    h3,
    h4,
    h5 {
      color: white;
    }
  }
`;
const RedBtn = ({ text }) => {
  return (
    <Cont colors={COLORS}>
      <h4>{text}</h4>
    </Cont>
  );
};

export default RedBtn;
