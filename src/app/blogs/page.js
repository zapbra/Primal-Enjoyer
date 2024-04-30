import Head from "next/head";
import supabase from "../../../utils/supabaseClient";
import Render from "./Render";

export const fetchData = async () => {
    const {data, error} = await supabase
        .from("post")
        .select(
            "title, created_at, introduction, user_id(username), post_url(text), postLikes(id), published"
        );
    const sortPosts = data.sort((a, b) => {
        return a.created_at < b.created_at ? 1 : -1;
    });
    const sortedPosts = sortPosts.filter((post) => {
        return post.published;
    });
    return {
        props: {
            sortedPosts,
        },
    };
};
const Encyclopedia = async () => {
    const data = await fetchData();
    const {sortedPosts} = data.props;


    return (
        <Render sortedPosts={sortedPosts}/>
    );
};

export default Encyclopedia;
