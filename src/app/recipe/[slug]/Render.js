"use client";
import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";

import Ingredients from "../components/Ingredients";
import Instructions from "../components/Instructions";
import DetailedInstructions from "../components/DetailedInstructions";
import Popup from "../../../../components/Utility/Popup";

const Cont = styled.div`
  padding-top: 120px !important;
  min-height: 100vh;
  background: #fff;
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .recipe-holder {
    width: 100%;
    max-width: 600px;
    background-color: ${(props) => props.colors.ultraLightBlue};
    border-radius: 8px;
    border: 1px solid ${(props) => props.colors.ultraLightGrey};
    padding: 16px;
  }

  .image-holder {
    height: 400px;
    overflow: hidden;
    border-radius: 16px;
    margin-bottom: 16px;
  }

  .icons-holder {
    .icon {
      margin-right: 16px;
      border: 1px solid ${(props) => props.colors.ultraLightGrey};
      border-radius: 16px;
      position: relative;
      width: 64px;
      height: 64px;
      padding: 8px;
      background-color: #fff;
      margin-bottom: 16px;
    }
    .inner-padding {
      width: 100%;
      height: 100%;

      position: relative;
    }
  }
`;

const Render = ({ recipe }) => {
  console.log("recipe");
  console.log(recipe);
  const [iconElems, setIconElems] = useState(
    recipe.food_instances.map((food_instance, index) => {
      return (
        <Popup text={"ingredient.description"} key={index}>
          <div className="icon">
            <div className=" inner-padding">
              <Image
                src={`/icons/${food_instance.food_id.name.toLowerCase()}.png`}
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </Popup>
      );
    })
  );
  return (
    <Cont colors={COLORS}>
      <div className="recipe-holder mar-bottom-64 padding-16">
        <div className="image-holder relative">
          <Image
            src="/lemonade.jpg"
            fill
            style={{ objectFit: "cover" }}
            quality={100}
          />
        </div>

        <div className="icons-holder flex align-start flex-wrap">
          {iconElems}
        </div>

        <Ingredients
          servings={recipe.servings}
          food_instances={recipe.food_instances}
        />

        <Instructions instructions={recipe.instructions} />
      </div>
      {/*  <DetailedInstructions detailedInstructions={recipe.instructions} /> */}
    </Cont>
  );
};

export default Render;
