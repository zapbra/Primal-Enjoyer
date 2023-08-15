"use client";
import { useState } from "react";

const Tester = ({ allRecipes }) => {
  console.log("allRecipes");
  console.log(allRecipes);
  const recipeArray = allRecipes.map((recipe) => {
    return {
      name: recipe.name,
      ingredients: recipe.food_instances
        .map((instance) => {
          return instance.food_id.name;
        })
        .join(", "),
    };
  });

  console.log("recipeArray");
  console.log(recipeArray);
  return <div>Tester</div>;
};

export default Tester;
