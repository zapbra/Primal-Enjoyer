import { gql, GraphQLClient } from "graphql-request";
import styled from "styled-components";

import COLORS from "../../Data/colors";
const Article = styled.div`
  background-color: #fff;
  border: 1px solid black;
  box-shadow: 5px 5px 5px 5px rgba(1, 1, 1, 0.5);
  border-radius: 1rem;
  padding: 10px;
  max-width: 1100px;
  margin: 0 auto;
  img {
    width: 100%;
  }
  h1 {
    text-align: center;
  }
  .description {
    background-color: #e9f1fd;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      text-shadow: 2px 2px 5px rgba(1, 1, 1, 0.5);
      border-bottom: 1px solid black;
      border-top: 1px solid black;
      background-color: #fff;
      padding: 0 5px;
    }

    box-shadow: 0 2px 5px 1px rgba(1, 1, 1, 0.5);
  }
`;
const Header = styled.header`
  h1 {
    margin-bottom: 2rem;
  }
  p {
    color: ${(props) => props.colors.darkBlue};
    font-style: italic;
  }
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${(props) => props.colors.darkBlue};
`;
const SubHeader = styled.div`
  display: flex;
  gap: 2rem;
  padding: 20px;
  justify-content: space-around;
  & > div {
    max-width: 350px;
  }
`;
const TextContent = styled.div`
  background-color: ${(props) => props.colors.lightGrey};
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 10px;
`;
export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    header: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const pageSlug = pageContext.query.slug;

  const query = gql`
    query ($pageSlug: String!) {
      selfArticle(where: { title: $pageSlug }) {
        title
        content {
          raw
        }
        description
        coverImage {
          url
        }
        date
        sources
        catagory {
          title
          coverImage {
            url
          }
        }
      }
    }
  `;
  const variables = {
    pageSlug,
  };
  const data = await graphQLClient.request(query, variables);
  const article = data.selfArticle;

  return {
    props: {
      article,
    },
  };
};

const slug = ({ article }) => {
  return (
    <Article>
      <Header colors={COLORS}>
        <h1>{article.title}</h1>
        <p>Published {new Date(article.date).toDateString()}</p>
        <p>Written By Matthew Pierce</p>
      </Header>
      <SubHeader>
        <div className="flex-one description">
          <p className="lg-bold">{article.description} </p>
        </div>
        <div className="flex-one">
          <img src={article.coverImage.url} />
        </div>
      </SubHeader>
      <TextContent colors={COLORS}></TextContent>
    </Article>
  );
};

export default slug;
