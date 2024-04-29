//export const revalidate = 0;
import Render from "./Render";
import supabase from "../../../utils/supabaseClient";
import {recipesCache} from "../../../data/recipes";

const fetchRecipes = async () => {
    try {
        const {data, error} = await supabase
            .from("aaj_recipe_category")
            .select(
                "*, aaj_recipes(name, servings, instructions, description, url, aaj_recipe_category(name), food_instances(quantity, food_id(name, icon) ) )"
            );

        const {data: firstRecipes, error: firstError} = await supabase
            .from("aaj_recipes")
            .select(
                "name, servings, instructions, description, url, aaj_recipe_category(name), food_instances(quantity, food_id(name, icon))"
            )
            .limit(20);

        const {data: allRecipes, error: allError} = await supabase
            .from("aaj_recipes")
            .select(
                "name, servings, instructions, description, url, aaj_recipe_category(name), food_instances(quantity, food_id(name, icon))"
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
        </>
    );
};

export default Page;
