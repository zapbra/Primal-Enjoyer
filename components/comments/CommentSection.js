import Link from "next/link";
import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faPaperPlane,
  faExclamation,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import COLORS from "../../data/colors";
import Comments from "./Comments";
import ReportForm from "../banners/ReportForm";
import {
  createArticleComment,
  fetchCommentsByArticleId,
  deleteCommentById,
  editArticleCommentById,
  createArticleCommentLike,
  deleteArticleCommentLikes,
  createArticleCommentReply,
  deleteArticleCommentReply,
  deleteArticleCommentReplyLikes,
  deleteArticleCommentReplies,
  deleteNotificationsByCommentId,
  editArticleCommentReplyById,
  createReplyReply,
} from "../../utils/supabaseFunction";

const Cont = styled.div`
  position: relative;
  @media only screen and (max-width: 500px) {
    padding: 32px 8px 64px 8px;
  }
  .title-cont {
    @media only screen and (max-width: 500px) {
      flex-direction: column;
      h2 {
        margin-right: 0;
        margin-bottom: 16px;
      }
    }
  }
  .comment-input {
    border-radius: 32px;
    border: 1px solid transparent;

    &:focus {
      outline: none;
      width: 100%;
      max-width: 600px;

      background: #fff;
    }
  }
  @keyframes changeHeight {
    from {
      left: -100%;
    }
    to {
      left: 50%;
    }
  }

  .accordion-animation {
    animation-name: changeHeight;
    animation-duration: 4s;
    left: 50%;
    transform: translateX(-50%);
  }
  .comment-box {
    padding: 8px 16px;
    border-radius: 32px;
    border: 1px solid ${(props) => props.colors.darkBlue};
    background-color: ${(props) => props.colors.ultraLightBlue};
    display: inline-flex;
    h4 {
      margin-left: 8px;
    }
  }
  .show-icon-cont {
    z-index: 5;
    width: 38.69px;
    height: 38.69px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    border: 1px solid transparent;
    &:hover {
      background-color: #fff;
      border: 1px solid ${(props) => props.colors.darkBlue};
      .show-icon {
        color: ${(props) => props.colors.darkBlue};
      }
    }
    &:active {
      background-color: ${(props) => props.colors.ultraLightBlue};
    }
  }
  .show-icon {
    &:hover {
    }
  }
  textarea {
    resize: none;
    background: ${(props) => props.colors.ultraLightBlue};
    font-size: 16px;
    padding: 8px;
    height: 100%;
    overflow: hidden;
  }
  .main-comment-form {
    border: 1px solid ${(props) => props.colors.darkGrey};
    border-radius: 32px;
    display: flex;
    align-items: center;
    padding-right: 10px;
    margin-bottom: 80px;
    background: ${(props) => props.colors.ultraLightBlue};
    &:focus-within {
      border: 1px solid ${(props) => props.colors.darkBlue};
      background: #fff;
    }
  }
`;

const CommentSection = ({ session, article_id, comments, reFetchComments }) => {
  const inputRef = useRef();
  const [inputHeight, setInputHeight] = useState(0);
  const [comment, setComment] = useState("");
  const [iconVisible, setIconVisible] = useState(false);
  const [reportActive, setReportActive] = useState(false);
  const updateComment = (e) => {
    setComment(e.target.value);
    const scrollHeight = inputRef.current.scrollHeight;
    setInputHeight(scrollHeight);
  };

  useEffect(() => {
    const scrollHeight = inputRef?.current?.scrollHeight || 0;
    setInputHeight(scrollHeight);
  }, [session]);

  const addComment = () => {
    if (comment !== "") {
      createArticleComment(comment, session.user.id, article_id).then((res) =>
        reFetchComments().then((res) => resetFocus())
      );

      setComment("");

      toast.success("Comment added");
    } else {
      toast.error("Comment can't be empty");
      setComment("");
      inputRef.current.blur();
      setInputHeight(38);
    }
  };

  const editComment = async (id, content) => {
    return editArticleCommentById(id, content).then((res) => reFetchComments());
  };

  const deleteComment = (id, user_id) => {
    deleteArticleCommentLikes(id).then((res) =>
      deleteNotificationsByCommentId(id).then((res) =>
        deleteArticleCommentReplies(id).then((res) =>
          deleteCommentById(id, user_id).then((res) => reFetchComments())
        )
      )
    );
  };

  const createCommentReply = (content, comment_id) => {
    createArticleCommentReply(content, comment_id, session?.user?.id).then(
      (res) => reFetchComments()
    );
    toast.success("Reply added");
  };

  const deleteCommentReply = (reply_id, comment_id) => {
    deleteArticleCommentReplyLikes(reply_id).then((res) =>
      deleteArticleCommentReply(reply_id, comment_id, session?.user.id).then(
        (res) => reFetchComments()
      )
    );
  };
  const editCommentReply = (id, content) => {
    editArticleCommentReplyById(id, content).then((res) => reFetchComments());
  };
  const resetFocus = () => {
    inputRef.current.blur();
    setInputHeight(38);
  };
  const checkSubmitForm = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      addComment();
    }
  };
  const focusIcon = () => {
    setIconVisible(true);
  };
  const defocusIcon = () => {
    setIconVisible(false);
  };

  const hideReport = () => {
    setReportActive(false);
  };

  const createReplyReplyFunctional = (content, reply_id) => {
    createReplyReply(content, reply_id, session?.user?.id).then(
      (res) => res && reFetchComments()
    );
  };

  return (
    <Cont colors={COLORS} className="container ">
      <div className="ssm-spacer title-cont flex justify-center align-center">
        <h2 className="text-shadow mar-right-16">Comments</h2>
        <div className="comment-box">
          <FontAwesomeIcon icon={faComment} className="icon-med icon-blue" />
          <h4>{comments.length}</h4>
        </div>
      </div>
      {session ? (
        <form className="main-comment-form" onSubmit={addComment}>
          <textarea
            type="text"
            ref={inputRef}
            value={comment}
            className="comment-input"
            placeholder="Write a comment..."
            onChange={updateComment}
            style={{ height: `${inputHeight}px` }}
            onKeyPress={checkSubmitForm}
            onFocus={focusIcon}
            onBlur={defocusIcon}
          />

          <div onClick={addComment} className="show-icon-cont cursor">
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={{ opacity: iconVisible ? "1" : "0" }}
              className="show-icon icon-blue icon-ssm"
            />
          </div>
        </form>
      ) : (
        <div className="flex justify-center mar-bottom-one">
          <p className="mar-right-4">Please </p>
          <Link target="_blank" passHref href="/login">
            <p className="link-blue mar-right-4">Log in</p>
          </Link>
          <p className="mar-right-4">or</p>
          <Link target="_blank" href="/signup">
            <p className="link-blue mar-right-4">Sign up</p>
          </Link>
          <p> to comment</p>
        </div>
      )}
      <Comments
        comments={comments}
        user_id={session?.user?.id}
        editComment={editComment}
        deleteComment={deleteComment}
        createCommentReply={createCommentReply}
        deleteCommentReply={deleteCommentReply}
        editCommentReply={editCommentReply}
        createReplyReplyFunctional={createReplyReplyFunctional}
        article_id={article_id}
      />

      {reportActive && (
        <>
          <div className="popup-screen"></div>
          <ReportForm hideReport={hideReport} />{" "}
        </>
      )}
      <div
        onClick={() => setReportActive(true)}
        className="report-bottom-right flex  cursor"
      >
        <FontAwesomeIcon
          icon={faExclamation}
          className="icon-ssm red mar-right-4"
        />
        <p className="red underline-hover">report issue</p>
      </div>
    </Cont>
  );
};

export default CommentSection;
