import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import AlphaPost from "./AlphaPost";

const Cont = styled.div`
  padding: 32px;
  margin-right: 32px;
  margin-left: 32px;
  border-left: 2px solid ${(props) => props.colors.darkBlue};
  border-right: 2px solid ${(props) => props.colors.darkBlue};
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  grid-column-gap: 12px;
  grid-row-gap: 32px;
  @media only screen and (max-width: 800px) {
    padding: 16px;
    margin-right: 16px;
    margin-left: 16px;
  }
  @media only screen and (max-width: 400px) {
    padding: 8px;
    margin-right: 8px;
    margin-left: 8px;
  }
  @media only screen and (max-width: 300px) {
    grid-template-columns: 1fr;
    margin: 0;
    border: none;
  }
`;
const PostHolder = ({ posts, selectedTags }) => {
  const alphaPosts = posts.map((post, index) => {
    return (
      <AlphaPost
        key={index}
        title={post.title}
        posts={post.post}
        selectedTags={selectedTags}
      />
    );
  });
  return <Cont colors={COLORS}>{alphaPosts}</Cont>;
};

export default PostHolder;
