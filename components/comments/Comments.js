import styled from "styled-components";
import Comment from "./Comment";

const Cont = styled.div``;

const Comments = ({
  comments,
  user_id,
  deleteComment,
  editComment,
  createCommentReply,
  deleteCommentReply,
  editCommentReply,
  createReplyReplyFunctional,
  article_id,
}) => {
  const commentElems = comments.map((comment, index) => {
    return (
      <Comment
        key={index}
        article_id={article_id}
        content={comment.content}
        created_at={comment.created_at}
        username={comment.users.username}
        url={comment.users.avatar_url}
        id={comment.id}
        comment_user_id={comment.user_id}
        likes={comment.commentLikes}
        user_id={user_id}
        commentReplies={comment.comments}
        deleteComment={deleteComment}
        editComment={editComment}
        createCommentReply={createCommentReply}
        deleteCommentReply={deleteCommentReply}
        editCommentReply={editCommentReply}
        createReplyReplyFunctional={createReplyReplyFunctional}
      />
    );
  });
  return <Cont>{commentElems} </Cont>;
};

export default Comments;
