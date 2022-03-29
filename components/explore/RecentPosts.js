import styled from "styled-components";
import { getRecentArticles } from "../../pages/services";
import COLORS from "../../Data/colors";
import Icon from "./Icon";
import { nanoid } from "nanoid";
import { useEffect } from "react";

const Container = styled.div``;

const IconContainer = styled.div`
  display: grid;
  width: 100%;
  grid-auto-rows: 50px;
  gap: 1rem;
  grid-template-columns: 1fr 1fr;
`;

export default function RecentPosts({ articles }) {
  console.log(articles);
  const icons = articles.map((article) => {
    return <Icon key={nanoid()} article={article} />;
  });

  return (
    <Container colors={COLORS}>
      <div className="title">
        <h2>Recent Posts</h2>
        <IconContainer>{icons}</IconContainer>
      </div>
    </Container>
  );
}
