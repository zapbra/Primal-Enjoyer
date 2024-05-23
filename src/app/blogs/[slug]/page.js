import Render from "./Render";
import Head from "next/head";
import supabase from "../../../../utils/supabaseClient";
import {cache} from 'react';
import {PostDAO} from "../../../../utils/classes/supabase/PostDAO";
import {DotNetApi} from "../../../../utils/classes/DotNetApi/DotNetApi";

export async function generateMetadata({params, searchParms}, parent) {
    let {slug} = params;
    slug = decodeURIComponent(slug);
    const {post, success} = await getPost(slug);

    return {
        title: slug,
        description: post.introduction,
        date: post.created_at,
        openGraph: {
            images: [
                {
                    url: post?.post_url.text || null
                }
            ]
        }
    }
}

const getPost = cache(async (title) => {
    const {data, success} = await PostDAO.getPostByTitle(title);
    return {post: data, success};
})

// fetches all posts for static generation
export async function generateStaticParams() {
    const {data, error} = await supabase.from("post").select("title");

    return data.map((post) => {
        return {slug: post.title.toString()};
    });
}


const Page = async ({params}) => {

    // current page url
    let {slug} = params;
    slug = decodeURIComponent(slug);

    const pathname = "/blogs/" + slug;
    // fetch current post
    const {post, success} = await getPost(slug);

    /*
    // Send a log based on blog fetch condition
    if (success) {
        await DotNetApi.writeLog(pathname, `Successfully visited ${slug} blog post.`);
    } else {
        await DotNetApi.writeLog(pathname, `Failed to visit ${slug} blog post. Didn't fetch post properly.`);
    }
    */

    return (
        <Render
            slug={slug}
            post={post}
        />
    );
};

export default Page;
