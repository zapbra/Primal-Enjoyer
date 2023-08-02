import Head from "next/head";
import { gql, GraphQLClient } from "graphql-request";
import Render from "./Render";

export const fetchData = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    header: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });
  const query = gql`
    query {
      aajonusCatagories {
        title
        coverImage {
          url
        }
        article(last: 3) {
          ... on Article {
            title
          }
        }
      }
    }
  `;
  const data = await graphQLClient.request(query);
  const catagoriesFetch = data.aajonusCatagories;

  return {
    props: {
      catagoriesFetch,
    },
  };
};

const Page = async () => {
  let data = await fetchData();
  data = data.props.catagoriesFetch;

  const meta = {
    title: "Raw Primal Categories",
    description:
      "Search for Aajonus Vonderplanitz raw primal diet health advice, nutrition articles by category. Aajonus vonderplanitz hygiene, raw meat diet schedule.",
    link: "https://www.primalenjoyer.com/categories",
    type: "website",
    date: "2022-10-12 15:00:00.000",
    image: "/seo/categories.PNG",
  };

  return (
    <div>
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

      <Render catagoriesFetch={data} />
    </div>
  );
};

export default Page;
