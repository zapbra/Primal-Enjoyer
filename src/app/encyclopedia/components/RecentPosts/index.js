import styled from "styled-components";
import COLORS from "../../../../../data/colors";
import Post from "./Post";

const Cont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
`;

const Index = ({ posts }) => {
  const postElems = posts.map((post, index) => {
    return (
      <Post
        key={index}
        title={post.title}
        created_at={post.created_at}
        introduction={post.introduction}
        postLikes={post.postLikes.length}
        url={post.post_url}
        username={post.user_id.username}
      />
    );
  });
  return <Cont colors={COLORS}>{postElems}</Cont>;
};

export default Index;
