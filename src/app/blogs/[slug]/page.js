import Render from "./Render";
import Head from "next/head";
import supabase from "../../../../utils/supabaseClient";

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

    // fetch current post
    const {data, error} = await supabase
        .from("post")
        .select(
            "*, tags(title), post_url(text), link(*))"
        )
        .eq("title", slug);


    const meta = {
        title: data[0]?.title,
        description: data[0]?.description,
        link: `https://www.primalenjoyer.com/encyclopedia/${data[0]?.title}`,
        type: "website",
        date: data[0]?.created_at,
        image: data[0]?.post_url[0]?.text || null,
        keywords: data[0]?.tags.map((tag) => tag.title).join(", "),
    };

    return (
        <>
            <Head>
                <title>{meta.title}</title>
                <meta name="robots" content="follow, index"/>
                <meta property="og:type" content={meta.type}/>
                <meta property="og:site_name" content="Primal Enjoyer"/>
                <meta property="og:description" content={meta.description}/>
                <meta property="og:title" content={meta.title}/>
                <meta property="og:image" content={meta.image}/>
                <meta property="article:published_time" content={meta.date}/>
                <link rel="canonical" href={meta.image}/>
                <meta property="og:url" content={meta.link}/>
                <meta name="keywords" content={meta.keywords}/>

                <meta name="description" content={meta.description}/>
            </Head>
            <Render
                slug={slug}
                post={data[0]}
            />
        </>
    );
};

export default Page;
