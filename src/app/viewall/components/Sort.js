import styled from "styled-components";
import { useState, useEffect, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import COLORS from "../../../../data/colors";

const Cont = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 32px;

  .dropdown-holder {
    display: inline-flex;
    position: relative;
    flex-direction: column;
  }
  .accordion-content {
    display: inline-flex;
    position: absolute;
    top: 100%;
    width: 100%;
    z-index: 1;
    flex-direction: column;
    ::-webkit-scrollbar {
      width: 0.5rem;
      background: #d8dde3;
    }
  }
  .dropdown-selected {
    border: 1px solid ${(props) => props.colors.darkBlue};
    padding: 8px 16px;
    width: 240px;
    &:hover {
      background-color: ${(props) => props.colors.ultraLightBlue};
    }
    &:active {
      background-color: ${(props) => props.colors.darkBlue};
      .icon-blue {
        color: ${(props) => props.colors.ultraLightBlue};
      }
      h5 {
        color: ${(props) => props.colors.ultraLightBlue};
      }
    }
  }

  .dropdown-line {
    cursor: pointer;
    display: inline-block;
    border: 1px solid black;
    padding: 4px 8px;
    background: #fff;
    &:hover {
      background-color: ${(props) => props.colors.ultraLightBlue};
    }
  }
  .dropdown-active {
    cursor: default;
    background-color: ${(props) => props.colors.darkBlue};
    p {
      color: ${(props) => props.colors.ultraLightBlue};
    }
    &:hover {
      background-color: ${(props) => props.colors.darkBlue};
    }
  }
  .chevron {
    transition: transform 0.2s ease;
  }
  @media only screen and (max-width: 300px) {
    margin-right: 0;
    .dropdown-selected {
      width: 100%;
    }
  }
`;
const Sort = ({
  sortAlphaPosts,
  sortAlphaPostsDesc,
  sortPostsByLength,
  sortPostsByLengthDesc,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions] = useState([
    { text: "A-Z", selected: true, function: sortAlphaPosts },
    { text: "Z-A", selected: false, function: sortAlphaPostsDesc },
    {
      text: "Length (high - low)",
      selected: false,
      function: sortPostsByLength,
    },
    {
      text: "Length (low - high)",
      selected: false,
      function: sortPostsByLengthDesc,
    },
  ]);
  const [selectedOption, setSelectedOption] = useState("A-Z");

  const selectOption = (text) => {
    setOptions((prev) => {
      return prev.map((option) => {
        // if text matches one selected by user
        if (option.text === text) {
          // set option selected
          option.text === text && setSelectedOption(option.text);
          option.function();
          return { ...option, selected: true };
        } else {
          // de select option
          return { ...option, selected: false };
        }
      });
    });
  };
  const accordion = useRef();

  const [visible, setVisible] = useState(false);
  const [height, setHeight] = useState("0px");
  const toggleAccordion = () => {
    setHeight(visible ? "0px" : `${accordion.current.scrollHeight}px`);
    setVisible((prev) => {
      return !prev;
    });
  };
  const optionElems = options.map((option, index) => {
    return (
      <div
        key={index}
        onClick={() => selectOption(option.text)}
        className={
          option.selected ? "dropdown-line dropdown-active" : "dropdown-line"
        }
      >
        <p>{option.text}</p>
      </div>
    );
  });

  function Focus() {
    setShowDropdown(true);
  }
  return (
    <Cont colors={COLORS}>
      <div className="dropdown-holder form-dropdown">
        <div
          onClick={toggleAccordion}
          className="dropdown-selected flex-inline cursor space-between"
        >
          <h5 className="mar-right-16">{selectedOption}</h5>
          <FontAwesomeIcon
            style={{ transform: visible ? "rotate(180deg)" : "" }}
            icon={faChevronDown}
            className=" chevron icon-blue icon-sm"
          />
        </div>
        <div
          style={{ height: height }}
          ref={accordion}
          className="accordion-content"
        >
          {optionElems}
        </div>
      </div>
    </Cont>
  );
};

export default Sort;
