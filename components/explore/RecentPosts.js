import styled from "styled-components";
import { getRecentArticles } from "../../pages/services";
import COLORS from "../../Data/colors";
import Icon from "./Icon";
import { useEffect } from "react";

const Container = styled.div``;

export default function RecentPosts({ articles }) {
  console.log(articles);
  return (
    <Container colors={COLORS}>
      <div className="title">
        <h2>Recent Posts</h2>
      </div>
    </Container>
  );
