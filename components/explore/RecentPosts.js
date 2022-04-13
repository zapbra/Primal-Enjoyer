import styled from "styled-components";
import COLORS from "../../Data/colors";
import Icon from "./Icon";
import { nanoid } from "nanoid";
import { useEffect } from "react";
const Superdiv = styled.div``;
const Container = styled.div``;

const IconContainer = styled.div`
  display: grid;
  width: 100%;
  grid-auto-rows: 50px;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
  @media only screen and (max-width: 1199px) {
    grid-auto-rows: 60px;
  }
`;

export default function RecentPosts({ articles }) {
  console.log(articles);
  const icons = articles.map((article) => {
    return <Icon key={nanoid()} article={article} colors={COLORS} />;
  });

  return (
    <Container colors={COLORS}>
      <div className="title">
        <h2>Recent Posts</h2>
      </div>
      <IconContainer>{icons}</IconContainer>
    </Container>
  );
}
