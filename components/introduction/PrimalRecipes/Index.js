import { useState, useRef } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import Recipe from "@/app/recipes/components/Recipe";
import Link from "next/link";

const Cont = styled.div`
  position: relative;
`;

const Index = ({ recipes }) => {
  const [index, setIndex] = useState(0);

  const recipeRef = useRef(null);

  const recipeRender = (
    <Recipe
      name={recipes[index].name}
      ingredients={recipes[index].food_instances}
      category={recipes[index].aaj_recipe_category.name}
      url={"/cheesecake.jpg"}
    />
  );

  const increaseIndex = () => {
    // reset index if out of bounds
    if (index >= recipes.length - 1) {
      setIndex(0);
    } else {
      // increase index by 1
      setIndex((prev) => {
        return prev + 1;
      });
    }

    recipeRef.current.classList.remove("opacity-anim");
    recipeRef.current.classList.add("opacity-anim");
    setTimeout(() => {
      recipeRef.current.classList.remove("opacity-anim");
    }, 500);
  };

  const decreaseIndex = () => {
    // reset index to max if below 0
    if (index <= 0) {
      setIndex(recipes.length - 1);
    } else {
      // decrease index by 1
      setIndex((prev) => {
        return prev - 1;
      });
    }

    recipeRef.current.classList.remove("opacity-anim");
    recipeRef.current.classList.add("opacity-anim");
    setTimeout(() => {
      recipeRef.current.classList.remove("opacity-anim");
    }, 500);
  };

  return (
    <Cont colors={COLORS} className="mar-bottom-64">
      <h2 className="text-shadow mar-bottom-8">Primal Recipes</h2>
      <div className="blue-line mar-bottom-32"></div>
      <div className="flex justify-center">
        <div className="relative">
          <div ref={recipeRef}>{recipeRender}</div>
          <div className="flex space-between mar-bottom-16">
            <div className="orange-btn" onClick={decreaseIndex}>
              <h5>Last Recipe</h5>
            </div>
            <div className="green-btn" onClick={increaseIndex}>
              <h5>Next Recipe</h5>
            </div>
          </div>
          <Link href="/recipes">
            <div className="blue-bg-btn">
              <h3>View All</h3>
            </div>
          </Link>
        </div>
        <div></div>
      </div>
    </Cont>
  );
};

export default Index;
