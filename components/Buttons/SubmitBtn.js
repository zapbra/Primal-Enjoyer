import React from "react";
import styled from "styled-components";
import colors from "../../Data/colors";
import Link from "next/link";
import { PaperAirplaneIcon } from "@heroicons/react/solid";

const SubmitElem = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(#dc143c, #ff6d50);
  
  border: none;

  border-radius: 2rem;
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  
  .flexing{
    display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 0.5rem;
  }
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
    text-decoration: none !important;
  }
  a:hover {
    text-decoration: none !important;
  }
`;

const SubmitBtn = ({ text, link }) => {
  return (
    <SubmitElem>
      <Link href={link} passHref>
        <a rel="noopener noreferrer">
          <div className="flexing">
          <h5>{text}</h5>
          <PaperAirplaneIcon className="white-icon"></PaperAirplaneIcon>
          </div>
        </a>
      </Link>
    </SubmitElem>
  );
};

export default SubmitBtn;
