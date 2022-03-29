import styled from "styled-components";
import Link from "next/link";
const IconElem = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  background-image: url(${(props) => props.url});
  background-size: 100% 100%;
  width: 100%;
  position: relative;
  cursor: pointer;

  transition: box-shadow 0.5s ease;

  &:hover {
    box-shadow: none;
  }
  &:active {
    border: 1px solid black;
  }
  img {
    width: 100%;
  }
`;

const IconTitle = styled.h4`
  background-color: ${(props) => props.colors.ultraLightBlue};
  text-align: center;
  bottom: 0;
  position: absolute;
  width: 100%;
  border-radius: 0 0 0.5rem 0.5rem;
`;

const Icon = (props) => {
  return (
    <Link href={`/article/${props.article.title}`}>
      <IconElem url={props.article.coverImage.url}>
        <IconTitle colors={props.colors}>{props.article.briefTitle}</IconTitle>{" "}
      </IconElem>
    </Link>
  );
};

export default Icon;
