import supabase from "../../supabaseClient";

export class MailList {

    static async insertEmail(email) {
        try {
            const {data, error} = await supabase.from("email_list_user")
                .insert({email_address: email});
            if (error) throw error;
            return true;
        } catch (error) {
            return {error}
        }
    }
}

