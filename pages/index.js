import Head from "next/head";
import styled from 'styled-components';
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Introduction from '../components/Introduction';
import Explore from '../components/Explore';
import { GraphQLClient, gql } from "graphql-request";
import COLORS from '../Data/colors';

const Container = styled.div`

`;

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
  
  return (
    <Container>
      <Introduction colors = {COLORS} />
    </Container>
  );
}

