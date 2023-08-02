import { gql, GraphQLClient } from "graphql-request";
import Render from "./Render";
import Testing from "./Testing";
import supabase from "../../../../utils/supabaseClient";

export async function generateStaticParams() {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    header: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });
  const query = gql`
    query {
      articles(first: 1000) {
        title
      }
      moreArticles: articles(skip: 1000, first: 999) {
        title
      }
    }
  `;
  const data = await graphQLClient.request(query);
  const firstArticles = data.articles;
  const secondArticles = data.moreArticles;
  const articlesFetch = [...firstArticles, ...secondArticles];
  /* const paths = articlesFetch.map((article) => ({
    params: { slug: article.title.toString() },
  })); */

  return articlesFetch.map((article) => ({
    slug: article.title.toString(),
  }));
}

/* export async function getStaticProps({ slug }) {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    header: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const pageSlug = slug;

  const query = gql`
    query ($pageSlug: String!) {
      article(where: { title: $pageSlug }) {
        title
        coverImage {
          url
        }
        aajonusCatagory {
          title
        }
        audio {
          url
        }
        tags(first: 10) {
          text
        }
        content {
          raw
        }
      }
      articles(first: 1000) {
        title

        tags {
          ... on Tag {
            text
          }
        }
      }

      moreArticles: articles(skip: 1000, first: 999) {
        title
        aajonusCatagory {
          title
        }
        tags {
          ... on Tag {
            text
          }
        }
      }
    }
  `;
  const variables = {
    pageSlug,
  };
  const data = await graphQLClient.request(query, variables);
  const article = data.article;
  const articles = [...data.articles, ...data.moreArticles];

  return {
    props: {
      article,
      articles,
    },
  };
} */

const Page = async ({ params }) => {
  let { slug } = params;
  slug = slug.replaceAll("%20", " ");
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    header: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const query = gql`
    query ($slug: String!) {
      article(where: { title: $slug }) {
        title
        coverImage {
          url
        }
        aajonusCatagory {
          title
        }
        audio {
          url
        }
        tags(first: 10) {
          text
        }
        content {
          raw
        }
      }
      articles(first: 1000) {
        title

        tags {
          ... on Tag {
            text
          }
        }
      }

      moreArticles: articles(skip: 1000, first: 999) {
        title
        aajonusCatagory {
          title
        }
        tags {
          ... on Tag {
            text
          }
        }
      }
    }
  `;
  const variables = {
    slug,
  };
  const data = await graphQLClient.request(query, variables);
  const article = data.article;
  const articles = [...data.articles, ...data.moreArticles];

  return (
    <div>
      <Render article={article} articles={articles} slug={slug} />
    </div>
  );
};

export default Page;
