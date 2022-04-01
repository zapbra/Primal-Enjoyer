import styled from "styled-components";
import { Country, State, City } from "country-state-city";
import { useState } from "react";

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
  justify-content: space-around;
  flex-wrap: wrap;
  .location-item {
    flex: 1;
    max-width: 160px;
  }
  .header {
    background-color: #fff;
    border: 1px solid black;
    box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
    margin-bottom: 0.5rem;
    p {
      font-weight: 600;
      font-size: 20px;
    }
  }
`;

const FoodFinder = (props) => {
  const [location, setLocation] = useState({
    country: { name: "United States", code: "US" },
    state: { name: "All", code: "All" },
    city: { name: "None", code: "None" },
  });
  function updateLocation(e) {
    const value = e.currentTarget.value;
    const region = e.currentTarget.name;
    setLocation((prevLocation) => {
      return {
        ...prevLocation,
        [region]: value,
      };
    });
  }
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
          <select
            name="country"
            value={location.country.name}
            onChange={updateLocation}
          >
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>
        <div className="location-item">
          <div className="header">
            <p>State/Province:</p>
          </div>
          <select value={location.state.name}>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>
        <div className="location-item">
          <div className="header">
            <p>City:</p>
          </div>
          <select value={location.city.name}>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>
      </Location>
    </Section>
  );
};

export default FoodFinder;
