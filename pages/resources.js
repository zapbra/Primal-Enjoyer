import styled from "styled-components";
import COLORS from "../Data/colors";
import Resources from "../components/resources/Aajonus";
import FoodFinder from "../components/resources/FoodFinder";
const Title = styled.div`
  padding: 5px 20px;
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  background-color: ${(props) => props.colors.ultraLightBlue};
  margin-bottom: 2rem;
  display: inline-block;
  width: 100%;
`;

const Section = styled.div`
  max-width: 500px;
  table,
  th,
  td {
    border: 1px solid black;
  }
  td {
    padding-left: 5px;
  }
  table {
    width: 100%;
  }
  th {
    background-color: ${(props) => props.colors.ultraLightBlue};
  }
`;

const resources = () => {
  return (
    <div className="container">
      <div className="main-title">
        <h1>Resources</h1>
      </div>
      <Resources colors={COLORS} />
      <FoodFinder />
    </div>
  );
};

export default resources;
