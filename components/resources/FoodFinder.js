import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
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
  const [country, setCountry] = useState("United States");
  const [state, setState] = useState("All");
  const [city, setCity] = useState("None");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    const getCountries = async () => {
      const res = await fetch();
    };
  }, []);

  const countries = [...new Set(data.map((item) => item.country))];
  console.log(countries);
  function updateCountry(e) {
    const value = e.currentTarget.value;
    setCountry((prevCountry) => {
      return value;
    });
  }

  function updateState(e) {
    const value = e.currentTarget.value;
    setState((prevState) => {
      return value;
    });
  }

  function updateCity(e) {
    const value = e.currentTarget.value;
    setCity((prevCity) => {
      return value;
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
          <select name="country" value={country} onChange={updateCountry}>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>
        <div className="location-item">
          <div className="header">
            <p>State/Province:</p>
          </div>
          <select value={state} onChange={updateState}>
            <option value="All">All</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>
        <div className="location-item">
          <div className="header">
            <p>City:</p>
          </div>
          <select value={city} onChange={updateCity}>
            <option value="None">None</option>
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
