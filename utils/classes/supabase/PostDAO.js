import supabase from "../../supabaseClient";

export class PostDAO {
    static async getPostByTitle(title) {
        try {
            const {data, error} = await supabase
                .from("post")
                .select(
                    "*, tags(title), post_url(text), link(*))"
                )
                .eq("title", title).maybeSingle();
            if (error) throw error;
            return {data, success: true};
        } catch (error) {
            return {error, success: false};
        }
    }
}