import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../Data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faChevronDown,
  faChevronUp,
  faLeftLong,
} from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.ultraLightGrey};
  border-radius: 16px;
  padding: 12px;
  background-color: ${(props) => props.colors.ultraLightBlue};
  position: fixed;
  top: 96px;
  input {
    padding: 4px;
    height: 32px;
    font-size: 12px;
  }
`;

const Sorter = () => {
  const [matches, setMatches] = useState([]);
  const [match, setMatch] = useState([]);
  return (
    <Cont colors={COLORS} className="box-shadow-2 flex align-center">
      <input type="text" className="mar-right-8" />
      <p className="dark-grey mar-right-16">3/10</p>
      <div className="hover-grey mar-right-8">
        <FontAwesomeIcon
          icon={faChevronUp}
          className="blue icon-ssm  cursor hover-grey"
        />
      </div>
      <div className="hover-grey mar-right-16">
        <FontAwesomeIcon
          icon={faChevronDown}
          className="blue icon-ssm  cursor hover-grey"
        />
      </div>
      <div className="grey-line-vert mar-right-16"></div>
      <div className="hover-grey">
        <FontAwesomeIcon
          icon={faLeftLong}
          className="blue icon-ssm mar-right-8 cursor hover-grey"
        />
      </div>
    </Cont>
  );
};

export default Sorter;
