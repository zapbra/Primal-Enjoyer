"use client";
import {increment_and_return_view_data} from "../../../../utils/supabaseFunction";
import styled from "styled-components";
import {useState, useEffect, useRef, useCallback} from "react";
import Link from "next/link";
import Image from "next/image";
import {useRouter} from "next/navigation";
import toast, {Toaster} from "react-hot-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faTurnDown, faHeart} from "@fortawesome/free-solid-svg-icons";
import supabase from "../../../../utils/supabaseClient";

import ContentLine from "../components/ContentLine";
import Anecdotes from "../components/Anecdotes";
import {faBookmark} from "@fortawesome/free-regular-svg-icons";
import {PlusIcon, XIcon} from "@heroicons/react/solid";
import Related from "../components/Related";
import Contributors from "../components/Contributors";
import DefaultBtn from "../../../../components/Buttons/AntiDefaultBtn";
import ShowAnecdote from "../components/ShowAnecdote";
import EditPost from "../components/EditPost";
import CreateAnecdote from "../components/CreateAnecdote";
import DeletePopup from "../../../../components/Buttons/DeletePopup";
import PageViews from "../../../../components/PageViews";
import AntiDefaultBtn from "../../../../components/Buttons/AntiDefaultBtn";
import PostCollection from "../../../../components/Misc/PostCollection";
import COLORS from "../../../../data/colors";

import {IoIosArrowBack} from "react-icons/io";

import {
    updateAnecdotePlease,
    fetchPost,
    createAnecdote,
    createGuestAnecdote,
    deleteAnecdote,
    getPostLikeCount,
    fetchPostId,
    likeUserPost,
    unlikeUserPost,
    fetchPostLike,
    getPostCollections,
    insertPostCollection,
    deletePost,
    deleteContributors,
    deleteAnecdotes,
    fetchPostCommentsByTitle,
    createContributor,
    fetchPostEditsByPostId,
    deletePostEdit,
    deleteContributorByAnecdoteId,
    createReplyReply,
} from "../../../../utils/supabaseFunction";
import CommentSection from "../../../../components/comments/CommentSection";
import {
    faSmile,
    faFrown,
    faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";


const Render = ({
                    data,
                    slug,
                    introEdits,
                    mainEditsFetch,
                    conEdits,
                    postData,
                }) => {
    const router = useRouter();
    const [view_data, setView_data] = useState({});
    useEffect(async () => {
        setView_data(await increment_and_return_view_data(slug));
    }, []);

    console.log("slug");
    console.log(view_data);
    const [post, setPost] = useState(postData);
    const [session, setSession] = useState(null);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [editorVisible, setEditorVisible] = useState(false);
    const [deletePopupVisible, setDeletePopupVisible] = useState(false);
    const [deletePostVisible, setDeletePostVisible] = useState(false);
    const [comments, setComments] = useState([]);
    const [editPost, setEditPost] = useState({value: "", field: ""});
    const [createAnecdoteVisible, setCreateAnecdoteVisible] = useState(false);
    const [curAnecdote, setCurAnecdote] = useState({
        title: "",
        content: "",
        anecdote_id: "",
        anecdote_real_id: "",
        date: "",
        name: "",
    });

    const [introductionEdits, setIntroductionEdits] = useState(introEdits);
    const [mainEdits, setMainEdits] = useState(mainEditsFetch);
    const [conclusionEdits, setConclusionEdits] = useState(conEdits);
    const [collections, setCollections] = useState([]);
    const [collection, setCollection] = useState("");
    const [showCollection, setShowCollection] = useState(false);
    const dropdownEl2 = useRef();
    const [origPoster, setOrigPoster] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [likes, setLikes] = useState(0);
    const [favorited, setFavorited] = useState(false);
    const [postId, setPostId] = useState(0);
    //, comments(*, commentLikes(*), users(username, avatar_url)), commentLikes(*), users(username, avatar_url)
    useEffect(() => {
        const fetchCommentsFunc = async () => {
            const {data: commentsFetch, error} = await supabase
                .from("post")
                .select("comments(*)")
                .eq("title", slug)
                .maybeSingle();

            const commentsSort = commentsFetch?.comments.sort((a, b) => -1) || [];
            setComments(commentsSort);
            console.log("x0x0x00x");
            console.log(commentsSort);
            console.log("x0x0x00x");
        };
        fetchCommentsFunc();
        /*
        fetch(`/api/views/${router.query.slug}`, {
          method: "POST",
        }); */
    }, []);
    /*
    useEffect(() => {
      const fetchComments = async () => {
        const { data: commentsFetch, error2 } = await supabase
          .from("post")
          .select(
            "comments(*, comments(*, commentLikes(*), users(username, avatar_url)), commentLikes(*), users(username, avatar_url))"
          )
          .eq("title", router.query.slug);

        // const commentsSort = commentsFetch[0]?.comments.sort((a, b) => -1) || [];
        //setComments(commentsSort);
      };

      fetchComments();
    }, []); */

    const reFetchEdits = async () => {
        const data = await fetchPostEditsByPostId(post.id);
        const intro = [],
            main = [],
            con = [];
        data
            .sort((a, b) => -1)
            .forEach((edit) => {
                if (edit.field === "introduction") {
                    intro.push(edit);
                } else if (edit.field === "main") {
                    main.push(edit);
                } else {
                    con.push(edit);
                }
            });
        setIntroductionEdits(intro);
        setMainEdits(main);
        setConclusionEdits(con);
    };

    const deletePostEditFunctional = (id) => {
        deletePostEdit(id).then((res) => res && reFetchEdits(post.id));
    };

    const toggleSidebar = () => {
        setSidebarVisible((prev) => {
            return !prev;
        });
    };

    const redirectCreatePost = () => {
        if (session) {
            router.push("/createPost");
        } else {
            toast.error("Please log in to post");
        }
    };

    const showPopup = (
        title,
        content,
        anecdote_id,
        anecdote_real_id,
        date,
        name
    ) => {
        setPopupVisible(true);

        updateAnecdote(title, content, anecdote_id, anecdote_real_id, date, name);
    };

    const hidePopup = () => {
        setPopupVisible(false);
    };

    const updateAnecdote = (
        title,
        content,
        anecdote_id,
        anecdote_real_id,
        date,
        name
    ) => {
        setCurAnecdote((prev) => {
            return {
                title,
                content,
                anecdote_id,
                anecdote_real_id,
                date,
                name,
            };
        });
    };

    useEffect(() => {
        const getSession = async () => {
            try {
                const {data, error} = await supabase.auth.getSession();
                if (error) throw error;
                setSession(data.session);
                fetchPostLike(data.session.user.id, slug).then((res) => {
                    res[0].postLikes.length > 0
                        ? setFavorited(true)
                        : setFavorited(false);
                });
                const res = getPostCollections(data.session.user.id);
                res.then((res) => setCollections(res));
                // set original poster state
                if (data.session.user.id === post.user_id) {
                    setOrigPoster(true);
                }
            } catch (error) {
            }
        };
        getSession();

        fetchPostId(slug).then((res) => setPostId(res.id));
        getPostLikeCount(slug).then((res) => setLikes(res));
    }, []);

    useEffect(() => {
        if (session?.user.id === post?.user_id) {
            setOrigPoster(true);
        }
    }, [session]);

    useEffect(() => {
        if (session?.user.id === post?.user_id) {
            setOrigPoster(true);
        }
    }, []);
    const [editorTop, setEditorTop] = useState("20%");
    // Show popup and hide on click off
    const popupRef = useRef();
    /*
    const handleClickOutside = useCallback(
      (e) => {

        if (e.target.getAttribute("data-field") === "cancel") {

          return;
        }
        if (
          popupVisible &&
          e.target.closest(".anecdote-holder") !== popupRef.current
        ) {
          setPopupVisible(false);
        }
      },
      [popupVisible, setPopupVisible, popupRef]
    );
    useEffect(() => {
      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [handleClickOutside]);
  */

    // show save post and hide on click off
    const dropdownEl = useRef();

    // Dropdown function
    const handleClickOutside = useCallback(
        (e) => {
            if (e === "override") {
                setShowDropdown(false);
                return;
            }

            if (
                showDropdown &&
                e.target.closest(".dropdown-holder") !== dropdownEl.current
            ) {
                setShowDropdown(false);
                setShowCollection(false);
                deFocus();
            }
        },
        [showDropdown, setShowDropdown, dropdownEl]
    );
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);

    const deFocus = () => {
        getPostCollections(session.user.id).then((res) => setCollections(res));
    };

    // Show editor and hide on click off
    const editorRef = useRef();

    const links = [
        {link: "/blogs/Fish", title: "blogs/Fish"},
        {link: "/blogs/Fish", title: "blogs/Fish"},
        {link: "/blogs/Fish", title: "blogs/Fish"},
        {link: "/blogs/Fish", title: "blogs/Fish"},
        {link: "/blogs/Fish", title: "blogs/Fish"},
        {link: "/blogs/Fish", title: "blogs/Fish"},
        {link: "/blogs/Fish", title: "blogs/Fish"},
    ];

    const editPostField = (value) => {
        setEditPost((prev) => {
            return {
                ...prev,
                value,
            };
        });
    };

    function Focus(e) {
        setShowDropdown(true);
    }

    const closeEditor = () => {
        setEditorVisible(false);
    };
    const editField = (title, content) => {
        if (session === null) {
            toast.error("Please log in to edit");
            return;
        }
        setEditPost((prev) => {
            return {
                value: content,
                field: title,
            };
        });
        setEditorTop(window.pageYOffset - 180);
        setEditorVisible(true);
    };
    const reFetch = async () => {
        const {data, error} = await supabase
            .from("post")
            .select(
                "*, post_url(text), tags(title), anecdote(*), link(*), contributor(*), postEdits(*, user_id(username))"
            )
            .eq("title", post.title);
        setPost(data[0]);
    };

    const updateAnecdoteAndFetch = async (
        title,
        content,
        user_id,
        real_anecdote_id
    ) => {
        const updatePost = async () => {
            fetchPost(post.id).then((res) => setPost(res));
        };

        updateAnecdotePlease(title, content, user_id, real_anecdote_id).then(
            (res) => (res ? updatePost() : "")
        );
    };

    const createAnecdoteFunctional = async (title, content, post_id, user_id) => {
        createAnecdote(title, content, post_id, user_id).then((res) =>
            createContributor(
                session.user.user_metadata.username,
                post_id,
                user_id,
                res.id
            ).then((res) => fetchPost(post.id).then((res) => setPost(res)))
        );
        toggleAnecdoteCreate();
    };

    const createGuestAnecdoteFunctional = async (
        title,
        content,
        post_id,
        name
    ) => {
        createGuestAnecdote(title, content, post_id, name).then((res) => {
            console.log("xxxx");
            console.log(res);
            console.log("xxxx");
            fetchPost(post.id).then((res) => setPost(res));
        });
        toggleAnecdoteCreate();
    };
    const toggleAnecdoteCreate = () => {
        /*
        if (session === null) {
          toast.error("Please log in to create anecdote");
          return;
        } */
        setCreateAnecdoteVisible((prev) => {
            return !prev;
        });
    };
    const deleteAnecdoteFunctional = async () => {
        console.log(curAnecdote);
        deleteAnecdote(curAnecdote.anecdote_real_id).then((res) => {
            fetchPost(post.id).then((res) => setPost(res));
        });

        hidePopup();
        hideDeletePopup();
    };

    const showDeletePopup = () => {
        setDeletePopupVisible(true);
    };
    const hideDeletePopup = () => {
        setDeletePopupVisible(false);
    };

    const showDeletePost = () => {
        setDeletePostVisible(true);
    };
    const hideDeletePost = () => {
        setDeletePostVisible(false);
    };
    const updateFavorites = () => {
        if (favorited) {
            unlikeUserPost(postId, session.user.id);
            setFavorited(false);
            setLikes((prev) => {
                return prev - 1;
            });
        } else {
            likeUserPost(session.user.id, postId, slug);
            setFavorited(true);
            setLikes((prev) => {
                return prev + 1;
            });
        }
    };

    const deletePostFunctional = async () => {
        const redirectUser = async () => {
            hideDeletePost();
            toast.success("Post has been deleted");
            const timeout = await setTimeout(() => {
                toast.success("Redirecting to all posts");
                setTimeout(() => {
                    router.push("/encyclopedia");
                }, 3000);
            }, 3000);
        };
        deletePost(post.id, session.user.id).then((res) => res && redirectUser());
    };

    const createCollection = async (e) => {
        e.preventDefault();

        if (collection === "") {
            toast.error("Please give your collection a name");
            return;
        }
        const {error} = insertPostCollection(session.user.id, collection).then(
            (res) =>
                getPostCollections(session.user.id).then((res) => setCollections(res))
        );
        if (error) {
            toast.error(`Error:${error}`);
        } else {
            toast.success(`Collection ${collection} added!`);
            setCollection("");
        }
    };

    const setCollectionVisible = () => {
        setShowCollection(true);
    };

    const reFetchComments = async () => {
        fetchPostCommentsByTitle(slug).then((res) => setComments(res));
    };

    console.log(post);
    return (
        <>
            {post !== undefined && (
                <div colors={COLORS}>
                    <Toaster/>
                    {/* <Sidebar
              sidebarVisible={sidebarVisible}
              toggleSidebar={toggleSidebar}
            /> */}

                    <div
                        className="bg-white px-2 py-8"
                        /*
                    style={{
                      left: sidebarVisible ? "0px" : "-240px",
                      width: sidebarVisible ? "calc(100%)" : "calc(100% + 240px)",
                    }} */
                    >
                        {/*<div className="grid">*/}
                        {/*  <div>*/}
                        {/*    {session ? (*/}
                        {/*      <Link href={{ pathname: "/createPost" }}>*/}
                        {/*        {" "}*/}
                        {/*        <div className="grid-btn">*/}
                        {/*          <DefaultBtn text="Create New Post!" />*/}
                        {/*        </div>*/}
                        {/*      </Link>*/}
                        {/*    ) : (*/}
                        {/*      <Link href={{ pathname: "/signup" }}>*/}
                        {/*        <div className="grid-btn">*/}
                        {/*          <AntiDefaultBtn text="Sign Up" />*/}
                        {/*        </div>*/}
                        {/*      </Link>*/}
                        {/*    )}*/}
                        {/*  </div>*/}

                        {/*  <h2 className="text-shadow  title-spec">{post?.title}</h2>*/}
                        {/*</div>*/}
                        {/*{deletePostVisible && (*/}
                        {/*  <DeletePopup*/}
                        {/*    text="post"*/}
                        {/*    deleteFunction={deletePostFunctional}*/}
                        {/*    cancelFunction={hideDeletePost}*/}
                        {/*  />*/}
                        {/*)}*/}
                        {/*{origPoster && (*/}
                        {/*  <div className="flex flex-end mar-bottom-one">*/}
                        {/*    <div onClick={showDeletePost} className="save-cont delete">*/}
                        {/*      <h6 className="mar-right-8 red">Delete Post</h6>*/}
                        {/*      <XIcon className="hero-icon-sm red" />*/}
                        {/*    </div>*/}
                        {/*  </div>*/}
                        {/*)}*/}
                        {/*<div className="icon-holder">*/}
                        {/*  <Link*/}
                        {/*    href={{*/}
                        {/*      pathname: `/blogs`,*/}
                        {/*    }}*/}
                        {/*  >*/}
                        {/*    <div className="mar-bottom-one lg-icon-circle mar-left-32">*/}
                        {/*      <FontAwesomeIcon*/}
                        {/*        style={{ transform: "rotate(90deg)" }}*/}
                        {/*        icon={faTurnDown}*/}
                        {/*        className="icon-blue icon-lg"*/}
                        {/*      />*/}
                        {/*    </div>*/}
                        {/*  </Link>*/}
                        {/*  <div className=" analytic-box">*/}
                        {/*    <FontAwesomeIcon icon={faHeart} className="icon-sm red" />*/}
                        {/*    <p className="small">{likes}</p>*/}
                        {/*  </div>*/}

                        {/*  <div className=" analytic-box">*/}
                        {/*    <FontAwesomeIcon icon={faEye} className="icon-sm" />*/}
                        {/*    <p className="small">*/}
                        {/*      <PageViews view_data={view_data} />*/}
                        {/*    </p>*/}
                        {/*  </div>*/}

                        {/*  {session !== null && (*/}
                        {/*    <div*/}
                        {/*      onClick={updateFavorites}*/}
                        {/*      className={*/}
                        {/*        favorited*/}
                        {/*          ? "real-heart-relative heart-active"*/}
                        {/*          : "real-heart-relative"*/}
                        {/*      }*/}
                        {/*    >*/}
                        {/*      <FontAwesomeIcon*/}
                        {/*        icon={faHeart}*/}
                        {/*        className={*/}
                        {/*          favorited ? "icon-med red" : "light-grey icon-med"*/}
                        {/*        }*/}
                        {/*      />*/}
                        {/*    </div>*/}
                        {/*  )}*/}
                        {/*  {session === null ? (*/}
                        {/*    <div className="flex heart-relative flex-row sign-in-box box-shadow">*/}
                        {/*      <Link passHref href="/login">*/}
                        {/*        <p className="link-blue">Sign In </p>*/}
                        {/*      </Link>*/}

                        {/*      <p className="hide-300" style={{ marginLeft: "4px" }}>*/}
                        {/*        {" "}*/}
                        {/*        to save for later!*/}
                        {/*      </p>*/}
                        {/*    </div>*/}
                        {/*  ) : (*/}
                        {/*    <div*/}
                        {/*      ref={dropdownEl}*/}
                        {/*      id="dropdown"*/}
                        {/*      onClick={Focus}*/}
                        {/*      className="heart-relative dropdown-holder"*/}
                        {/*    >*/}
                        {/*      <div className="save-cont">*/}
                        {/*        <FontAwesomeIcon*/}
                        {/*          icon={faBookmark}*/}
                        {/*          className="icon-med icon-blue"*/}
                        {/*        />*/}
                        {/*        <p>Save</p>*/}
                        {/*      </div>*/}

                        {/*      {showDropdown && (*/}
                        {/*        <div className="save-popup box-shadow">*/}
                        {/*          <div>*/}
                        {/*            <p>Save to...</p>*/}
                        {/*            <PostCollection*/}
                        {/*              posts={collections}*/}
                        {/*              title={slug}*/}
                        {/*              link={`/article/${slug}`}*/}
                        {/*              user_id={session?.user?.id}*/}
                        {/*            />*/}

                        {/*            <div*/}
                        {/*              onClick={() => setCollectionVisible(true)}*/}
                        {/*              className="flex-center hover-grey "*/}
                        {/*              style={{*/}
                        {/*                display: showCollection ? "none" : "flex",*/}
                        {/*              }}*/}
                        {/*            >*/}
                        {/*              <PlusIcon className="hero-icon-sm off-black" />*/}
                        {/*              <p*/}
                        {/*                style={{ marginLeft: "8px" }}*/}
                        {/*                className=" cursor small "*/}
                        {/*              >*/}
                        {/*                Create new collection*/}
                        {/*              </p>*/}
                        {/*            </div>*/}
                        {/*            <form*/}
                        {/*              style={{*/}
                        {/*                display: showCollection ? "block" : "none",*/}
                        {/*              }}*/}
                        {/*              onSubmit={createCollection}*/}
                        {/*            >*/}
                        {/*              <input*/}
                        {/*                style={{ width: "100%", height: "40px" }}*/}
                        {/*                type="text"*/}
                        {/*                name="collection"*/}
                        {/*                id="collection"*/}
                        {/*                className="mar-bottom-8"*/}
                        {/*                value={collection}*/}
                        {/*                onChange={(e) => setCollection(e.target.value)}*/}
                        {/*              />*/}
                        {/*              <div className="flex-right">*/}
                        {/*                <button className="small-button">*/}
                        {/*                  <p className="small">Create</p>*/}
                        {/*                </button>*/}
                        {/*              </div>*/}
                        {/*            </form>*/}
                        {/*          </div>*/}
                        {/*        </div>*/}
                        {/*      )}*/}
                        {/*    </div>*/}
                        {/*  )}*/}
                        {/*</div>*/}
                        {/*{post?.post_url !== null && (*/}
                        {/*  <div className="image-cont ">*/}
                        {/*    <Image*/}
                        {/*      src={post?.post_url[0]?.text}*/}
                        {/*      size="100%"*/}
                        {/*      objectFit="contain"*/}
                        {/*      layout="fill"*/}
                        {/*    />*/}
                        {/*  </div>*/}
                        {/*)}*/}

                        {/*{editorVisible && <div className="popup-screen"></div>}*/}
                        {/*<div className="content-holder">*/}
                        {/*  {editorVisible && (*/}
                        {/*    <div*/}
                        {/*      className="editor-holder"*/}
                        {/*      style={{ top: editorTop }}*/}
                        {/*      ref={editorRef}*/}
                        {/*    >*/}
                        {/*      <EditPost*/}
                        {/*        postId={post.id}*/}
                        {/*        postUserId={post.user_id}*/}
                        {/*        userId={session?.user.id}*/}
                        {/*        field={editPost.field}*/}
                        {/*        fieldValue={editPost.value}*/}
                        {/*        editPostField={editPostField}*/}
                        {/*        reFetch={reFetch}*/}
                        {/*        closeEditor={closeEditor}*/}
                        {/*      />*/}
                        {/*    </div>*/}
                        {/*  )}*/}
                        {/*  <div className="ssm-spacer"></div>*/}
                        <div className="mx-auto max-w-5xl">
                            <div className="inline-flex items-center hover:text-blue-500">
                                <IoIosArrowBack
                                    className='text-xl'
                                />
                                <a href={'/blogs'} className="link res-text-base cursor-pointer">Back to
                                    blogs</a>
                            </div>
                            <h1 className="res-heading-2xl mb-8">
                                {post.title}
                            </h1>
                            <ContentLine
                                title="Introduction"
                                content={post?.introduction}
                                addField=""
                                icon={null}
                                editField={editField}
                                user={session?.user}
                                post_id={post?.user_id}
                                edits={introductionEdits}
                                deletePostEditFunctional={deletePostEditFunctional}
                                origPoster={origPoster}
                                feFetch={reFetch}
                                width={post?.image_width}
                            />

                            <ContentLine
                                title="Main"
                                content={post?.main}
                                addField=""
                                icon={null}
                                editField={editField}
                                user={session?.user}
                                post_id={post?.user_id}
                                edits={mainEdits}
                                deletePostEditFunctional={deletePostEditFunctional}
                                origPoster={origPoster}
                                feFetch={reFetch}
                                width={post.image_width}
                            />
                            <ContentLine
                                title="Conclusion"
                                content={post?.conclusion}
                                addField=""
                                icon={faQuestionCircle}
                                editField={editField}
                                user={session?.user}
                                post_id={post?.user_id}
                                edits={conclusionEdits}
                                deletePostEditFunctional={deletePostEditFunctional}
                                origPoster={origPoster}
                                feFetch={reFetch}
                                width={post.image_width}
                            />
                            {deletePopupVisible && (
                                <>
                                    <DeletePopup
                                        text="Anecdote"
                                        deleteFunction={deleteAnecdoteFunctional}
                                        cancelFunction={hideDeletePopup}
                                    />
                                    <div style={{zIndex: "3"}} className="popup-screen"></div>
                                </>
                            )}
                            {popupVisible && (
                                <>
                                    <div ref={popupRef} className="anecdote-holder">
                                        <ShowAnecdote
                                            hidePopup={hidePopup}
                                            title={curAnecdote.title}
                                            content={curAnecdote.content}
                                            userId={session?.user.id}
                                            anecdoteId={curAnecdote.anecdote_id}
                                            anecdoteRealId={curAnecdote.anecdote_real_id}
                                            updateAnecdoteAndFetch={updateAnecdoteAndFetch}
                                            date={curAnecdote.date}
                                            showDeletePopup={showDeletePopup}
                                            name={curAnecdote.name}
                                        />
                                    </div>
                                    <div className="popup-screen"></div>
                                </>
                            )}


                            {/*<Related links={post?.link}/>*/}

                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Render;
