import { gql, GraphQLClient } from "graphql-request";
import styled from "styled-components";
import { RichText } from "@graphcms/rich-text-react-renderer";
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

  padding: 5% 5%;
  & div {
    flex: 1;
  }
  display: flex;
  img {
    width: 100%;
  }
`;
const TextContent = styled.div`
  background-color: ${(props) => props.colors.lightGrey};
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 10px;
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
  return (
    <Article colors={COLORS}>
      <Header colors={COLORS}>
        <h1>{article.title}</h1>
        <p>Published {article.date}</p>
      </Header>
      <SubHeader>
        <div className="article-description">
          <div className="block"></div>
          <p className="semi-lg-bold">{article.description} </p>
          <div className="block"></div>
        </div>
        <div>
          <img src={article.coverImage.url} />
        </div>
      </SubHeader>
      <TextContent colors={COLORS}>
        <RichText content={article.content.raw} />
      </TextContent>
    </Article>
  );
};

export default slug;
