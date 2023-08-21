import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faWeight } from "@fortawesome/free-solid-svg-icons";
import { returnRandom } from "../../../../utils/Functions";
import { lightColors } from "../../../../data/colors";
import { iconsDict } from "../../../../data/recipes";
import Highlight from "../../../../components/Utility/Highlight";

const Cont = styled.div`
  border-radius: 8px;
  border: 1px solid ${(props) => props.colors.grey};
  background-color: #fff;
  //box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px 0px;
  margin-bottom: 32px;
  cursor: pointer;
  padding: 16px;
  max-width: 400px;
  margin-left: 16px;
  margin-right: 16px;
  .ingredient {
    border-bottom: 1px solid ${(props) => props.colors.grey};
  }
  li {
    margin-left: 16px;
  }
  .category {
    border-radius: 8px;
    background-color: ${(props) => props.colors.darkBlue};
    padding: 4px 8px;
    h5 {
      color: ${(props) => props.colors.ultraLightBlue};
    }
  }
  .image-holder {
    width: 75%;
    height: 200px;
    margin: 0 auto;
    border-radius: 8px;
    overflow: hidden;
  }

  .blue-circle {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${(props) => props.colors.darkBlue};
  }

  transition: background-color 0.25s ease;
  &:hover {
    background-color: ${(props) => props.colors.lightGrey};
    p {
      text-decoration: none;
    }
  }
  &:active {
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
      rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  }
`;

const Recipe = ({
  name,
  briefDescription,
  ingredients,
  category,
  url,
  text,
}) => {
  let xd = "chicken soup";
  let ingredientElems = ingredients.map((ingredient, index) => {
    return (
      <div
        className="mar-bottom-16 padding-8 ingredient flex align-center space-between"
        key={index}
      >
        <p className="dark-blue mar-right-8">
          <Highlight text={text}>{ingredient.food_id.name}</Highlight>{" "}
          <span className="light-grey2">({ingredient.quantity})</span>
        </p>
        <Image
          src={`/icons${ingredient.food_id.icon}`}
          width={40}
          height={40}
          alt={""}
        />
      </div>
    );
  });

  if (url == null) url = "/No_image_available.svg.png";

  return (
    <Cont colors={COLORS} className="rounded-shadow">
      <Link href={`/recipe/${name}`}>
        <div className="flex flex-end mar-bottom-16">
          <div className="category flex align-center">
            <FontAwesomeIcon
              icon={iconsDict[category]}
              className="light-blue icon-ssm mar-right-8"
            />
            <h5>{category}</h5>
          </div>
        </div>
        <div className="relative image-holder ">
          <Image src={url} alt={name} fill style={{ objectFit: "cover" }} />
        </div>
        <div className="mar-bottom-16"></div>
        <div className="center-inline">
          <h4 className="mar-bottom-16">
            <Highlight text={text}>{name}</Highlight>
          </h4>
        </div>
        <div className="ingredients">
          {/* {ingredients.map((ingredient) => {
            return (
              <div className="mar-bottom-4 flex align-center justify-center">
                <div className="blue-circle mar-right-8"></div>
                <p className="dark-blue mar-right-8">
                  {ingredient.food_id.name}({ingredient.quantity})
                </p>
                <p>
                  <Highlight text={text}>{xd}</Highlight>
                </p>
              </div>
            );
          })} */}
          {ingredientElems}
        </div>
      </Link>
    </Cont>
  );
};

export default Recipe;
