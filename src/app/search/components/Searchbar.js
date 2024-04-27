import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../Data/colors";

const Cont = styled.form`
  display: flex;
  margin-bottom: 32px;
  max-width: 600px;
  margin: 0 auto 64px;
  input {
    flex: 1;
    margin-right: 32px;
    border-radius: 16px;
    transition: box-shadow 0.25s ease;
    border: 1px solid ${(props) => props.colors.ultraLightGrey};
    &:focus {
      box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px,
        rgba(0, 0, 0, 0.23) 0px 3px 6px;
    }
  }
`;

const Searchbar = () => {
  return (
    <Cont colors={COLORS}>
      <input type="text" />

      <div className="lt-blue-btn">
        <h5>Search</h5>
      </div>
    </Cont>
  );
};

export default Searchbar;
