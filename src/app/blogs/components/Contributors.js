import styled from "styled-components";
import COLORS from "../../../../data/colors";

const Cont = styled.div`
  .box {
    border: 1px solid ${(props) => props.colors.darkBlue};
    background: ${(props) => props.colors.lightGrey};
    padding: 8px;
  }
`;
const Contributors = ({ contributors }) => {
  const names = [];
  contributors.forEach((contributor) => {
    if (!names.some((name) => name === contributor.name)) {
      names.push(contributor.name);
    }
  });

  return (
    <Cont colors={COLORS}>
      <h5 className="text-shadow mar-bottom-16">Contributors</h5>
      <div className="box">
        <p className="bold">{names.map((name) => `${name}, `)}</p>
      </div>
    </Cont>
  );
};

export default Contributors;
