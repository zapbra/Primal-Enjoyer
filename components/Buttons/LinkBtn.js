import React from "react";
import styled from "styled-components";
import { PaperAirplaneIcon } from "@heroicons/react/solid";

const SubmitElem = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(#dc143c, #ff6d50);
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  border: none;
  border-radius: 2rem;
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  &:active {
    opacity: 0.8;
  }
  &:hover {
    background: #dc143c;
  }
  cursor: pointer;
  .white-icon {
    color: #fff;
    width: 32px;
  }
  h5 {
    color: #fff;
    font-weight: 500;
  }
`;

const LinkBtn = ({ text }) => {
  return (
    <SubmitElem>
      <h5>text</h5>
      <PaperAirplaneIcon className="white-icon"></PaperAirplaneIcon>
    </SubmitElem>
  );
};

export default LinkBtn;
