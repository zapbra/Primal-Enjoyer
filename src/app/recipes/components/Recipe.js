import Image from "next/image";
import Link from "next/link";
import {useState} from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faWeight} from "@fortawesome/free-solid-svg-icons";
import {returnRandom} from "../../../../utils/Functions";
import {lightColors} from "../../../../data/colors";
import {iconsDict} from "../../../../data/recipes";
import Highlight from "../../../../components/Utility/Highlight";


const Recipe = ({
                    name,
                    briefDescription,
                    ingredients,
                    category,
                    url,
                    text,
                }) => {
    let ingredientElems = ingredients.map((ingredient, index) => {
        return (
            <div
                className="flex items-center justify-between py-2 border-b-2 border-slate-200"
                key={index}
            >
                <p className="res-text-sm ">
                    <Highlight text={text}>{ingredient.food_id.name}</Highlight>{" "}
                    <span className="text-slate-400">({ingredient.quantity})</span>
                </p>
                <img src={`/icons/${ingredient.food_id.icon}`} alt={ingredient.food_id.icon} width='32' height='32'
                     className='object-contain'/>

            </div>
        );
    });

    if (url == null) url = "/No_image_available.svg.png";

    return (
        <div
            className="bg-white border-slate-300 border rounded px-6 py-4 w-80 h-fit hover:shadow-2xl transition active:underline">
            <Link href={`/recipe/${name}`}>
                <div className="flex flex-end mb-4">
                    <div className="flex items-center bg-blue-950 rounded text-slate-50 px-2 py-1">
                        <FontAwesomeIcon
                            icon={iconsDict[category]}
                            className="mr-2"
                        />
                        <p className=''>{category}</p>
                    </div>
                </div>
                <img src={url} alt={name} className='rounded mb-4 max-h-40 w-full object-cover'/>
                <div className="center-inline">
                    <h4 className="res-heading-base font-bold mb-4">
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
        </div>
    );
};

export default Recipe;
