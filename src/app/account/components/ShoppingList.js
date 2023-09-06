import { useState } from "react";
import COLORS from "../../../../data/colors";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.darkBlue};
  max-width: 400px;
  .space-between {
    justify-content: space-between !important;
  }
  .header {
    padding: 16px;
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
  }
  .recipe-holder {
    background-color: #fff;
  }
  .line {
    padding: 8px;
    border-bottom: 1px solid ${(props) => props.colors.grey};
    justify-content: space-between;
    cursor: pointer;
    transition: background-color 0.25s ease;
    &:hover {
      background-color: ${(props) => props.colors.lightGrey};
    }
  }
`;

const ShoppingList = () => {
  return (
    <Cont colors={COLORS}>
      <div className="header flex space-between">
        <h5>Shopping List</h5>
        <FontAwesomeIcon icon={faShoppingCart} className="icon-ssm dark-blue" />
      </div>
    </Cont>
  );
};

export default ShoppingList;
