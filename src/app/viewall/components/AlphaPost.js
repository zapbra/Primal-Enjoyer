import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import Post from "./Post";

const Cont = styled.div`
  max-height: 240px;
  overflow: auto;
  position: relative;
  .title-spec {
    border-bottom: 2px solid ${(props) => props.colors.darkBlue};
    display: flex;
    align-items: center;
    padding-bottom: 4px;

    position: sticky;
    background: #fff;
    top: 0;
  }
  ::-webkit-scrollbar {
    width: 0.5rem;
    background: #d8dde3;
  }
  .post-cont {
    padding-left: 4px;
    border-right: 2px solid ${(props) => props.colors.darkBlue};
  }
`;
const AlphaPost = ({ title, posts, selectedTags }) => {
  const postElems = posts.map((post, index) => {
    return <Post key={index} title={post.title} created_at={post.created_at} />;
  });

  return (
    <Cont colors={COLORS}>
      <div className="title-spec ">
        <h5 className="mar-right-4">{title.toUpperCase()}</h5>
        <p className="small blue">({postElems.length})</p>
      </div>
      <div className="post-cont">{postElems}</div>
    </Cont>
  );
};

export default AlphaPost;
