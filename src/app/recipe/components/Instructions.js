import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
const Cont = styled.div`
  padding: 8px;
  .instructions {
    background-color: #fff;
    padding: 8px;
    margin-left: 16px;
  }
`;

const Instructions = ({ instructions }) => {
  return (
    <Cont colors={COLORS}>
      <h5 className="mar-bottom-4">Instructions</h5>
      <div className="grey-line mar-bottom-16"></div>
      <div className="instruction-box">
        {/* {instructions.map((instruction, index) => {
          return (
            <div key={index} className="">
              <h5 className="mar-bottom-8">
                ({index + 1}) - {instruction.title}
              </h5>
              <p className="mar-bottom-8">{instruction.content}</p>
              <div className="grey-line mar-bottom-8"></div>
            </div>
          );
        })} */}
        <div className="instructions ">{instructions}</div>
      </div>
    </Cont>
  );
};

export default Instructions;
