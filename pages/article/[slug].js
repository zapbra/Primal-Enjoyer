import { gql, GraphQLClient } from "graphql-request";
import styled from "styled-components";
import MarkDown from 'markdown-to-jsx';
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
  display: flex;
`;
const TextContent = styled.div`
  background-color: ${(props) => props.colors.lightGrey};
  border: 1px solid black;
  border-radius: .5rem; 
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
      article(where: { slug: $pageSlug }) {
        id
        title
        author
        content {
          raw
          markdown
        }
        date
        catagory
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
  const article = data.article;

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
        <p>Published {article.date}</p>
        <p>Written By {article.author}</p>
      </Header>
      <SubHeader>
        <div>
          <p>{article.description} </p>
        </div>
        <div>
          <img src={article.coverImage.url} />
        </div>
      </SubHeader>
      <TextContent colors={COLORS}>
        <MarkDown>{article.content.markdown}</MarkDown>
        
        </TextContent>
    </Article>
  );
};

export default slug;
