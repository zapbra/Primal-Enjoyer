"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";

import Ingredients from "../components/Ingredients";
import Instructions from "../components/Instructions";
import DetailedInstructions from "../components/DetailedInstructions";
import Popup from "../../../../components/Utility/Popup";
import Disclaimer from "@/app/recipes/Disclaimer";
import Bookmark from "../../../../components/Utility/Bookmark";
import {
  bookmarkRecipe,
  checkBookmarked,
  removeRecipeBookmark,
} from "../../../../utils/Functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faTurnDown } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  background: #fff;
  padding-top: 120px !important;
  .holder {
    min-height: 100vh;

    padding: 16px;
    display: flex;

    justify-content: center;
  }

  .saved-holder {
    max-width: 600px;
    margin: 0 auto;
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
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px 0px;
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
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (checkBookmarked(recipe.name)) {
      setBookmarked(true);
    }
  }, []);

  useEffect(() => {
    console.log("bookmarked");
    console.log(bookmarked);
  }, [bookmarked]);

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
      <div className="flex saved-holder flex-wrap align-center padding-16 space-between mar-bottom-16 flex-one">
        <div>
          <h5 className="mar-bottom-8">Back to recipes</h5>
          <Link href="/recipes">
            <div className="mar-bottom-one  sm-icon-circle">
              <FontAwesomeIcon
                style={{ transform: "rotate(90deg)" }}
                icon={faTurnDown}
                className="icon-blue icon-sm"
              />
            </div>
          </Link>
        </div>
        <Link href="/account">
          <div className="base-box mar-bottom-16 flex-inline  align-center">
            <h5 className="mar-right-8">View Saved</h5>
            <FontAwesomeIcon icon={faStar} className="icon-sm dark-blue" />
          </div>
        </Link>
      </div>
      <div className="holder ">
        <div className="recipe-holder mar-bottom-64 padding-16 rounded-shadow">
          {/** Title */}
          <div className="flex flex-wrap align-center space-between mar-bottom-16">
            <h3 className="mar-bottom-16 text-shadow-2">{recipe.name}</h3>
            <div className="mar-bottom-16">
              <Bookmark
                bookmarkState={bookmarked}
                addBookmark={() => {
                  bookmarkRecipe(recipe.name);
                  setBookmarked(true);
                }}
                removeBookmark={() => {
                  removeRecipeBookmark(recipe.name);
                  setBookmarked(false);
                }}
              />
            </div>
          </div>

          <div className="grey-line mar-bottom-8"></div>
          {/** Image */}
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
          {/** Icons */}
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
