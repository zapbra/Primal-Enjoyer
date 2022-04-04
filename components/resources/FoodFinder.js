import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
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
  const [country, setCountry] = useState("");
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
  countries.sort();
  function updateCountry(e) {
    const value = e.currentTarget.value;
    setCountry((prevCountry) => {
      return value;
    });
    let states = data.filter((item) => {
      return item.country === value;
    });
    states = [...new Set(states.map((item) => item.subcountry))];
    states.sort();
    setStates((prevStates) => {
      return states;
    });
  }

  function updateState(e) {
    const value = e.currentTarget.value;
    setState((prevState) => {
      return value;
    });
    let cities = data.filter((city) => city.subcountry === value);
    cities = cities.map((city) => city.name);
    cities.sort();
    setCities(cities);
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
            <option>Select Country</option>
            {countries.map((item) => (
              <option value={item} key={nanoid()}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="location-item">
          <div className="header">
            <p>State/Province:</p>
          </div>
          <select value={state} onChange={updateState}>
            <option>All</option>
            {states.map((item) => (
              <option value={item} key={nanoid()}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="location-item">
          <div className="header">
            <p>City:</p>
          </div>
          <select value={city} onChange={updateCity}>
            <option value="None">None</option>
            {cities.map((item) => (
              <option value={item} key={nanoid()}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </Location>
    </Section>
  );
};

export default FoodFinder;
