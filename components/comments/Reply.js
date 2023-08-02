import styled from "styled-components";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import COLORS from "../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPaperPlane,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { fetchDaysDiff } from "../../utils/Functions";
import {
  createArticleCommentReplyLike,
  deleteArticleCommentReplyLike,
  deleteCommentReplyNotification,
  editArticleCommentReplyById,
  deleteCommentLikeNotification,
  createCommentLikeNotification,
  createCommentReplyNotification,
} from "../../utils/supabaseFunction";

const Cont = styled.div`
  .profile-pic-container {
    width: 40px !important;
    height: 40px !important;

    @media only screen and (max-width: 430px) {
      width: 24px !important;
      height: 24px !important;
    }
  }
  @keyframes changeText {
    from {
      color: #dc143c;
    }
    to {
      color: #000;
    }
  }
  textarea {
    animation-name: changeText;
    animation-duration: 2s;
  }
`;

const Reply = ({
  id,
  comment_id,
  content,
  created_at,
  user_id,
  username,
  url,
  reply_user_id,
  likes,
  comment_user_id,
  deleteCommentReply,
  editCommentReply,
  createReplyReplyFunctional,
  article_id,
}) => {
  const popupRef = useRef();
  const inputRef = useRef(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [origPoster, setOrigPoster] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const [liked, setLiked] = useState(false);
  const [likesLength, setLikesLength] = useState(likes?.length);
  const [inputHeight, setInputHeight] = useState(38);
  const [replying, setReplying] = useState(false);
  useEffect(() => {
    setOrigPoster(user_id === reply_user_id);
    setLiked((prev) => {
      return likes?.some((like) => like.user_id === user_id);
    });
  }, [user_id]);

  const createArticleReplyLikeFunctional = () => {
    createArticleCommentReplyLike(id, user_id);
    setLikesLength(likesLength + 1);
    setLiked(true);

    createCommentLikeNotification(
      reply_user_id,
      user_id,
      id,
      window.location.pathname,
      article_id
    );
  };

  const deleteArticleReplyLikeFunctional = () => {
    deleteArticleCommentReplyLike(user_id, id);
    setLikesLength(likesLength - 1);
    setLiked(false);
    deleteCommentLikeNotification(reply_user_id, id);
  };

  const updateComment = (e) => {
    setEditValue(e.target.value);
    const scrollHeight = inputRef.current.scrollHeight;
    setInputHeight(scrollHeight);
  };

  const deleteCommentReplyFunctional = () => {
    deleteCommentReply(id, comment_id);
    deleteCommentReplyNotification(user_id, reply_user_id, comment_id);
  };

  const createReplyFunc = () => {
    createReplyReplyFunctional(reply, comment_id);
    createCommentReplyNotification(
      reply_user_id,
      user_id,
      comment_id,
      window.location.pathname
    );
    cancelReply();
  };

  const editCommentReplyFunctional = () => {
    editCommentReply(id, editValue);
    setEditing(false);
  };
  const hideEditor = () => {
    setEditing(false);
    setEditValue(content);
  };
  // reply input field
  const [reply, setReply] = useState(`@${username} `);
  const inputRef2 = useRef(null);
  const [inputHeight2, setInputHeight2] = useState(38);
  const [iconVisible, setIconVisible] = useState(false);
  const updateReply = (e) => {
    setReply(e.target.value);
    setInputHeight2(inputRef2.current.scrollHeight);
  };

  const checkSubmitReply = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      //addComment();
    }
  };

  const focusIcon = () => {
    setIconVisible(true);
  };
  const defocusIcon = () => {
    setIconVisible(false);
  };

  useEffect(() => {
    inputRef2?.current?.setSelectionRange(
      inputRef2?.current?.value.length,
      inputRef2?.current?.value.length
    );
  }, [iconVisible]);
  const cancelReply = () => {
    setReplying(false);
    setReply(`@${username} `);
  };

  return (
    <Cont colors={COLORS}>
      <div className="content-holder mar-bottom-8">
        <div
          style={{
            border: user_id === reply_user_id ? "2px solid #50c878" : "",
          }}
          className="profile-pic-container mar-right-8"
        >
          <Image
            src={`${process.env.NEXT_PUBLIC_AVATAR_BASE_URL}${url}`}
            layout="fill"
            size="100%"
            objectFit="cover"
          />
        </div>

        <div className="comment">
          {popupVisible && (
            <div onMouseLeave={() => setPopupVisible(false)} className="popup">
              <div onClick={() => setEditing(true)} className="popup-field">
                <p className="bold">Edit</p>
              </div>
              <div
                onClick={() => deleteCommentReplyFunctional()}
                className="popup-field"
              >
                <p className="bold">Delete</p>
              </div>
            </div>
          )}
          <div className="flex-center comment-line">
            <div className="comment-content">
              <p className={origPoster ? "dark-blue bold" : "bold"}>
                {username}
              </p>
              {!editing ? (
                <p>{content}</p>
              ) : (
                <textarea
                  className="comment-input"
                  type="text"
                  value={editValue}
                  ref={inputRef}
                  style={{ height: `${inputHeight}px` }}
                  onChange={updateComment}
                />
              )}
            </div>
            {user_id === reply_user_id && (
              <div
                aria-label="Edit or delete"
                className="mar-left-4 cursor more-icon"
                ref={popupRef}
                onMouseEnter={() => setPopupVisible(true)}
                onClick={() => setPopupVisible(!popupVisible)}
              >
                <FontAwesomeIcon icon={faEllipsis} className="icon-ssm" />
              </div>
            )}
          </div>
          {editing && (
            <div className="flex-inline mar-left-12">
              <p
                onClick={hideEditor}
                className="mar-right-16 blue cursor underline-hover"
              >
                cancel
              </p>
              <p
                onClick={editCommentReplyFunctional}
                className="blue cursor underline-hover"
              >
                submit
              </p>
            </div>
          )}
          <div className="comment-interaction mar-left-8">
            <p className="grey  com-mar-double ">{fetchDaysDiff(created_at)}</p>
            {user_id && (
              <>
                {liked ? (
                  <p
                    onClick={() => deleteArticleReplyLikeFunctional()}
                    className="bold  com-mar interaction cursor"
                  >
                    UNLIKE
                  </p>
                ) : (
                  <p
                    onClick={() => createArticleReplyLikeFunctional()}
                    className="bold  com-mar interaction cursor"
                  >
                    LIKE
                  </p>
                )}
                <p
                  onClick={() => setReplying(true)}
                  className="bold com-mar-double interaction cursor"
                >
                  REPLY
                </p>
              </>
            )}
            <div className="flex-center">
              <FontAwesomeIcon
                icon={faHeart}
                className={
                  liked
                    ? "mar-right-4 icon-ssm red"
                    : "mar-right-4 icon-ssm light-red"
                }
              />
              <p className="grey">{likesLength > 0 ? likesLength : ""}</p>
            </div>
          </div>
        </div>
      </div>
      {replying && (
        <div className="mar-left-32 mar-bottom-16">
          <form className="main-comment-form" /*onSubmit={addComment} */>
            <textarea
              type="text"
              ref={inputRef2}
              value={reply}
              className="comment-input reply-input"
              placeholder="Write a reply..."
              onChange={updateReply}
              style={{ height: `${inputHeight2}px` }}
              onKeyPress={checkSubmitReply}
              onFocus={focusIcon}
              onBlur={defocusIcon}
              autoFocus={true}
            />
            <div onClick={createReplyFunc} className="show-icon-cont cursor">
              <FontAwesomeIcon
                onClick={createReplyFunc}
                icon={faPaperPlane}
                style={{ display: iconVisible ? "block" : "none" }}
                className="show-icon icon-blue icon-ssm"
              />
            </div>
          </form>
          <div className="flex-inline mar-left-12">
            <p
              onClick={cancelReply}
              className="mar-right-16 blue cursor underline-hover"
            >
              cancel
            </p>
            <p
              onClick={createReplyFunc}
              className="blue cursor underline-hover"
            >
              submit
            </p>
          </div>
        </div>
      )}
    </Cont>
  );
};

export default Reply;
