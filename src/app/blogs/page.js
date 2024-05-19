import Head from "next/head";
import supabase from "../../../utils/supabaseClient";
import Render from "./Render";
import {DotNetApi} from "../../../utils/classes/DotNetApi/DotNetApi";
import {headers} from "next/headers";

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

    // get current pathname for logging current page visit
    const header = headers();
    const pathname = header.get('next-url');
    
    if (sortedPosts?.length > 0) {
        await DotNetApi.writeLog(pathname, "Successfully visited all blogs");
    } else {
        await DotNetApi.writeLog(pathname, "Error: Failed to visit all blogss");
    }

    return (
        <Render sortedPosts={sortedPosts}/>
    );
};

export default Encyclopedia;
