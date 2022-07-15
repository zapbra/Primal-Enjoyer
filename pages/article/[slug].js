import { gql, GraphQLClient } from "graphql-request";
import styled from "styled-components";
import GetRelatedArticles from "../../Functions/index";
import Audio from "../../components/audio/Audio";
import Return from "../../components/Buttons/Return";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { NextSeo } from "next-seo";
import { TagIcon, ArrowNarrowRightIcon } from "@heroicons/react/solid";
import COLORS, { tagColors } from "../../Data/colors";
import { nanoid } from "nanoid";
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
  padding: 2rem;
  grid-template-areas: "tags audio audio related";
  grid-gap: 2rem;
  margin-bottom: 3rem;
  @media only screen and (max-width: 539px) {
    grid-template-areas:
      "tags"
      "related"
      "audio";
  }
  .audio-cont {
    grid-area: audio;
  }
`;

const Tags = styled.div`
  grid-area: tags;
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
    padding: 8px;
    h3 {
      flex: 1;
    }
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
  grid-area: related;
  border-radius: 1rem;
  box-shadow: 0px 5px 25px 3px rgba(0, 0, 0, 0.8);
  border: 1px solid ${(props) => props.colors.darkBlue};
  margin: auto 0 auto auto;
  .related-title {
    border-radius: 1rem 1rem 0 0;
    padding: 8px;
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
    p {
      font-weight: 500;
    }

    &:nth-of-type(4) {
      border-radius: 0 0 1rem 1rem;
    }
    transition: background-color, 0.25s ease;
    &:hover {
      cursor: pointer;
      background-color: ${(props) => props.colors.darkBlue};
      p {
        color: white;
      }
      .icon-blue {
        color: white;
        flex: 1;
      }
    }
  }
`;

const CoverImage = styled.div`
  margin-bottom: 3rem;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

const TextContent = styled.div`
  padding: 1rem;
  max-width: 1000px;

  margin: auto;
  p {
    line-height: 2;
    font-size: 18px;
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
    images: [
      {
        url: article.coverImage.url,
        width: 800,
        height: 600,
        alt: "Article Logo",
        type: "image/png",
      },
    ],
    openGraph: {
      images: [
        {
          url: article.coverImage.url,
          width: 800,
          height: 600,
          alt: "Article Logo",
        },
      ],
    },
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
      <Link key={nanoid()} href={`/article/${article.title}`}>
        <div className="related-line">
          <p>{article.title}</p>
          <ArrowNarrowRightIcon className="icon-blue" />
        </div>
      </Link>
    );
  });
  return (
    <>
      <NextSeo {...SEO} />
      <Return text="Search" link="" />
      <div className="container">
        <h1 className="align-center">{article.title}</h1>
        <Grid>
          <Tags colors={COLORS}>
            <div className="tag-title">
              <h3>Tags</h3>
              <TagIcon className="icon-blue" />
            </div>
            <div className="tag-list">{tagElems}</div>
          </Tags>
          <div className="audio-cont">
            <Audio file={article.audio.url} />
          </div>

          <Related colors={COLORS}>
            <div className="related-title">
              <h3>Related</h3>
            </div>
            <div className="related-list">{relatedElems}</div>
          </Related>
        </Grid>
        <CoverImage>
          <img src={article.coverImage.url} alt="article logo" />
        </CoverImage>
        <TextContent>
          <RichText
            content={article.content.raw}
            renderers={{
              bold: ({ children }) => <strong>{children}</strong>,
            }}
          ></RichText>
        </TextContent>
      </div>
    </>
  );
};

export default slug;
