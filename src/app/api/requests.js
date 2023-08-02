import { gql, GraphQLClient } from "graphql-request";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    header: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const query = gql`
    query {
      selfArticles(last: 4) {
        title
        description
        catagory {
          id
        }
        content {
          raw
        }
        coverImage {
          url
        }
        date
        sources
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
