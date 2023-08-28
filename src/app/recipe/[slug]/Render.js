"use client";
import Image from "next/image";
import React, { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";

import Ingredients from "../components/Ingredients";
import Instructions from "../components/Instructions";
import DetailedInstructions from "../components/DetailedInstructions";
import Popup from "../../../../components/Utility/Popup";
import Disclaimer from "@/app/recipes/Disclaimer";

const Cont = styled.div`
  background: #fff;

  .holder {
    padding-top: 120px !important;
    min-height: 100vh;

    padding: 16px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

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
    border-radius: 8px;
    margin-bottom: 8px;
    @media only screen and (max-width: 450px) {
      height: 300px;
    }
    @media only screen and (max-width: 350px) {
      height: 200px;
    }
    @media only screen and (max-width: 250px) {
      height: 150px;
    }
    @media only screen and (max-width: 175px) {
      height: 100px;
    }
  }

  .icons-holder {
    position: relative;
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
      box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
        rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
      transition: box-shadow 0.25s ease;
      &:hover,
      &:active {
        box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
          rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
      }
    }

    .inner-padding {
      width: 100%;
      height: 100%;

      position: relative;
    }
  }
  @media only screen and (max-width: 500px) {
    .holder {
      padding: 0px;
    }
    .recipe-holder {
      border-radius: 0px;
      border: none;
      padding: 8px;
      border-top: 1px solid ${(props) => props.colors.ultraLightGrey};
      border-bottom: 1px solid ${(props) => props.colors.ultraLightGrey};
    }
  }
`;

const Render = ({ recipe }) => {
  console.log("recipe");
  console.log(recipe);
  const [iconElems, setIconElems] = useState(
    recipe.food_instances.map((food_instance, index) => {
      return (
        <Popup
          text={food_instance.food_id.description}
          key={index}
          title={food_instance.food_id.name}
        >
          <div className="icon">
            <div className=" inner-padding">
              <Image
                src={`/icons${food_instance.food_id.icon}`}
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
      <div className="holder ">
        <div className="recipe-holder mar-bottom-64 padding-16 rounded-shadow">
          <div className="image-holder relative">
            <Image
              src={
                recipe.url != null ? recipe.url : "/No_image_available.svg.png"
              }
              fill
              style={{ objectFit: "cover" }}
              quality={100}
            />
          </div>
          <h3 className="mar-bottom-16 mar-top-16">{recipe.name}</h3>
          <div className="grey-line mar-bottom-16"></div>
          <div className="icons-holder flex align-start flex-wrap">
            {iconElems}
          </div>

          <Ingredients
            servings={recipe.servings}
            food_instances={recipe.food_instances}
          />

          <Instructions instructions={recipe.instructions} />
        </div>
      </div>
      <Disclaimer />
      {/*  <DetailedInstructions detailedInstructions={recipe.instructions} /> */}
    </Cont>
  );
};

export default Render;
