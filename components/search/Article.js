import styled from "styled-components";
import Link from "next/link";
const ArticleCont = styled.div`
  box-shadow: 0 2px 5px 1px rgba(1, 1, 1, 0.5);
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 200px;
  cursor: pointer;
  transition: box-shadow 0.5s ease, border 0.5s ease, transform 0.5s ease;
  border: 1px solid transparent;
  &:hover {
    box-shadow: none;
    border: 1px solid black;
    transform: scale(0.95);
  }
  .image-cont {
    height: 100px;
  }
  img {
    width: 100%;
  }
`;
const TextContent = styled.div`
  background-color: #fefafa;
  display: flex;
  align-items: center;
  overflow: hidden;
  h4 {
    font-size: 1.2rem;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    width: 90%;
    text-align: center;
    margin: 0 auto;
  }
`;
const Article = (props) => {
  return (
    <Link href={`/article/${props.article.title}`} passHref>
      <a rel="noopener noreferrer">
        <ArticleCont>
          <div className="flex-one image-cont">
            <img alt="cover image" src={props.article.coverImage.url} />
          </div>

          <TextContent className="flex-one">
            <h4>{props.article.title}</h4>
          </TextContent>
        </ArticleCont>
      </a>
    </Link>
  );
};

export default Article;
