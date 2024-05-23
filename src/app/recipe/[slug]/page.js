import React from "react";
import Render from "./Render";
import supabase from "../../../../utils/supabaseClient";
import {cache} from "react";
import {RecipesDAO} from "../../../../utils/classes/supabase/RecipesDAO";
import {headers} from 'next/headers';
import {DotNetApi} from "../../../../utils/classes/DotNetApi/DotNetApi";

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
    return await RecipesDAO.getRecipeByName(name);
});

export async function generateStaticParams() {
    const {data, success} = await RecipesDAO.getAllRecipeNames();

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
    // get current path
    const header = headers();
    const pathname = header.get('next-url');

    const slug = decodeURIComponent(params.slug);
    const {data, success} = await getRecipe(slug);

    
    // log based on if recipe was fetched successfully
    if (success) {
        await DotNetApi.writeLog(pathname, `Successfully visited ${slug} recipe page`)
    } else {
        await DotNetApi.writeLog(pathname, `Failed to visit ${slug} recipe page`)
    }


    return (
        <>
            <Render recipe={data} params={slug}/>
        </>
    );
};

export default page;
