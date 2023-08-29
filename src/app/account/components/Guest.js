import { useState } from "react";
import Link from "next/link";
import DefaultBtn from "../../../../components/Buttons/DefaultBtn";
import AntiDefaultBtn from "../../../../components/Buttons/AntiDefaultBtn";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import SavedRecipes from "./SavedRecipes";
const Cont = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
  @media only screen and (max-width: 600px) {
    padding: 16px;
  }
`;

const Guest = () => {
  return (
    <Cont colors={COLORS}>
      <div className="shallow-cont ssm-spacer">
        <h3>Have an Account?</h3>

        <p className="mar-bottom-one">Login or sign up below</p>
        <div className="mar-bottom-16 sign-up">
          <Link href={{ pathname: "/signup" }}>
            <DefaultBtn text="Sign Up" />
          </Link>
        </div>
        <div>
          <Link href={{ pathname: "/login" }}>
            {" "}
            <AntiDefaultBtn text="Sign In" />
          </Link>
        </div>
      </div>
      <SavedRecipes />
    </Cont>
  );
};

export default Guest;
