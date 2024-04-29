import Image from "next/image";
import {useState, useRef, useEffect} from "react";
import {fetchDaysDiff} from "../../utils/Functions";
import {
    createArticleCommentLike,
    deleteArticleCommentLike,
    createCommentLikeNotification,
    deleteCommentLikeNotification,
    createCommentReplyNotification,
} from "../../utils/supabaseFunction";
import Reply from "./Reply";
import toast from "react-hot-toast";


const Comment = ({
                     content,
                     created_at,
                     username,
                     url,
                     id,
                     likes,
                     user_id,
                     commentReplies,
                     comment_user_id,
                     deleteComment,
                     editComment,
                     createCommentReply,
                     deleteCommentReply,
                     editCommentReply,
                     createReplyReplyFunctional,
                     article_id,
                 }) => {
    const popupRef = useRef();
    const [popupVisible, setPopupVisible] = useState(false);
    const [editing, setEditing] = useState(false);
    const [editValue, setEditValue] = useState(content);
    const [replying, setReplying] = useState(false);
    const [reply, setReply] = useState("");
    const [iconVisible, setIconVisible] = useState(false);
    const inputRef = useRef(null);
    const [inputHeight, setInputHeight] = useState(38);
    const inputRef2 = useRef(null);
    const [inputHeight2, setInputHeight2] = useState(38);
    const [origPoster, setOrigPoster] = useState(user_id === comment_user_id);
    const [likesLength, setLikesLength] = useState(likes?.length);
    const [a, b] = useState(likes);
    const [liked, setLiked] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    useEffect(() => {
        setLiked((prev) => {
            return likes?.some((like) => like.user_id === user_id);
        });
        setOrigPoster(user_id === comment_user_id);
    }, [user_id]);

    useEffect(() => {
        inputRef.current !== null && setInputHeight(inputRef.current.scrollHeight);
    }, [inputRef, editing]);
    useEffect(() => {
        inputRef2.current !== null &&
        setInputHeight2(inputRef2.current.scrollHeight);
    }, [inputRef2, replying]);

    const updateComment = (e) => {
        setEditValue(e.target.value);
        setInputHeight(inputRef.current.scrollHeight);
    };

    const updateReply = (e) => {
        setReply(e.target.value);
        setInputHeight2(inputRef2.current.scrollHeight);
    };

    const focusIcon = () => {
        setIconVisible(true);
    };
    const defocusIcon = () => {
        setIconVisible(false);
    };

    const checkSubmitReply = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            createCommentReplyFunctional();
        }
    };

    const editCommentFunctional = () => {
        const updateState = () => {
            setEditing(false);
        };
        editComment(id, editValue).then((res) => updateState());
    };

    const createArticleCommentLikeFunctional = () => {
        createArticleCommentLike(user_id, id);
        setLikesLength(likesLength + 1);
        setLiked(true);
        createCommentLikeNotification(
            comment_user_id,
            user_id,
            id,
            window.location.pathname,
            article_id
        );
    };

    const deleteArticleCommentLikeFunctional = () => {
        deleteArticleCommentLike(user_id, id);
        setLikesLength(likesLength - 1);
        setLiked(false);
        deleteCommentLikeNotification(comment_user_id, id);
    };

    const createCommentReplyFunctional = () => {
        if (reply === "") {
            toast.error("Comment can't be empty");
            setReply("");
            inputRef2.current.blur();
            setInputHeight2(38);
            return;
        }
        createCommentReply(reply, id);
        setReplying(false);
        setReply("");
        createCommentReplyNotification(
            comment_user_id,
            user_id,
            id,
            window.location.pathname
        );
        setShowReplies(true);
    };

    const cancelReply = () => {
        setReplying(false);
        setReply("");
    };
    const replyElems = commentReplies.map((reply, index) => {
        return (
            <Reply
                article_id={article_id}
                key={index}
                id={reply.id}
                comment_id={id}
                content={reply.content}
                created_at={reply.created_at}
                likes={reply.replyLikes}
                user_id={user_id}
                reply_user_id={reply.user_id}
                username={reply.users.username}
                url={reply.users.avatar_url}
                comment_user_id={comment_user_id}
                deleteCommentReply={deleteCommentReply}
                editCommentReply={editCommentReply}
                createReplyReplyFunctional={createReplyReplyFunctional}
            />
        );
    });
    return (
        <div className="mar-bottom-16">
            <div className="content-holder mar-bottom-8">
                <div
                    style={{
                        border: user_id === comment_user_id ? "2px solid #50c878" : "",
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
                                onClick={() => deleteComment(id, user_id)}
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
                                    style={{height: `${inputHeight}px`}}
                                    onChange={updateComment}
                                />
                            )}
                        </div>
                        {user_id === comment_user_id && (
                            <div
                                aria-label="Edit or delete"
                                className="mar-left-4 cursor more-icon"
                                ref={popupRef}
                                onMouseEnter={() => setPopupVisible(true)}
                                onClick={() => setPopupVisible(!popupVisible)}
                            >
                                {/*<FontAwesomeIcon icon={faEllipsis} className="icon-ssm" />*/}
                            </div>
                        )}
                    </div>
                    {editing && (
                        <div className="flex-inline mar-left-12">
                            <p
                                onClick={() => setEditing(false)}
                                className="mar-right-16 blue cursor underline-hover"
                            >
                                cancel
                            </p>
                            <p
                                onClick={editCommentFunctional}
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
                                        onClick={() => deleteArticleCommentLikeFunctional()}
                                        className="bold  com-mar interaction cursor"
                                    >
                                        UNLIKE
                                    </p>
                                ) : (
                                    <p
                                        onClick={() => createArticleCommentLikeFunctional()}
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
                            {/*<FontAwesomeIcon*/}
                            {/*  icon={faHeart}*/}
                            {/*  className={*/}
                            {/*    liked*/}
                            {/*      ? "mar-right-4 icon-ssm red"*/}
                            {/*      : "mar-right-4 icon-ssm light-red"*/}
                            {/*  }*/}
                            {/*/>*/}
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
                style={{height: `${inputHeight2}px`}}
                onKeyPress={checkSubmitReply}
                onFocus={focusIcon}
                onBlur={defocusIcon}
                autoFocus={true}
            />
                        <div
                            onClick={createCommentReplyFunctional}
                            className="show-icon-cont cursor"
                        >
                            {/*<FontAwesomeIcon*/}
                            {/*  onClick={createCommentReplyFunctional}*/}
                            {/*  icon={faPaperPlane}*/}
                            {/*  style={{ display: iconVisible ? "block" : "none" }}*/}
                            {/*  className="show-icon icon-blue icon-ssm"*/}
                            {/*/>*/}
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
                            onClick={createCommentReplyFunctional}
                            className="blue cursor underline-hover"
                        >
                            submit
                        </p>
                    </div>
                </div>
            )}
            {replyElems.length > 0 && (
                <section className="reply-section">
                    {showReplies ? (
                        <>
                            <p
                                onClick={() => setShowReplies(false)}
                                className="blue cursor underline-hover mar-bottom-8"
                            >
                                hide replies
                            </p>
                            {replyElems}
                        </>
                    ) : (
                        <>
                            <div
                                onClick={() => setShowReplies(true)}
                                className="show-replies"
                            >
                                <p className="blue cursor underline-hover">
                                    show replies ({replyElems.length})
                                </p>
                            </div>
                        </>
                    )}
                </section>
            )}
        </div>
    );
};

export default Comment;
