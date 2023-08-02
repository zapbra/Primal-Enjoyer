"use client";

import Recommendation from "./components/Recommendation/Recommendation";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";

const Cont = styled.div`
  padding-top: 100px;
  background: #fff;
`;

const Render = () => {
  return (
    <Cont colors={COLORS}>
      <Recommendation />
    </Cont>
  );
};

export default Render;
