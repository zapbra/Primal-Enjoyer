import { gql, GraphQLClient } from "graphql-request";

const url = process.env.ENDPOINT;
const graphQLClient = new GraphQLClient(url, {
  header: {
    Authorization: process.env.GRAPH_CMS_TOKEN,
  },
});

export const getArticlePreviews = async () => {
  const query = gql`
    query {
      articles {
        title
        coverImage {
          url
        }

        tags {
          ... on Tag {
            text
          }
        }
      }
    }
  `;
  const data = (await graphQLClient.request(query)) || [];
  const articlesFetch = data.articles;

  return {
    props: {
      articlesFetch,
    },
  };
};
