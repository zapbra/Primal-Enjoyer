import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.darkBlue};
  background-color: ${(props) => props.colors.grey};
  width: 568px;
  margin: 32px auto 0;
  padding-right: 16px;
  padding-left: 16px;
  padding-top: 16px;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
const TagBox = ({ selectedTags, removeTag }) => {
  return (
    <Cont colors={COLORS}>
      {selectedTags.map((tag, index) => (
        <div key={index} className="flex tag">
          <p>{tag}</p>
          <div onClick={() => removeTag(tag)} className="white-x cursor">
            <FontAwesomeIcon icon={faClose} className="icon-ssm " />
          </div>
        </div>
      ))}
    </Cont>
  );
};

export default TagBox;
