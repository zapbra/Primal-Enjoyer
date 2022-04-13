import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Introduction from "../components/Introduction";
import Explore from "../components/explore/index";
import { GraphQLClient, gql } from "graphql-request";
import COLORS from "../Data/colors";

const Container = styled.div`
  display: grid;
  grid-template-areas: "left left left right";
  gap: 2rem;
  margin-left: 5%;
  margin-right: -5%;
  @media only screen and (max-width: 1199px) {
    grid-template-areas:
      "right right right right"
      "left left left left";
    margin: 2%;
  }
  @media only screen and (max-width: 991x) {
    margin: 0;
  }
`;
const Left = styled.div`
  grid-area: left;
`;

const Right = styled.div`
  grid-area: right;
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
      selfArticles(last: 8) {
        title
        briefTitle
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

export default function Home({ articles }) {
  return (
    <main>
      <Head>
        <title>Aajonus Vonderplanitz Raw Primal Diet Introduction</title>
        <meta http-equiv="Content-Type" content="text/html" charset="utf-8" />
        <meta
          name="description"
          content="Introduction to the Raw Primal Diet by Aajonus Vonderplanitz"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container>
        <Left>
          <Introduction colors={COLORS} />
        </Left>
        <Right>
          <Explore articles={articles} colors={COLORS} />
        </Right>
      </Container>
    </main>
  );
}
