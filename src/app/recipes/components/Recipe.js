import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faWeight } from "@fortawesome/free-solid-svg-icons";
import { returnRandom } from "../../../../utils/Functions";
import { lightColors } from "../../../../data/colors";

const Cont = styled.div`
  border-radius: 32px;
  border: 1px solid ${(props) => props.colors.grey};
  .header-spec {
    background-color: ${(props) => props.colors.ultraLightBlue};
    padding: 16px;
    border-radius: 32px 32px 0 0;
  }
  .category {
    border: 1px solid ${(props) => props.colors.black};
    padding: 4px 8px;
  }
  .image-holder {
    height: 120px;
    width: 100%;
  }
  li {
    margin-left: 32px;
  }
`;

const Recipe = ({ name, briefDescription, ingredients, categories, url }) => {
  return (
    <Cont colors={COLORS}>
      <div className="header-spec flex space-between align-center">
        <h5 className="light">{name}</h5>
        <FontAwesomeIcon icon={faArrowRight} className="icon-med dark-blue" />
      </div>
      <div className="flex-wrap mar-bottom-16">
        {categories.map((category) => {
          return (
            <div
              className="category flex-inline align-center"
              style={{ backgroundColor: returnRandom(lightColors) }}
            >
              <FontAwesomeIcon
                icon={faWeight}
                className="dark-blue mar-right-8 icon-ssm"
              />
              <p>{category}</p>
            </div>
          );
        })}
      </div>
      <div className="flex">
        <div className="flex-one">
          <div className="relative image-holder">
            <Image src="/cheesecake.jpg" fill style={{ objectFit: "cover" }} />
          </div>
          <p className="small mar-top-8 padding-8">{briefDescription}</p>
        </div>
        <div className="flex-one ">
          <ul>
            {ingredients.map((ingredient) => {
              return (
                <li>
                  <p className="small">{ingredient}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Cont>
  );
};

export default Recipe;
