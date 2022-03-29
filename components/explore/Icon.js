import styled from "styled-components";
import Link from "next/link";
const IconElem = styled.div`
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  background-image: url(${(props) => props.url});
  background-size: 100% 100%;
  width: 100%;
  position: relative;

  img {
    width: 100%;
  }
`;

const IconTitle = styled.p`
  font-weight: 600;
`;

const Icon = (props) => {
  return (
    <IconElem url={props.article.coverImage.url}>
      <p>hello</p>
    </IconElem>
  );
};

export default Icon;
