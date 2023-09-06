import { useState } from "react";
import Link from "next/link";
import DefaultBtn from "../../../../components/Buttons/DefaultBtn";
import AntiDefaultBtn from "../../../../components/Buttons/AntiDefaultBtn";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import SavedRecipes from "./SavedRecipes";
import ShoppingList from "./ShoppingList";
import { getBookmarkedRecipes } from "../../../../utils/Functions";
import {
  faBowlRice,
  faCarrot,
  faCheese,
  faCookie,
  faDrumstickBite,
  faGlassWater,
  faHandSparkles,
  faPepperHot,
  faSort,
  faWater,
} from "@fortawesome/free-solid-svg-icons";
import { recipesData } from "../../../../data/recipes";

const Cont = styled.div`
  padding: 32px;
  max-width: 1200px;
  margin: 0 auto;
  @media only screen and (max-width: 600px) {
    padding: 16px;
  }
`;

const Guest = () => {
  const [categories, setCategories] = useState([
    { name: "all", icon: faSort, selected: true },
    { name: "meat meals", icon: faDrumstickBite, selected: false },
    { name: "milkshakes", icon: faGlassWater, selected: false },
    { name: "vegetable juice", icon: faCarrot, selected: false },
    { name: "sauces", icon: faPepperHot, selected: false },
    { name: "soups", icon: faBowlRice, selected: false },
    { name: "deserts", icon: faCookie, selected: false },
    { name: "hygiene", icon: faHandSparkles, selected: false },
    { name: "cheese", icon: faCheese, selected: false },
  ]);

  const [ingredients, setIngredients] = useState([]);

  const [recipes, setRecipes] = useState(getBookmarkedRecipes());
  const [recipesRender, setRecipesRender] = useState(
    Object.entries(getBookmarkedRecipes())
      .map(([key, value]) => value)
      .flat()
  );

  const selectCategory = (name) => {
    // this var will store the recipes before they are sorted into shopping list
    let unsortedRecipes = [];
    // change the selected recipe based off the name selected
    setCategories((prev) => {
      return prev.map((category) => {
        if (category.name == name) {
          // if selected category, check to see if already selected and unselect and set name to all to render all
          if (category.selected) {
            category.selected = false;
            name = "all";
          } else {
            category.selected = true;
          }
        } else {
          category.selected = false;
        }
        return category;
      });
    });

    // check if all or individual category selected and set the recipes to render
    // based off that
    let recipesMatch = [];

    if (name == "all") {
      recipesMatch = Object.entries(recipes)
        .map(([key, value]) => {
          return { name: value[0], category: key };
        })
        .flat()
        .filter((recipe) => recipe.name != undefined);
    } else {
      recipesMatch = recipes[name].map((value) => {
        return { name: value, category: name };
      });
      // loop through each recipes of selected category to find matches
      // once matches length is same length as recipeMatches then break the loop
      let matchesLength = recipesMatch.length;
      let category = recipesData.find(
        (category) => category.name == name
      ).aaj_recipes;
      // iterate over each recipe from the recipe category
      for (let i = 0; i < category.length; i++) {
        // check to see if all matches have been found and leave if so
        if (unsortedRecipes.length >= matchesLength) {
          break;
        }
        // iterate over each (shell) recipe that was matched based on selected category
        for (let j = 0; j < recipesMatch.length; j++) {
          // compare recipes and add full recipe if the names match
          if (recipesMatch[j].name == category[i].name) {
            unsortedRecipes.push(category[i]);
          }
        }
      }
    }
    setIngredients((prev) => {
      // set temp ingredients to return later
      let tempIngredients = {};

      // FINISH THIS LATER

      // interate over each recipe
      unsortedRecipes.forEach((recipe) => {
        // iterate over each ingredient
        recipe.food_instances.forEach((food) => {
          // if ingredient hasn't been added to tempIngredients object yet
          if (!tempIngredients.hasOwnProperty(food.food_id.name)) {
            tempIngredients[food.food_id.name] = {
              name: food.food_id.name,
              quantities: {},
            };
          }
        });
      });
    });
    setRecipesRender(recipesMatch);
  };

  return (
    <Cont colors={COLORS}>
      <div className="shallow-cont ssm-spacer">
        <h3>Have an Account?</h3>

        <p className="mar-bottom-one">Login or sign up below</p>
        <div className="mar-bottom-16 sign-up">
          <Link href={{ pathname: "/signup" }}>
            <DefaultBtn text="Sign Up" />
          </Link>
        </div>
        <div>
          <Link href={{ pathname: "/login" }}>
            {" "}
            <AntiDefaultBtn text="Sign In" />
          </Link>
        </div>
      </div>
      <SavedRecipes
        categories={categories}
        selectCategory={selectCategory}
        recipes={recipes}
        recipesRender={recipesRender}
      />
      <div className="mar-bottom-32"></div>
      <ShoppingList recipesRender={recipesRender} />
    </Cont>
  );
};

export default Guest;
