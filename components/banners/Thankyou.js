import React from "react";
import styled from "styled-components";
import { MailIcon, XCircleIcon } from "@heroicons/react/solid";
import COLORS from "../../Data/colors";

const Cont = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: box-shadow 0.25s ease;
  &:hover {
    box-shadow: 0px 10px 13px -7px #000000, 5px 5px 41px 9px rgba(0, 0, 0, 0);
  }
`;

const ThankyouElem = styled.div`
  max-width: 800px;
  height: 500px;
  background: #fff;
  position: relative;
  overflow: hidden;
  .delete {
    color: ${(props) => props.colors.red};
    position: absolute;
    right: 2rem;
    top: 1.5rem;
    width: 60px;
    height: 60px;
    border-radius: 5rem;
    cursor: pointer;
    transition: box-shadow 0.25s ease;
    &:hover {
      box-shadow: 0px 10px 13px -7px #000000, 5px 5px 41px 9px rgba(0, 0, 0, 0);
    }
  }
  .line {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: ${(props) => props.colors.darkBlue};
    height: 3px;
  }
  h1 {
    width: 400px;
    margin: auto;
    text-align: center;
    margin-top: 1rem;
    margin-bottom: 3rem;
  }
  .text-field {
    background: ${(props) => props.colors.offBlue};
    margin-top: 2rem;
  }
  h2 {
    font-weight: 400;
    text-align: center;
  }
  border-bottom: 40px solid ${(props) => props.colors.brightBlue};
`;

const BlueBall = styled.div`
  width: 300px;
  height: 300px;
  position: absolute;
  left: -150px;
  top: -150px;
  background-color: ${(props) => props.colors.brightBlue};
  border-radius: 10rem;
`;

const Icon = styled.div`
  margin: 0 auto;
  width: 120px;
  .mail {
    color: ${(props) => props.colors.brightBlue};
    width: 120px;
  }
`;

const Thankyou = () => {
  return (
    <Cont>
      <ThankyouElem colors={COLORS}>
        <XCircleIcon className="delete" />
        <BlueBall colors={COLORS} />

        <h1>Thank You For Your Submission</h1>
        <div className="text-field">
          <h2>
            Within 24 hours you will see your location on the food finder.{" "}
          </h2>
        </div>
        <div className="text-field">
          <h2>Eventually it will be a google maps food finder </h2>
        </div>
        <Icon colors={COLORS}>
          <MailIcon className="mail" />
        </Icon>
      </ThankyouElem>
    </Cont>
  );
};

export default Thankyou;
