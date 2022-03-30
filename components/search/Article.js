import styled from "styled-components";

const ArticleCont = styled.div`
  box-shadow: 0 2px 5px 1px rgba(1, 1, 1, 0.5);
  display: flex;
  flex-direction: column;
  width: 200px;
  height: 200px;
  margin-bottom: 1rem;
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

  h2 {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    width: 90%;
    text-align: center;
    margin: 0 auto;
  }
`;
const Article = (props) => {
  return (
    <ArticleCont>
      <div className="flex-one image-cont">
        <img src={props.article.coverImage.url} />
      </div>

      <TextContent className="flex-one">
        <h2>{props.article.title}</h2>
      </TextContent>
    </ArticleCont>
  );
};

export default Article;
