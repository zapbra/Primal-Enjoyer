import styled from "styled-components";
import Post from "./Post";
import DraftPost from "./DraftPost";
import { useState } from "react";
import COLORS from "../../data/colors";
const Cont = styled.div`
  padding: 0;
  max-height: 331px;
  position: relative;
  display: inline-block;
  overflow: auto;
  width: 100%;
  overflow-x: hidden;
  .post-class {
    &:nth-of-type(1) {
      border-radius: 8px 8px 0 0;
    }
    &:last-of-type {
      border-radius: 0 0 8px 8px;
      border: none;
    }
  }
  .title-spec {
    display: flex;
    justify-content: space-between;
    position: sticky;
    top: 0;
  }
  .inner-title {
    padding: 8px;
    cursor: pointer;
    flex: 1;
    transition: background-color 0.25s ease;
    background-color: #fff;
  }
  .selected {
    background-color: ${(props) => props.colors.darkBlue};
    h5 {
      color: #fff;
    }
  }
`;

const Posts = ({ posts }) => {
  const [posted, setPosted] = useState(true);
  const postElems = posts.map((post, index) => {
    return (
      post.published && (
        <Post
          key={index}
          title={post.title}
          likes={post.postLikes.length}
          comments={post.comments.length}
        />
      )
    );
  });
  const draftElems = posts.map((post, index) => {
    return (
      !post.published && (
        <DraftPost id={post.id} key={index} title={post.title} />
      )
    );
  });
  return (
    <Cont colors={COLORS} className="box-light">
      <div className="title-spec">
        <div
          onClick={() => setPosted(true)}
          className={posted ? "inner-title selected" : "inner-title"}
        >
          <h5>Posted</h5>
        </div>
        <div
          onClick={() => setPosted(false)}
          className={!posted ? "inner-title selected" : "inner-title"}
        >
          <h5>Drafts</h5>
        </div>
      </div>
      <div className="posts-cont">{posted ? postElems : draftElems}</div>
    </Cont>
  );
};

export default Posts;
