import supabase from "../../supabaseClient";

export class TimecodeDAO {
    static async getPostByName(name) {
        try {
            const {data, error} = await supabase.from("timecodes")
                .select("name, content, article_titles")
                .eq("name", name)
                .maybeSingle();
            if (error) throw error;


            return {data, success: true};
        } catch (error) {
            return {error, success: false};
        }
    }
}