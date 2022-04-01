import styled from "styled-components";

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
`;

const Location = styled.div`
  display: flex;
  justify-content: space-between;
  .location-item {
    flex: 1;
  }
  .header {
    background-color: #fff;
    border: 1px solid black;
    box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
    p {
      font-weight: 600;
      font-size: 20px;
    }
  }
`;

const FoodFinder = (props) => {
  return (
    <Section>
      <Title colors={props.colors}>
        <h1>Food Finder</h1>
      </Title>
      <Location>
        <div className="location-item">
          <div className="header">
            <p>Country:</p>
          </div>
          <select></select>
        </div>
      </Location>
    </Section>
  );
};

export default FoodFinder;
