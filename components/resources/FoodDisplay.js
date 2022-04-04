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
  margin-right: 2rem;
  margin-left: 2rem;
  display: flex;
  height: 60px;
  gap: 2rem;
  justify-content: space-between;
  background-color: ${(props) => props.colors.ultraLightBlue};
`;

const Location = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  background-color: #fff;
  border-right: 1px solid black;
  border-left: 1px solid black;
  &:nth-of-type(2) {
    h2 {
      font-size: 21px;
    }
  }
  &:nth-of-type(3) {
    h2 {
      font-size: 18px;
    }
  }
`;

const FoodDisplay = () => {
  return (
    <Container colors={COLORS}>
      <Header colors={COLORS}>
        <Location>
          <h2>Canada</h2>
        </Location>

        <Location>
          <h2>Ontario</h2>
        </Location>

        <Location>
          <h2>All</h2>
        </Location>
      </Header>
      <FoodSection />
    </Container>
  );
};

export default FoodDisplay;
