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
  display:grid;
  grid-template-areas: 'left left left right';
  gap: 2rem;
`;
const Left = styled.div`
  grid-area: left;
`;

const Right = styled.div`
  grid-area: right;
`
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
      <Left>
      <Introduction colors = {COLORS} />
      </Left>
      <Right>
      <Explore colors = {COLORS} />
      </Right>>
    </Container>
  );
}

