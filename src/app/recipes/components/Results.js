import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import FilterBar from "./FilterBar";
import Recipe from "./Recipe";
const Cont = styled.div`
  .recipes-holder {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const Results = ({
  recipesRender,
  categories,
  setCategories,
  selectCategory,
  text,
}) => {
  const recipeElems = recipesRender.map((recipe) => {
    return (
      <Recipe
        text={text}
        name={recipe.name}
        briefDescription={recipe.briefDescription}
        ingredients={recipe.food_instances}
        category={recipe.aaj_recipe_category.name}
        url={"/cheesecake.jpg"}
      />
    );
  });

  return (
    <Cont colors={COLORS}>
      <FilterBar
        selectCategory={selectCategory}
        categories={categories}
        setCategories={setCategories}
      />
      <div className="mar-bottom-32"></div>
      <div className="recipes-holder ">{recipeElems}</div>
    </Cont>
  );
};

export default Results;
