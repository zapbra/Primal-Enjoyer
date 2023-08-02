import { gql, GraphQLClient } from "graphql-request";
import Render from "./Render";

export const getStaticProps = async () => {
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
        aajonusCatagory {
          title
        }
        year
        tags {
          ... on Tag {
            text
          }
        }
      }

      tags(first: 1000) {
        text
      }

      moreArticles: articles(skip: 1000, first: 999) {
        title
        aajonusCatagory {
          title
        }
        year
        tags {
          ... on Tag {
            text
          }
        }
      }
    }
  `;
  const data = await graphQLClient.request(query);
  const firstArticles = data.articles;
  const secondArticles = data.moreArticles;
  const superTags = data.tags;
  /* const graphQLClient2 = new GraphQLClient(process.env.GRAPH_CMS_ENDPOINT_3, {
    header: {
      Authorization: process.env.GRAPH_CMS_TOKEN_3,
    },
  });
  const query2 = gql`
    query {
      tags(first: 1000) {
        text
      }

      articles(first: 1000) {
        title
        aajonusCatagory {
          title
        }
        year
        tags {
          ... on Tag {
            text
          }
        }
      }
    }
  `;
  const data2 = await graphQLClient2.request(query2);
  const thirdArticles = data2.articles; */

  const articlesFetch = [...firstArticles, ...secondArticles];
  return {
    props: {
      articlesFetch,
      superTags,
    },
  };
};

const Page = async () => {
  const data = await getStaticProps();
  const { articlesFetch, superTags } = await data.props;

  return (
    <div>
      <Render articlesFetch={articlesFetch} superTags={superTags}></Render>
    </div>
  );
};

export default Page;
