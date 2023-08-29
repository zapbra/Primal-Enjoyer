"use client";

import styled from "styled-components";
import { useContext, useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import Download from "../../../../components/Buttons/Download";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const TextDownload = dynamic(
  () => import("../../../../components/Buttons/TextDownload"),
  {
    ssr: false,
  }
);
import {
  TagIcon,
  ArrowNarrowRightIcon,
  BookmarkIcon,
  XIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import { GetRelatedArticles } from "../../../../utils/Functions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTurnDown,
  faHeart,
  faEye,
  faLink,
  faCopy,
  faDownload,
} from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";
import COLORS, { tagColors } from "../../../../data/colors";

/* import { AppContext } from "../../layout"; */
import ArticleCollection from "../../../../components/Misc/ArticleCollection";
import supabase from "../../../../utils/supabaseClient";
import insertCollection, {
  getLikeCount,
  unlikePost,
} from "../../../../utils/supabaseFunction";
import {
  getCollections,
  fetchArticleLike,
  checkArticleCreated,
  fetchArticleId,
  likePost,
  fetchCommentsByTitle,
} from "../../../../utils/supabaseFunction";
import PageViews from "../../../../components/PageViews";
import CommentSection from "../../../../components/comments/CommentSection";

/*
export const getServerSideProps = async (pageContext) => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    header: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const pageSlug = pageContext.query.slug;

  const query = gql`
    query ($pageSlug: String!) {
      article(where: { title: $pageSlug }) {
        title
        coverImage {
          url
        }
        aajonusCatagory {
          title
        }
        audio {
          url
        }
        tags(first: 10) {
          text
        }
        content {
          raw
        }
      }
      articles(first: 1000) {
        title

        tags {
          ... on Tag {
            text
          }
        }
      }

      moreArticles: articles(skip: 1000, first: 999) {
        title
        aajonusCatagory {
          title
        }
        tags {
          ... on Tag {
            text
          }
        }
      }
    }
  `;
  const variables = {
    pageSlug,
  };
  const data = await graphQLClient.request(query, variables);
  const article = data.article;
  const articles = [...data.articles, ...data.moreArticles];

  if (checkArticleCreated(pageContext.query.slug).then((res) => res)) {
    const { data: commentsFetch, error } = await supabase
      .from("article")
      .select(
        "comments(*, comments(*, commentLikes(*), users(username, avatar_url)), commentLikes(*), users(username, avatar_url))"
      )
      .eq("title", pageSlug);
    const commentsSort = commentsFetch[0]?.comments.sort((a, b) => -1) || [];
    return {
      props: {
        article,
        articles,
        slug: pageContext.query.slug,
        commentsFetch: commentsSort,
      },
    };
  }

  return {
    props: {
      article,
      articles,
      slug: pageContext.query.slug,
      commentsFetch: [],
    },
  };
};
*/

const Cont = styled.div`
  $rhap_theme-color: red !default;
  $rhap_background-color: red !default;
  $rhap_bar-color: #dddddd !default;
  $rhap_time-color: #333 !default;
  $rhap_font-family: inherit !default;

  .rhap_container {
    font-family: $rhap_font-family;

    background-color: $rhap_background-color;
  }

  .rhap_time {
    color: $rhap_time-color;
  }

  .rhap_progress-bar {
    background-color: $rhap_bar-color;
  }

  .rhap_progress-filled {
    background-color: ${(props) => props.colors.darkBlue};
  }

  .rhap_progress-bar-show-download {
    background-color: rgba($rhap_bar-color, 0.5);
  }

  .rhap_download-progress {
    background-color: $rhap_bar-color;
  }

  .rhap_progress-indicator {
    background: ${(props) => props.colors.darkBlue};

    box-shadow: rgba(0, 43, 103, 0.5) 0 0 5px;
  }
  .rhap_repeat-button {
    color: ${(props) => props.colors.darkBlue};
  }

  .rhap_main-controls-button {
    color: ${(props) => props.colors.darkBlue};
  }

  .rhap_volume-button {
    color: ${(props) => props.colors.darkBlue};
  }

  .rhap_volume-bar {
    background: $rhap_bar-color;
  }

  .rhap_volume-indicator {
    box-shadow: rgba($rhap_theme-color, 0.5) 0 0 3px;
    background-color: ${(props) => props.colors.darkBlue};
  }

  .rhap_volume-filled {
    background-color: ${(props) => props.colors.darkBlue};
  }

  .download-audio {
    position: absolute;
    right: 16px;
    top: 333px;
  }
  .download-text {
    position: absolute;
    right: 16px;
    top: 386px;
    z-index: 1;
  }
  .save-cont {
    background: #fff;
    position: relative;

    &:hover {
      border: 1px solid ${(props) => props.colors.darkBlue};
    }
    @media only screen and (max-width: 320px) {
      top: 226px;
      right: -172px;
    }
  }
  .save-popup {
    @media only screen and (max-width: 370px) {
      position: absolute;
      left: 0px;
    }
    @media only screen and (max-width: 320px) {
      left: 50px;
      top: 248px;

      right: 0px !important;
    }
    @media only screen and (max-width: 270px) {
      min-width: 200px;
      left: 60px;
    }
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: 240px minmax(200px, 480px) 240px;
  padding: 2rem;
  grid-gap: 2rem;

  justify-content: space-between;
  align-items: center;

  @media only screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;

const Header = styled.div`
  margin-bottom: 1rem;
  color: #ffffff;
  background: #ffffff;
  text-shadow: 3px 8px 7px rgba(0, 0, 0, 0.61);
`;
const Tags = styled.div`
  //grid-area: tags;

  border-radius: 1rem;
  border: 1px solid ${(props) => props.colors.darkBlue};
  background: ${(props) => props.colors.grey};
  .tag-title {
    border-radius: 1rem 1rem 0 0;
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
    column-gap: 4px;
    background: #fff;
    padding: 8px;
    position: relative;
    display: flex;
    justify-content: center;

    .no-shrink {
      flex-shrink: 0;
    }
  }
  h3 {
    display: inline-block;
    margin-right: 8px;
  }
  .icon-blue {
    position: relative;
    top: 5px;
    width: 32px;
    height: 32px;
  }
  .tag-list {
    padding: 8px;
    background: ${(props) => props.colors.grey};
    display: flex;
    align-items: center;
    border-radius: 0 0 1rem 1rem;
    flex-direction: column;
  }
`;
const Tag = styled.div`
  padding: 4px 8px;
  display: inline-block;
  background: ${(props) => props.color};
  border: 1px solid ${(props) => props.colors.darkBlue};
  border-radius: 1rem;
  margin-bottom: 8px;
`;

const Related = styled.div`
  //grid-area: related;
  border-radius: 1rem;

  border: 1px solid ${(props) => props.colors.darkBlue};
  .related-title {
    border-radius: 1rem 1rem 0 0;
    padding: 8px;
    text-align: center;
    background-color: #fff;
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
  }
  .related-list {
    background: ${(props) => props.colors.grey};
    border-radius: 0 0 1rem 1rem;
  }
  .related-article {
  }

  .related-line {
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
    padding: 8px;

    border-radius: 0;
    &:last-of-type {
      border-bottom: none;
      border-radius: 0 0 1rem 1rem;
    }
    p {
      font-weight: 500;
      flex: 1;
      flex-basis: 90%;
    }
    .icon-blue {
      flex: 1;
      width: 24px;
      height: 24px;
      flex-basis: 10%;
    }

    transition: background-color, 0.25s ease;
    &:hover {
      cursor: pointer;
      background-color: ${(props) => props.colors.darkBlue};
      p {
        color: white;
      }
      .icon-blue {
        color: white;
      }
    }
  }
`;

const CoverImage = styled.div`
  margin-bottom: 3rem;
  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
`;

const TextContent = styled.div`
  max-width: 1000px;
  margin: auto;
  padding: 16px;
  border-top: 1px solid ${(props) => props.colors.darkBlue};
  p {
    line-height: 1.8;

    margin-bottom: 1rem;
  }
  @media only screen and (max-width: 400px) {
    padding: 16px 0 0 0;
  }
`;

const Slug = ({ article, articles, slug }) => {
  const [view_data, setView_data] = useState({});
  const router = useRouter();
  useEffect(() => {
    const viewFunc = async () => {
      const { data: view_data } = await supabase
        .from("pages")
        .select("view_count")
        .filter("slug", "eq", slug)
        .maybeSingle();
      setView_data(view_data);
      await supabase.rpc("increment_page_view", {
        page_slug: slug,
      });
    };

    viewFunc();
  }, []);
  const [session, setSession] = useState(null);
  /* const [context, setContext] = useContext(AppContext); */
  const relatedArticles =
    article.tags.length > 0 ? GetRelatedArticles(articles, article.tags) : [];
  const [favorited, setFavorited] = useState(false);
  const [showCollection, setShowCollection] = useState(false);
  const [collections, setCollections] = useState([]);
  const [collection, setCollection] = useState("");
  const [loading, setLoading] = useState(true);
  const [articleId, setArticleId] = useState(0);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState(() => {
    const textContent = article.content.raw.children.map((textNode) => {
      return textNode.children[0].text;
    });

    const text = textContent.join("\n");
    return text;
  });

  //comments(*, commentLikes(*), users(username, avatar_url)), commentLikes(*), users(username, avatar_url)
  useEffect(() => {
    const fetchComments = async () => {
      if (checkArticleCreated(slug).then((res) => res)) {
        const { data: commentsFetch, error } = await supabase
          .from("article")
          .select(
            "comments(*, commentLikes(*), users(username, avatar_url), comment_id(*))"
          )
          .eq("title", slug)
          .maybeSingle();

        const commentsSort = commentsFetch?.comments.sort((a, b) => -1) || [];

        setComments(commentsSort);
      }
    };

    fetchComments();
  }, []);

  /* useEffect(() => {
    fetch(`/api/views/${slug}`, {
      method: "POST",
    });
  }, [slug]); */
  function generateColor() {
    return tagColors[Math.floor(Math.random() * tagColors.length)];
  }

  const reFetchComments = async () => {
    const commentRes = await fetchCommentsByTitle(slug);
    console.log("comment res");
    console.log(commentRes);
    //.then((res) => setComments(res));
  };

  const tagElems = article.tags.map((tag) => {
    return (
      <Tag key={nanoid()} colors={COLORS} color={generateColor()}>
        <p>{tag.text}</p>
      </Tag>
    );
  });

  const relatedElems = relatedArticles.map((article) => {
    return (
      <div key={nanoid()} className="related-line">
        <Link href={`/article/${article.title}`}>
          <div className="flex align-center space-between">
            <p>{article.title}</p>
            <ArrowNarrowRightIcon className="icon-blue" />
          </div>
        </Link>
      </div>
    );
  });
  const returnFalse = () => {
    return false;
  };

  // calls on page load to set user session and set article collection
  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      // create article if not created
      checkArticleCreated(article.title).then((res) =>
        fetchArticleId(article.title).then((res) => setArticleId(res.id))
      );
      setSession(data.session);
      getLikeCount(article.title).then((res) => setLikes(res));
      if (data.session !== null) {
        fetchArticleLike(data.session.user.id, article.title).then((res) =>
          res[0].articleLikes.length > 0
            ? setFavorited(true)
            : setFavorited(false)
        );

        const res = getCollections(data.session.user.id);

        res.then((res) => {
          setCollections(res);
        });
      }
    };
    getSession();
  }, []);

  /*   useEffect(() => {
    console.log("collections");
    console.log(collections);
  }, [collections]); */

  const createCollection = async (e) => {
    e.preventDefault();
    if (collection === "") {
      toast.error("Please give your collection a name");
      return;
    }
    const { error } = insertCollection(session.user.id, collection).then(
      (res) =>
        getCollections(session.user.id, setLoadingTrue).then((res) =>
          setCollections(res)
        )
    );

    if (error) {
      toast.error(`Error:${error}`);
    } else {
      toast.success(`Collection ${collection} added!`);
      setCollection("");
      setLoading(false);
    }
  };

  const createAnonCollection = async (e) => {
    e.preventDefault();
    if (collection === "") {
      toast.error("Please give your collection a name");
      return;
    }
    const { error } = insertCollection(session.user.id, collection).then(
      (res) =>
        getCollections(session.user.id, setLoadingTrue).then((res) =>
          setCollections(res)
        )
    );

    if (error) {
      toast.error(`Error:${error}`);
    } else {
      toast.success(`Collection ${collection} added!`);
      setCollection("");
      setLoading(false);
    }
  };

  const setLoadingTrue = () => {
    setLoading(true);
  };

  const updateFavorites = () => {
    if (favorited) {
      unlikePost(articleId, session.user.id);
      setFavorited(false);
      setLikes((prev) => {
        return prev - 1;
      });
    } else {
      likePost(session.user.id, articleId, article.title);
      setFavorited(true);
      setLikes((prev) => {
        return prev + 1;
      });
    }
  };

  const dropdownEl2 = useRef();
  const [showDropdown, setShowDropdown] = useState(false);
  // Dropdown function
  const handleClickOutside = useCallback(
    (e) => {
      if (e === "override") {
        setShowDropdown(false);
        return;
      }

      if (
        showDropdown &&
        e.target.closest(".dropdown-holder2") !== dropdownEl2.current
      ) {
        setShowDropdown(false);
        setShowCollection(false);
        deFocus();
      }
    },
    [showDropdown, setShowDropdown, dropdownEl2]
  );
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  function Focus(e) {
    setShowDropdown(true);
  }

  const deFocus = () => {
    getCollections(session.user.id).then((res) => setCollections(res));
  };

  const setCollectionVisible = () => {
    setShowCollection(true);
  };

  useEffect(() => {
    console.log("collections");
    console.log(collections);
  }, [collections]);

  const [copied, setCopied] = useState(false);
  const copyLink = () => {
    setCopied(true);
    navigator.clipboard.writeText(window.location.href);
    document.querySelector(".share-text").classList.add("scale-pop");
    document.querySelector(".share-icon").classList.add("scale-pop");
    setTimeout(() => {
      document.querySelector(".share-text").classList.remove("scale-pop");
      document.querySelector(".share-icon").classList.remove("scale-pop");
    }, 500);
  };
  const metaTags = article.tags.map((tag) => tag.text);

  const meta = {
    title: article.title,
    description: `Aajonus Vonderplanitz raw meat article related to ${article.title}`,
    link: `https://www.primalenjoyer.com/article/${article.title}`,
    type: "website",
    date: "2023-02-20 15:00:00.000",
    image: article.coverImage.url,
    keywords: `aajonus vonderplanitz, raw meat, health, information, raw primal, diet, ${
      article.title
    }, ${metaTags.join(", ")}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Primal Enjoyer" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="article:published_time" content={meta.date} />
        <link rel="canonical" href={meta.image} />
        <meta property="og:url" content={meta.link} />
        <meta name="keywords" content={meta.keywords} />

        <meta name="description" content={meta.description} />
      </Head>
      <div className="container">
        <Cont colors={COLORS}>
          <Toaster />
          <Link
            href={{
              pathname: `/search`,
            }}
          >
            <div className="mar-bottom-one click-back lg-icon-circle">
              <FontAwesomeIcon
                style={{ transform: "rotate(90deg)" }}
                icon={faTurnDown}
                className="icon-blue icon-lg"
              />
            </div>
          </Link>
          <div className="likes analytic-box ">
            <FontAwesomeIcon icon={faHeart} className="icon-sm red" />
            <p className="small">{likes}</p>
          </div>

          <div
            onMouseLeave={() => setCopied(false)}
            className="share-absolute-cont"
          >
            <div
              onClick={copyLink}
              className="share-absolute circle flex-center"
            >
              <FontAwesomeIcon
                icon={faLink}
                className="icon-sm white mar-right-8"
              />
              <p className="bold white">Share</p>
            </div>
            <div className="share-popup flex flex-center">
              <FontAwesomeIcon
                icon={faCopy}
                className="icon-sm mar-right-8 share-icon"
              />
              <p className="bold black share-text">
                {copied ? "Copied" : "Copy"}
              </p>
            </div>
          </div>
          <div className="download-audio">
            <Download link={article?.audio?.url} type="audio" />
          </div>

          <div className="download-text">
            <TextDownload text={text} title={article.title} />
          </div>

          <div className="views analytic-box">
            <FontAwesomeIcon icon={faEye} className="icon-sm" />
            <p className="small">
              <PageViews view_data={view_data} />
            </p>
          </div>

          {session !== null && (
            <div
              onClick={updateFavorites}
              className={favorited ? "real-heart heart-active" : "real-heart"}
            >
              <FontAwesomeIcon
                icon={faHeart}
                className={favorited ? "icon-med red" : "light-grey icon-med"}
              />
            </div>
          )}
          {session === null ? (
            <div
              className="flex heart flex-row sign-in-box box-shadow"
              style={{ right: "128px" }}
            >
              <Link passHref href="/login">
                <p className="link-blue">Sign In </p>
              </Link>

              <p className="hide-400" style={{ marginLeft: "4px" }}>
                {" "}
                to save for later!
              </p>
            </div>
          ) : (
            /* <div
              ref={dropdownEl2}
              id="dropdown"
              onClick={Focus}
              className="heart dropdown-holder2"
            >
              <div className="save-cont">
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="icon-med icon-blue"
                />
                <p>Save</p>
              </div>

              {showDropdown && (
                <div className="save-popup box-shadow">
                  <div>
                    <p>Save to...</p>
                    <ArticleCollection
                      articles={collections}
                      title={article.title}
                      link={`/article/${article.title}`}
                      user_id={session?.user?.id}
                    />

                    <div
                      onClick={() => setCollectionVisible(true)}
                      className="flex-center hover-grey"
                      style={{ display: showCollection ? "none" : "flex" }}
                    >
                      <PlusIcon className="hero-icon-sm off-black" />
                      <p
                        style={{ marginLeft: "8px" }}
                        className=" cursor small"
                      >
                        Create new collection
                      </p>
                    </div>
                    <form
                      style={{ display: showCollection ? "block" : "none" }}
                      onSubmit={createAnonCollection}
                    >
                      <input
                        style={{ width: "100%", height: "40px" }}
                        type="text"
                        name="collection"
                        id="collection"
                        className="mar-bottom-8"
                        value={collection}
                        onChange={(e) => setCollection(e.target.value)}
                      />
                      <div className="flex-right">
                        <button className="small-button">
                          <p className="small">Create</p>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div> */
            <div
              ref={dropdownEl2}
              id="dropdown"
              onClick={Focus}
              className="heart dropdown-holder2"
            >
              <div className="save-cont">
                <FontAwesomeIcon
                  icon={faBookmark}
                  className="icon-med icon-blue"
                />
                <p>Save</p>
              </div>

              {showDropdown && (
                <div className="save-popup box-shadow">
                  <div>
                    <p>Save to...</p>
                    <ArticleCollection
                      articles={collections}
                      title={article.title}
                      link={`/article/${article.title}`}
                      user_id={session?.user?.id}
                    />

                    <div
                      onClick={() => setCollectionVisible(true)}
                      className=" hover-grey"
                      style={{
                        display: showCollection ? "none" : "flex",
                        width: "100%",
                      }}
                    >
                      <PlusIcon className="hero-icon-sm off-black" />

                      <p
                        style={{ marginLeft: "8px" }}
                        className=" cursor small"
                      >
                        Create new collection
                      </p>
                    </div>
                    <form
                      style={{ display: showCollection ? "block" : "none" }}
                      onSubmit={createCollection}
                    >
                      <input
                        style={{ width: "100%", height: "40px" }}
                        type="text"
                        name="collection"
                        id="collection"
                        className="mar-bottom-8"
                        value={collection}
                        onChange={(e) => setCollection(e.target.value)}
                      />
                      <div className="flex-right">
                        <button className="small-button">
                          <p className="small">Create</p>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          <Header>
            <div className="center-inline">
              <h1 className="align-center">{article.title}</h1>
            </div>
          </Header>
          <Grid>
            <Tags colors={COLORS}>
              <div className="tag-title">
                <h3>Tags</h3>
                <TagIcon className="icon-blue no-shrink" />
              </div>
              <div className="tag-list">{tagElems}</div>
            </Tags>

            <AudioPlayer src={article.audio.url} />
            <Related colors={COLORS}>
              <div className="related-title">
                <h3>Related</h3>
              </div>
              <div className="related-list">{relatedElems}</div>
            </Related>
          </Grid>
          <CoverImage>
            <img src={article.coverImage.url} alt="article logo" />
          </CoverImage>

          <TextContent colors={COLORS}>
            <div className="flex flex-end mar-bottom-16">
              <div
                className="download-green cursor flex align-center"
                onClick={copyToClipboard}
              >
                <FontAwesomeIcon
                  icon={faCopy}
                  className="green icon-ssm mar-right-8"
                />
                <p className="green " style={{ marginBottom: "0px" }}>
                  Copy Text
                </p>
              </div>
            </div>
            <RichText
              content={article.content.raw}
              renderers={{
                bold: ({ children }) => <strong>{children}</strong>,
              }}
            ></RichText>
          </TextContent>
        </Cont>
      </div>
      <CommentSection
        session={session}
        article_id={articleId}
        comments={comments}
        reFetchComments={reFetchComments}
      />
    </>
  );
};

export default Slug;
