import React from "react";
import styled from "styled-components";

const SelectElem = styled.div`
  position: relative;
`;

const Select = ({ title, regions, value, updateValue }) => {
  const dropdownEl = useRef();

  return (
    <SelectElem>
      <label>{title}</label>
      <div className="dropdown" ref={dropdownEl}>
        <input type="hidden" value={value} onChange={updateValue} />
      </div>
    </SelectElem>
  );
};

export default Select;
