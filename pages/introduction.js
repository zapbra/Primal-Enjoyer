import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Introduction from "../components/introduction/index";

import { GraphQLClient, gql } from "graphql-request";
import { NextSeo } from "next-seo";
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
  const SEO = {
    title: "Raw Primal Diet Introduction",
    description:
      "How to do the Raw Primal Diet and what is the Raw Primal Diet",
  };
  return (
    <>
      <NextSeo {...SEO} />
      <main>
        <div>
          <Introduction colors={COLORS} />
        </div>
      </main>
    </>
  );
}
