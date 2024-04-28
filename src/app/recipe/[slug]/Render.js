"use client";

import Image from "next/image";
import Link from "next/link";
import React, {useEffect, useState} from "react";
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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faStar,
    faTurnDown,
    faTurnUp,
} from "@fortawesome/free-solid-svg-icons";
import {IoIosArrowBack} from "react-icons/io";
import {IoBookmark, IoBookmarkOutline} from "react-icons/io5";

const Render = ({recipe, recipe_joins}) => {
    const [bookmarked, setBookmarked] = useState(false);

    console.log("recipe_joins");
    console.log(recipe_joins);

    useEffect(() => {
        if (checkBookmarked(recipe.name, recipe.aaj_recipe_category.name)) {
            setBookmarked(true);
        }
    }, []);

    const [recipeElems, setRecipeElems] = recipe_joins.map((recipe, index) => {
        return (
            <Link key={index} href={`/recipe/${recipe.sub_recipe_id.name}`}>
                <p className="link--secondary">
                    {recipe.sub_recipe_id.name}
                </p>
            </Link>
        );
    });
    const [iconElems, setIconElems] = useState(
        recipe.food_instances.map((food_instance, index) => {
            return (

                <img
                    key={index}
                    src={`/icons${food_instance.food_id.icon}`}
                    width='48'
                    height='48'
                />
            );
        })
    );
    return (
        <div>
            <div className="mx-auto max-w-2xl py-8">
                {/** Back to recipes link */}
                <Link href={'/recipes'} className=' res-text-base cursor-pointer'>

                    <div className="inline-flex items-center hover:text-blue-500 mb-4">
                        <IoIosArrowBack
                            className='text-xl'
                        />
                        <p className='link'>
                            Back to
                            recipes
                        </p>
                    </div>
                </Link>
                {/** End of back to recipes link */}

                {/**
                 <Link href="/account">
                 <div className="base-box mar-bottom-16 flex-inline  align-center">
                 <h5 className="mar-right-8">View Saved</h5>
                 <FontAwesomeIcon icon={faStar} className="icon-sm dark-blue"/>
                 </div>
                 </Link>
                 */}

                <div className="bg-white border border-slate-300 px-4 py-2 rounded">
                    <div className="recipe-holder mar-bottom-64 padding-16 rounded-shadow">
                        {/** Title */}
                        <div className="flex flex-wrap items-center justify-between mb-4">
                            <h1 className="mb-4 res-heading-base">{recipe.name}</h1>
                            {/*<IoBookmarkOutline*/}
                            {/*    className='text-3xl cursor-pointer text-slate-500 hover:text-slate-950 transition'*/}
                            {/*/>*/}
                            {/*
                                <Bookmark
                                    bookmarkState={bookmarked}
                                    addBookmark={() => {
                                        bookmarkRecipe(recipe.name, recipe.aaj_recipe_category.name);
                                        setBookmarked(true);
                                    }}
                                    removeBookmark={() => {
                                        removeRecipeBookmark(
                                            recipe.name,
                                            recipe.aaj_recipe_category.name
                                        );
                                        setBookmarked(false);
                                    }}
                                />
                                */}
                        </div>

                        <div className="grey-line mar-bottom-8"></div>
                        {/** Image */}
                        <img
                            src={
                                recipe.url != null ? recipe.url : "/No_image_available.svg.png"
                            }
                            className='rounded mb-4'
                        />
                        {/** Icons */}
                        <div className="flex flex-wrap gap-4 items-center justify-around mb-4">
                            {iconElems}
                        </div>

                        <Ingredients
                            servings={recipe.servings}
                            food_instances={recipe.food_instances}
                        />

                        <Instructions instructions={recipe.instructions}/>
                        <h5 className="mb-2 font-bold">Included Recipes</h5>
                        <div className="grey-line mar-bottom-16"></div>
                        <div className="flex flex-wrap">{recipeElems}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Render;
