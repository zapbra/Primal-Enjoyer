import Head from "next/head";
import {gql, GraphQLClient} from "graphql-request";
import React from "react";
import {UpperCase} from "../../../../utils/Functions";
import Render from "./Render";

export const generateStaticParams = async () => {
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
      }
    }
  `;

    const data = await graphQLClient.request(query);
    /*  const paths = data.aajonusCatagories.map((catagory) => {
      return {
        params: { slug: catagory.title },
      };
    }); */

    return data.aajonusCatagories.map((catagory) => {
        return {slug: catagory.title};
    });
};

/* export const getStaticProps = async (pageContext) => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    header: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });
  const pageSlug = pageContext.params.slug;

  const query = gql`
    query ($pageSlug: String!) {
      aajonusCatagory(where: { title: $pageSlug }) {
        coverImage {
          url
        }
        title
        article {
          ... on Article {
            title
            tags {
              text
            }
            content {
              raw
            }
            year
          }
        }
      }
    }
  `;
  const variables = {
    pageSlug,
  };
  const data = await graphQLClient.request(query, variables);
  const aajonusCatagory = data.aajonusCatagory;

  return {
    props: {
      aajonusCatagory,
    },
  };
}; */

const Page = async ({params}) => {
    let {slug} = params;
    slug = slug.replaceAll("%20", " ");

    const url = process.env.ENDPOINT;
    const graphQLClient = new GraphQLClient(url, {
        header: {
            Authorization: process.env.GRAPH_CMS_TOKEN,
        },
    });

    const query = gql`
    query ($slug: String!) {
      aajonusCatagory(where: { title: $slug }) {
        coverImage {
          url
        }
        title
        article {
          ... on Article {
            title
            tags {
              text
            }
            content {
              raw
            }
            year
          }
        }
      }
    }
  `;
    const variables = {
        slug,
    };

    const data = await graphQLClient.request(query, variables);
    const aajonusCatagory = data.aajonusCatagory;

    const sortedArticles = aajonusCatagory.article.sort(function (a, b) {
        var textA = a.title.toUpperCase();
        var textB = b.title.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
    const meta = {
        title: aajonusCatagory.title,
        description: `Aajonus Vonderplanitz raw meat articles related to ${aajonusCatagory.title}`,
        link: `https://www.primalenjoyer.com/Category/${aajonusCatagory.title}`,
        type: "website",
        date: "2022-10-11 15:00:00.000",
        image: aajonusCatagory.coverImage.url,
        keywords: `aajonus vonderplanitz, raw meat, health, information, raw primal, diet, ${aajonusCatagory.title}`,
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
                <link rel="canonical" href={meta.link}/>
                <meta property="og:url" content={meta.link}/>
                <meta name="keywords" content={meta.keywords}/>

                <meta name="description" content={meta.description}/>
                <title>{UpperCase(aajonusCatagory.title)}</title>
            </Head>
            <Render
                sortedArticles={sortedArticles}
                aajonusCatagory={aajonusCatagory}
            />
        </>
    );
};

export default Page;
