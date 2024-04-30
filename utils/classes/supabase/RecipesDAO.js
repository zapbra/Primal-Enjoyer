import supabase from "../../supabaseClient";

export class RecipesDAO {


    static async getAllRecipeNames() {
        try {
            const {data, error} = await supabase
                .from("aaj_recipes")
                .select(
                    "name"
                );
            if (error) throw error;
            return {data, success: true};
        } catch (error) {
            return {error, success: false};
        }
    }

    static async getAllRecipes() {
        try {
            const {data, error} = await supabase
                .from("aaj_recipes")
                .select(
                    "name, servings, instructions, description, url, aaj_recipe_category(name), food_instances(quantity, food_id(name, icon))"
                );
            if (error) throw error;
            return {data, success: true};
        } catch (error) {
            return {error, success: false};
        }
    }

    static async getRecipeByName(name) {
        try {
            const {data, error} = await supabase
                .from("aaj_recipes")
                .select(
                    "*, aaj_recipe_category(name), food_instances(quantity, food_id(name, description, icon) )"
                )
                .eq("name", name)
                .maybeSingle();
            if (error) throw error;
            return {data, success: true};
        } catch (error) {
            return {error, success: false};
        }

    }
}

