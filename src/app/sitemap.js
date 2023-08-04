import { gql, GraphQLClient } from "graphql-request";
import supabase from "../../utils/supabaseClient";

export default async function sitemap() {
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
      aajonusCatagories(first: 1000) {
        title
      }
    }
  `;

  const data = await graphQLClient.request(query);
  const firstArticles = data.articles;
  const secondArticles = data.moreArticles;
  const articlesFetch = [...firstArticles, ...secondArticles];
  const { data: postsFetch, error } = await supabase
    .from("post")
    .select("title");

  const posts = postsFetch.map((post) => {
    return {
      url: `https://www.primalenjoyer.com/encyclopedia/${post.title.replaceAll(
        "&",
        "&amp;"
      )}`,
    };
  });
  const articles = articlesFetch.map((article) => {
    return {
      url: `https://www.primalenjoyer.com/article/${article.title.replaceAll(
        "&",
        "&amp;"
      )}`,
    };
  });
  const hardCodedRoutes = [
    {
      url: "https://www.primalenjoyer.com",
    },
    {
      url: "https://www.primalenjoyer.com/search",
    },
    {
      url: "https://www.primalenjoyer.com/encyclopedia",
    },
    {
      url: "https://www.primalenjoyer.com/polls",
    },
    {
      url: "https://www.primalenjoyer.com/contact",
    },
    {
      url: "https://www.primalenjoyer.com/createPost",
    },
    {
      url: "https://www.primalenjoyer.com/categories",
    },
    {
      url: "https://www.primalenjoyer.com/account",
    },
    {
      url: "https://www.primalenjoyer.com/editAccount",
    },
    {
      url: "https://www.primalenjoyer.com/signup",
    },
    {
      url: "https://www.primalenjoyer.com/login",
    },
  ];

  return [...posts, ...articles, ...hardCodedRoutes];
}
