import Render from "./Render";
import supabase from "../../../utils/supabaseClient";
import Tester from "./Tester";
import { recipesCache } from "../../../data/recipes";

const fetchRecipes = async () => {
  try {
    const { data, error } = await supabase
      .from("aaj_recipe_category")
      .select(
        "*, aaj_recipes(*, aaj_recipe_category(name), food_instances(quantity, food_id(name) ) )"
      );

    const { data: firstRecipes, error: firstError } = await supabase
      .from("aaj_recipes")
      .select(
        "*, aaj_recipe_category(name), food_instances(quantity, food_id(name))"
      )
      .limit(20);

    const { data: allRecipes, error: allError } = await supabase
      .from("aaj_recipes")
      .select(
        "*, aaj_recipe_category(name), food_instances(quantity, food_id(name))"
      );
    if (error) throw error;
    return [data, firstRecipes, allRecipes];
  } catch (error) {
    console.log(error);
  }
};

const Page = async () => {
  const [recipesFetch, firstRecipes, allRecipes] = await fetchRecipes();

  return (
    <>
      <Render
        recipesFetch={recipesFetch}
        allRecipes={allRecipes}
        firstRecipes={firstRecipes}
        recipesCache={recipesCache}
      />
      {/*    <Tester allRecipes={allRecipes} /> */}
    </>
  );
};

export default Page;
