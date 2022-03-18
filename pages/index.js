import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import { GraphQLClient, gql } from "graphql-request";

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    header: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });
  const query = gql`
    query myQuery {
      articles {
        id
        title
        author
        date
        content {
          raw
          markdown
        }
        slug
        catagory
      }
    }
  `;

  const data = await graphQLClient.request(query);
  const articles = data.articles;

  return {
    props: {
      articles,
    },
  };
};

export default function Home({ articles }) {
  console.log(articles);
  return <div></div>;
}
