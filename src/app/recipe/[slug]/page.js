import React from "react";
import Render from "./Render";
import supabase from "../../../../utils/supabaseClient";
import {cache} from "react";
import {RecipesDAO} from "../../../../utils/classes/supabase/RecipesDAO";

export async function generateMetadata({params}) {
    let {slug} = params;
    slug = decodeURIComponent(slug);
    const recipe = await getRecipe(slug);

    return {
        title: slug,
        description: recipe.instructions,
        openGraph: {
            images: [
                {
                    url: recipe.url
                }
            ]
        }
    }
}

const getRecipe = cache(async (name) => {
    const {data, error} = await RecipesDAO.getRecipeByName(name);
    return data;
});

export async function generateStaticParams() {
    const {data, error} = await supabase.from("aaj_recipes").select("name");

    return data.map((recipe) => {
        return {slug: recipe.title};
    });
}

// const fetchData = async (name) => {
//     const recipe = await getRecipe(name);
//
//     // const {data: recipe_joins, error: joins_error} = await supabase
//     //     .from("recipe_joins")
//     //     .select("sub_recipe_id(name, url)")
//     //     .eq("main_recipe_id", recipe.id);
//     return recipe;
// };

const page = async ({params}) => {
    const slug = decodeURIComponent(params.slug);
    const recipe = await getRecipe(slug);

    console.log("recipe");
    console.log(recipe);


    return (
        <>
            <Render recipe={recipe} params={slug}/>
        </>
    );
};

export default page;
