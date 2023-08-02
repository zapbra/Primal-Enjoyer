import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import Line from "./Line";
const Cont = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid ${(props) => props.colors.offGrey};
  border-radius: 8px;
  .icon-grey {
    background-color: ${(props) => props.colors.ultraLightBlue};
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1px solid ${(props) => props.colors.ultraLightGrey};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      border: 1px solid ${(props) => props.colors.offGrey};
    }
  }
  .header {
    padding: 16px;
    border-radius: 8px 8px 0 0;
    border-bottom: 1px solid ${(props) => props.colors.offGrey};
    background-color: ${(props) => props.colors.lightGrey};
  }
  .button-holder {
    .button {
      &:first-of-type {
        margin-right: 8px;
      }
    }
  }
`;

const Results = ({ foods, reFetchFoods }) => {
  const iconRef = useRef(null);
  const [userVotes, setUserVotes] = useState({});
  const reFetchFoodsFunctional = () => {
    reFetchFoods();
    iconRef.current.classList.add("rotate");
    setTimeout(() => {
      iconRef.current.classList.remove("rotate");
    }, 1000);
  };
  const [foodElems, setFoodElems] = useState(
    foods.map((food, index) => {
      return (
        <Line
          key={index}
          index={index + 1}
          name={food.name}
          url={food.url}
          upvotes={food.foodUpvotes[0].count}
          downvotes={food.foodDownvotes[0].count}
        />
      );
    })
  );

  useEffect(() => {
    if (typeof window != "undefined") {
    }
  }, []);

  useEffect(() => {
    setFoodElems(
      foods.map((food, index) => {
        return (
          <Line
            key={index}
            index={index + 1}
            name={food.name}
            url={food.url}
            upvotes={food.foodUpvotes[0].count}
            downvotes={food.foodDownvotes[0].count}
          />
        );
      })
    );
  }, [foods]);
  const [statState, setStatState] = useState("global");
  const setStatsGlobal = () => {
    setStatState("global");
  };

  const setStatsLocal = () => {
    setStatState("local");
  };
  return (
    <Cont colors={COLORS}>
      <div className="header flex space-between align-center">
        <div className="flex flex-wrap align-center">
          <h3 className="light mar-right-32">View Results</h3>
          <div className="flex button-holder">
            <div
              onClick={setStatsGlobal}
              className={statState == "global" ? "button active" : "button"}
            >
              <h5>Global</h5>
            </div>
            <div
              onClick={setStatsLocal}
              className={statState == "local" ? "button active" : "button"}
            >
              <h5>Yours</h5>
            </div>
          </div>
        </div>
        <div
          className="icon-grey flex-no-shrink"
          onClick={reFetchFoodsFunctional}
        >
          <FontAwesomeIcon
            ref={iconRef}
            icon={faRotateRight}
            className="icon-med green"
          />
        </div>
      </div>
      <div>{foodElems}</div>
    </Cont>
  );
};

export default Results;
