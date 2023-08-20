import React from "react";
import Render from "./Render";
import supabase from "../../../../utils/supabaseClient";

export async function generateStaticParams() {
  const { data, error } = await supabase.from("aaj_recipes").select("name");

  return data.map((recipe) => {
    return { slug: recipe.title };
  });
}

const fetchData = async (name) => {
  const { data, error } = await supabase
    .from("aaj_recipes")
    .select(
      "*, aaj_recipe_category(name), food_instances(quantity, food_id(name, description) )"
    )
    .eq("name", name)
    .maybeSingle();
  return data;
};

const page = async ({ params }) => {
  const slug = decodeURI(params.slug);
  const recipe = await fetchData(slug);

  return (
    <>
      <Render recipe={recipe} params={slug} />
    </>
  );
};

export default page;
