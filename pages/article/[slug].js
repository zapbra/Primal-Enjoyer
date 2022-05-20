import { gql, GraphQLClient } from "graphql-request";
import styled from "styled-components";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { NextSeo } from "next-seo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTags, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import COLORS, { tagColors } from "../../Data/colors";
import { nanoid } from "nanoid";
import GetRelatedArticles from "../../Functions/index";
import Link from "next/link";
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
      article(where: { title: $pageSlug }) {
        title
        coverImage {
          url
        }
        audio {
          url
        }
        tags(first: 10) {
          text
        }
        content {
          raw
        }
      }
      articles {
        title
        coverImage {
          url
        }
        audio {
          url
        }
        tags(first: 10) {
          text
        }
        content {
          raw
        }
      }
    }
  `;
  const variables = {
    pageSlug,
  };
  const data = await graphQLClient.request(query, variables);
  const article = data.article;
  const articles = data.articles;

  return {
    props: {
      article,
      articles,
    },
  };
};

const Grid = styled.div`
  display: grid;
  grid-template-areas: "tags audio audio related";
`;

const Tags = styled.div`
  box-shadow: 0px 5px 25px 3px rgba(0, 0, 0, 0.8);
  border-radius: 1rem;
  border: 1px solid ${(props) => props.colors.darkBlue};
  background: ${(props) => props.colors.grey};
  .tag-title {
    border-radius: 1rem 1rem 0 0;
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    background: #fff;
  }
  .tag-list {
    padding: 1rem;
    background: ${(props) => props.colors.grey};
    display: flex;
    align-items: center;
    border-radius: 0 0 1rem 1rem;
    flex-direction: column;
    gap: 0.5rem;
  }
`;
const Tag = styled.div`
  padding: 0.5rem 1rem;
  display: inline-block;
  background: ${(props) => props.color};
  border: 1px solid ${(props) => props.colors.darkBlue};
  border-radius: 1rem;
`;

const Related = styled.div`
  border-radius: 1rem;
  box-shadow: 0px 5px 25px 3px rgba(0, 0, 0, 0.8);
  border: 1px solid ${(props) => props.colors.darkBlue};
  .related-title {
    border-radius: 1rem 1rem 0 0;
    text-align: center;
    background-color: #fff;
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
  }
  .related-list {
    background: ${(props) => props.colors.grey};
    border-radius: 0 0 1rem 1rem;
  }
  .related-article {
  }
  .related-line {
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
    padding: 1rem 0.5rem;
    display: flex;
    justify-content: space-between;
    width: 200px;
    &:nth-of-type(4) {
      border-radius: 0 0 1rem 1rem;
    }
  }
`;

const slug = ({ article, articles }) => {
  const relatedArticles = GetRelatedArticles(articles, article.tags);

  function generateColor() {
    return tagColors[Math.floor(Math.random() * tagColors.length)];
  }
  const SEO = {
    title: article.title,
    description: article.description,
  };

  const tagElems = article.tags.map((tag) => {
    return (
      <Tag key={nanoid()} colors={COLORS} color={generateColor()}>
        <p>{tag.text}</p>
      </Tag>
    );
  });
  const relatedElems = relatedArticles.map((article) => {
    return (
      <Link href={`/article/${article.title}`}>
        <div className="related-line">
          <p>{article.title}</p>
          <FontAwesomeIcon icon={faArrowRight} size="lg"></FontAwesomeIcon>
        </div>
      </Link>
    );
  });
  return (
    <>
      {/*<NextSeo {...SEO} />*/}
      <div className="container">
        <h2>{article.title}</h2>
        <Grid>
          <Tags colors={COLORS}>
            <div className="tag-title">
              <h3>Tags</h3>
              <FontAwesomeIcon icon={faTags} size="2xl"></FontAwesomeIcon>
            </div>
            <div className="tag-list">{tagElems}</div>
          </Tags>
          <Related colors={COLORS}>
            <div className="related-title">
              <h3>Related</h3>
            </div>
            <div className="related-list">{relatedElems}</div>
          </Related>
        </Grid>
      </div>
    </>
  );
};

export default slug;
