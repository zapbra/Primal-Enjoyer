import styled from "styled-components";
import COLORS from "../../Data/colors";
import FoodSection from "./FoodSection";
const Container = styled.div`
  border-radius: 0.5rem;
  border: 2px solid black;
  margin-top: 2rem;
  background: ${(props) => props.colors.ultraLightBlue};
`;

const Header = styled.div`
  border-radius: 0.5rem;
  background-color: ${(props) => props.colors.ultraLightBlue};
`;

const Location = styled.div`
  text-align: center;
  margin-right: 2rem;
  margin-left: 2rem;

  &:nth-of-type(2) {
    border-top: 2px solid black;
    h2 {
      font-size: 1.7rem;
      font-weight: 600;
    }
  }
  &:nth-of-type(3) {
    margin-right: 3rem;
    margin-left: 3rem;
    border-top: 2px solid black;
    h2 {
      font-size: 1.5rem;
      font-weight: 500;
    }
  }
`;

const FoodDisplay = (props) => {
  return (
    <Container colors={COLORS}>
      <Header colors={COLORS}>
        <Location>
          <h2>{props.country}</h2>
        </Location>

        <Location>
          <h2>{props.state}</h2>
        </Location>

        <Location>
          <h2>{props.city}</h2>
        </Location>
      </Header>
      <FoodSection city={props.city} locations={props.locations} />
    </Container>
  );
};

export default FoodDisplay;
