import Render from "./home/Render";
import Head from "next/head";

const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";

export async function fetchData() {
  const res = await fetch(
    `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLA4-m0Jyxx3mHBv5fxOwmyWYton1z_4qk&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`
  );
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

const Page = async () => {
  let data = await fetchData();
  data = data.props.data;
  const meta = {
    title: "Raw Primal diet Aajonus Vonderplanitz introduction.",
    description:
      "How to get started on raw meat diet by Aajonus Vonderplanitz, step by step guide. Why raw meat is healthy for you and how to get started.",
    link: "https://www.primalenjoyer.com/index",
    type: "website",
    date: "2022-10-10 15:00:00.000",
    image: "/seo/home.PNG",
    keywords:
      "aajonus vonderplanitz, raw meat, health, information, raw primal, diet",
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
      <Render data={data}></Render>
    </>
  );
};

export default Page;
