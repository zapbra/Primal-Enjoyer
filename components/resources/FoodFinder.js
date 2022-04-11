import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import FoodDisplay from "./FoodDisplay";
import Select from "./Select";
const Title = styled.div`
  padding: 5px 20px;
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  background-color: ${(props) => props.colors.ultraLightBlue};
  margin-bottom: 2rem;
  display: inline-block;
  width: 100%;
`;

const Section = styled.div`
  padding-bottom: 2rem;
  margin-bottom: 3rem;
  border-bottom: 2px solid black;
  width: 100%;
  select {
    width: 100%;
  }
  option {
    width: 100%;
  }
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
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [data, setData] = useState([]);
  const [locations, setLocations] = useState([]);
  const [options, setOptions] = useState([]);
  const [regions, setRegions] = useState([]);
  const submitHandler = (e) => {
    e.preventDefault();
    let errors = {};
    for (let key in formData) {
      if ((formData[key].value = "")) {
        errors[key] = "Please select one option";
      }
    }

    if (Object.keys(errors).length === 0) {
      console.log(
        formData.country.value,
        formData.state.value,
        formData.city.value
      );
      console.log("submit form...");
    } else {
      setFormData((prev) => {
        let data = {};
        for (let key in errors) {
          data[key] = {
            ...prev[key],
            error: errors[key],
          };
        }
        return {
          ...prev,
          ...data,
        };
      });
    }
  };

  const changeHandler = (value, name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        value,
        error: value !== "" ? "" : prev[name].error,
      },
    }));
    if (name === "country") {
      updateCountry(value);
    } else if (name === "state") {
      updateState(value);
    } else if (name === "city") {
      updateCity(value);
    }
  };

  useEffect(() => {
    axios
      .get(
        "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
      )
      .then((res) => {
        setData((prevData) => {
          return res.data;
        });
        setRegions((prevData) => {
          return [...new Set(res.data.map((item) => item.country))].sort();
        });
        setOptions((prevData) => {
          return [...new Set(res.data.map((item) => item.country))].sort();
        });
      })
      .catch((err) => console.log(err));

    setLocations((prevLocations) => {
      let newLocations = props.foodLocations.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    });
  }, []);

  useEffect(() => {
    setLocations((prevLocations) => {
      return props.foodLocations.filter((location) => {
        return location.country.title === country;
      });
    });
  }, [country]);

  useEffect(() => {
    setLocations((prevLocations) => {
      return props.foodLocations.filter((location) => {
        return location.state.title === state;
      });
    });
  }, [state]);

  useEffect(() => {
    setLocations((prevLocations) => {
      return props.foodLocations.filter((location) => {
        return location.city.title === city;
      });
    });
  }, [city]);

  function updateCountry(value) {
    console.log(value);
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
    setState("?");
    setCity("");
  }

  useEffect(() => {
    console.log(states);
  }, [states]);
  function updateState(value) {
    setState((prevState) => {
      return value;
    });
    let cities = data.filter((city) => city.subcountry === value);
    cities = cities.map((city) => city.name);
    cities.sort();
    setCities(cities);
  }

  function updateCity(value) {
    setCity((prevCity) => {
      return value;
    });
  }

  function updateRegion(location, name) {
    if (name === "country") {
      updateCountry(location);
    } else if (name === "state") {
      updateState(location);
    } else if (name == "city") {
      updateCity(location);
    }
  }

  return (
    <Section>
      <Title colors={props.colors}>
        <h1>Food Finder</h1>
      </Title>

      <Select
        title={"Enter Country"}
        regions={regions}
        value={country}
        updateValue={updateRegion}
        searchPlaceholder="Search"
        options={options}
        setOptions={setOptions}
        name="country"
      />

      <Select
        title={"Enter State"}
        regions={states}
        options={states}
        setOptions={setStates}
        value={state}
        updateValue={updateRegion}
        name="state"
      />

      <Select
        title={"Enter City"}
        regions={cities}
        options={cities}
        setOptions={setCities}
        value={city}
        updateValue={updateRegion}
        name="city"
      />
      <FoodDisplay
        country={country}
        state={state}
        city={city}
        states={states}
        cities={cities}
        locations={locations}
      />
    </Section>
  );
};

export default FoodFinder;
