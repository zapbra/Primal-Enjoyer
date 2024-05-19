//export const revalidate = 0;
import Render from "./Render";
import supabase from "../../../utils/supabaseClient";
import {recipesCache} from "../../../data/recipes";
import {cache} from "react";
import {DotNetApi} from "../../../utils/classes/DotNetApi/DotNetApi";
import {headers} from 'next/headers';

export const metadata = {
    title: "Raw Primal Recipes",
    description: "View this list of raw primal diet recipes to give you inspiration in your raw foods journey and create healthy, tasty recipes.",
    openGraph: {
        images: [
            {
                url: "/seo/steak_tartar_opengraph.png"
            }
        ]
    }
}
const fetchRecipes = async (pathname) => {


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
        await DotNetApi.writeLog(pathname, "Failed to fetch data on recipes page");
    }
};

const Page = async () => {
    // get current path
    const header = headers();
    const pathname = header.get('next-url');

    const [recipesFetch, firstRecipes, allRecipes] = await fetchRecipes(pathname);


    // Page load success log
    if (recipesFetch.length > 0 && firstRecipes.length > 0 && allRecipes.length > 0) {
        await DotNetApi.writeLog(pathname, "Successfully visited recipes page");
    }

    return (
        <Render
            recipesFetch={recipesFetch}
            allRecipes={allRecipes}
            firstRecipes={firstRecipes}
            recipesCache={recipesCache}
        />
    );
};

export default Page;
