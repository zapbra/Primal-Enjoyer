import { gql, GraphQLClient } from "graphql-request";
import styled from "styled-components";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { NextSeo } from "next-seo";
import COLORS from "../../Data/colors";
const Article = styled.div`
  background-color: #fff;
  border: 1px solid black;
  box-shadow: 5px 5px 5px 5px rgba(1, 1, 1, 0.5);
  border-radius: 1rem;
  padding: 10px;
  h1 {
    text-align: center;
  }
  .block {
    width: 100%;
    height: 2rem;
    background-color: ${(props) => props.colors.ultraLightBlue};
  }
  .article-description {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      padding: 10px;
      border-top: 2px solid black;
      border-bottom: 2px solid black;
    }
  }
`;
const CenterText = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding-right: 2%;
  text-align: center;
`;
const TextBox = styled.div`
  position: absolute;
  width: 96%;
  top: 50%;
  transform: translateY(-50%);
  height: 50%;
  background-color: ${(props) => props.colors.lightGrey};
  opacity: 70%;
  @media only screen and (max-width: 550px) {
    height: 80%;
  }
`;
const Header = styled.header`
  p {
    color: ${(props) => props.colors.darkBlue};
    font-style: italic;
  }
  padding-bottom: 0.5rem;
  border-bottom: 2px solid ${(props) => props.colors.darkBlue};
`;
const SubHeader = styled.div`
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  margin-bottom: 2rem;
  margin-top: 2rem;
  padding: 2% 2%;
  position: relative;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
  .article-header {
    height: 250px;
  }
`;
const TextContent = styled.div`
  background-color: ${(props) => props.colors.lightGrey};
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 10px;
  ul {
    padding-left: 1rem;
  }
  li {
    margin-bottom: 1rem;
  }
  img {
    width: 100%;
    height: auto;
  }
  p {
    margin-bottom: 1rem;
  }
  h1,
  h2,
  h3,
  h4,
  h5 {
    margin-bottom: 1rem;
  }
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
        date
        catagory {
          title
        }
        coverImage {
          url
        }
        description
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
  const SEO = {
    title: article.title,
    description: article.description,
  };
  return (
    <>
      <NextSeo {...SEO} />
      <Article colors={COLORS}>
        <Header colors={COLORS}>
          <h1>{article.title}</h1>
          <p>Published {article.date}</p>
        </Header>
        <SubHeader>
          <div className="article-header">
            <img src={article.coverImage.url} />
            <TextBox colors={COLORS} />
            <CenterText>
              <h2>{article.description}</h2>
            </CenterText>
          </div>
        </SubHeader>
        <TextContent colors={COLORS}>
          <RichText content={article.content.raw} />
        </TextContent>
      </Article>
    </>
  );
};

export default slug;
