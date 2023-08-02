"use client";

import Head from "next/head";
import supabase from "../../../utils/supabaseClient";
import Render from "./Render";

export const getServerSideProps = async () => {
  const { data, error } = await supabase
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
  const data = await getServerSideProps();
  const { sortedPosts } = data.props;

  const meta = {
    title: "Encyclopedia",
    description:
      "Browse raw primal diet, Aajonus Vonderplanitz health articles. Get healthy from raw foods, and explore articles on detox, carbohydrates, dangers of salt, benefits of raw milk.",
    link: "https://www.primalenjoyer.com/encyclopedia",
    type: "website",
    date: "2022-12-11 15:00:00.000",
    image: "/seo/encyclopedia.PNG",
    keywords:
      "encyclopedia, aajonus vonderplanitz, raw meat, health, information, raw primal, diet, encyclopedia, article, health articles",
  };
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Primal Enjoyer" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="article:published_time" content={meta.date} />
        <link rel="canonical" href={meta.image} />
        <meta property="og:url" content={meta.link} />
        <meta name="keywords" content={meta.keywords} />

        <meta name="description" content={meta.description} />
      </Head>
      <Render sortedPosts={sortedPosts} />
    </>
  );
};

export default Encyclopedia;
