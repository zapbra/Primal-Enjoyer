import { gql, GraphQLClient } from "graphql-request";

const url = process.env.ENDPOINT;
const graphQLClient = new GraphQLClient(url, {
  header: {
    Authorization: process.env.GRAPH_CMS_TOKEN,
  },
});

export const getRecentArticles = async () => {
  const query = gql`
    query {
      selfArticles(last: 4) {
        title
        description
        coverImage {
          url
        }
      }
    }
  `;
  const data = await graphQLClient.request(query);
  const articles = data.selfArticles;

  return {
    props: {
      articles,
    },
  };
};
