"use client";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHeart } from "@fortawesome/free-solid-svg-icons";
import { PlusIcon } from "@heroicons/react/solid";
import SavedCollection from "../../../components/account/SavedCollection";
import { useEffect, useRef, useCallback, useState, useContext } from "react";
import { AppContext } from "../layout";
import {
  checkLocalStorageValid,
  fetchDaysDiff,
} from "../../../utils/Functions";
import DefaultBtn from "../../../components/Buttons/DefaultBtn";
import AntiDefaultBtn from "../../../components/Buttons/AntiDefaultBtn";
import RedBtn from "../../../components/Buttons/RedBtn";
import supabase from "../../../utils/supabaseClient";
import toast, { Toaster } from "react-hot-toast";
import insertCollection, {
  deleteCollectionParent,
  getCollections,
  getFullCollections,
  removeFromCollection,
  deleteCollection,
  removeFromPostCollection,
  deletePostCollection,
  deletePostCollectionParent,
  getFullPostCollections,
  insertPostCollection,
  fetchNotifications,
  deleteNotification,
} from "../../../utils/supabaseFunction";
import ArticleCollection from "../../../components/account/ArticleCollection";
import PostCollection from "../../../components/account/PostCollection";
import Posts from "../../../components/account/Posts";
import Notifications from "../../../components/account/Notifications";

const Cont = styled.div`
  min-height: 100vh;
  background: #fff;
  padding-top: 38px;
  background-color: ${(props) => props.colors.ultraLightBlue};
  .image-cont {
    width: 120px;
    height: 120px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    border: 4px solid ${(props) => props.colors.grey};
    border-style: outset;
  }
  .dropdown-holder-2 {
    position: relative;
    width: 100%;
  }
  section {
    position: relative;
  }
  .save-cont {
    &:hover {
      border: 1px solid ${(props) => props.colors.darkBlue};
    }
  }
  .save-popup {
    left: calc(50% - 126px);
    bottom: 70px;

    @media only screen and (max-width: 280px) {
      min-width: 100%;
      left: 0;
    }
  }
  .sign-out {
    padding-left: 32px;
    padding-right: 32px;
    display: flex;
    justify-content: flex-end;
    padding-top: 16px;
    div {
      display: inline-block;
    }
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 550px));
    place-content: center;
    row-gap: 48px;
    column-gap: 48px;

    @media only screen and (max-width: 600px) {
      padding: none;
      grid-template-columns: repeat(auto-fit, minmax(100px, 550px));
    }
  }
  .stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    .set-mobile-visible {
      display: none;
    }
    @media only screen and (max-width: 1150px) {
      grid-template-columns: minmax(400px, 550px);
      justify-content: center;
      row-gap: 48px;
    }
    @media only screen and (max-width: 400px) {
      grid-template-columns: 100%;
      .set-mobile-visible {
        display: inline-block;
      }
      .set-mobile-invisible {
        display: none;
      }
      .stat-box {
        margin-right: 0px;
      }
    }
  }

  .box-shadow {
    padding: 8px;
    display: flex;
  }
  .flex-center {
    display: inline-flex;

    h1 {
      margin-right: 32px;
    }
    h2 {
      margin-right: 16px;
    }
  }

  .sign-out {
    text-align: right;
  }
  .flex {
    align-items: center;
    justify-content: space-around;
  }
  .stats-section {
    h3 {
      text-align: center;
    }
    h5.black {
      text-decoration: underline;
    }
  }
  .stat-box {
    display: inline-block;
    padding: 16px;
    margin-right: 32px;
    h5 {
      margin-bottom: 16px;
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .notification-title {
    @media only screen and (max-width: 280px) {
      flex-direction: column;
      .notification-title-text {
        margin-bottom: 8px;
      }
    }
  }
  @media only screen and (max-width: 460px) {
    .user-profile {
      padding: 16px;
    }
  }
  .user-title {
    @media only screen and (max-width: 460px) {
      flex-direction: column;
      .box-fancy {
        margin-bottom: 16px;
        width: 100%;
        text-align: center;
      }
      .image-cont {
        margin-left: 0;
      }
    }
  }
  .box-fancy {
    word-wrap: break-word;
  }
`;

const Account = () => {
  const [user, setUser] = useState({});
  const { data, error } = supabase.auth.getSession();
  const [session, setSession] = useState({});
  const [context, setContext] = useContext(AppContext);
  const [collections, setCollections] = useState([]);
  const [postCollections, setPostCollections] = useState([]);
  const [collection, setCollection] = useState("");
  const [postCollection, setPostCollection] = useState("");
  const [num, setNum] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const updateNum = () => {
    setNum((num) => {
      return num + 1;
    });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    toast.success("You are no longer singed in");
    updateSession();
  };
  const deleteArticle = (title) => {
    setContext((prevContext) => {
      const index = prevContext.articles.findIndex(
        (article) => article.title == title
      );

      prevContext.articles.splice(index, 1);
      if (checkLocalStorageValid) {
        localStorage.setItem("favorites", JSON.stringify(prevContext.articles));
      }
      return {
        ...prevContext,
        articles: prevContext.articles,
      };
    });
  };

  const updateSession = async () => {
    const { data } = await supabase.auth.getSession();

    setSession(data);
  };

  useEffect(() => {
    const updateSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session !== null) {
        getFullCollections(data.session.user.id).then((res) =>
          setCollections(res)
        );
        fetchNotifications(data.session.user.id).then((res) => {
          setNotifications(res);
        });
        const { data: res } = await supabase
          .from("users")
          .select(
            "*, post(*, comments(id), postLikes(id)), articleLikes(*), anecdote(id), articleCollection(id), postCollection(*, savedPost(*)), savedArticle(id), comments(id)"
          )
          .eq("id", data.session.user.id);

        if (res) {
          setUser(res[0]);
          setPostCollections(res[0].postCollection);
        }
      }
      setSession(data);
    };
    updateSession();
  }, []);

  // updates collections to force refetch and rerender
  const updateCollections = () => {
    let res = getFullCollections(session.session.user.id);
    res.then((res) => setCollections(res));
    setLoading(false);
  };

  const updatePostCollections = () => {
    let res = getFullPostCollections(session.session.user.id);
    res.then((res) => setPostCollections(res));
    setLoading(false);
  };

  // delete collection
  const deleteCollectionFunctional = async (id) => {
    setLoading(true);

    deleteCollectionParent(id).then((res) => updateCollections());
  };

  // delete post collection
  const deletePostCollectionFunctional = async (id) => {
    setLoading(true);

    deletePostCollectionParent(id).then((res) => updatePostCollections());
  };

  // delete article from collection
  const removeFromCollectionFunctional = async (id, title) => {
    setLoading(true);

    //remove from collection
    let res = removeFromCollection(id, title, session.session.user.id);
    res.then((res) => updateCollections());
  };

  // delete post from postCollection
  const removeFromPostCollectionFunctional = async (id, title) => {
    setLoading(true);

    //remove from collection
    let res = removeFromPostCollection(id, title, session.session.user.id);
    res.then((res) => updatePostCollections());
  };

  const createCollection = async (e) => {
    e.preventDefault();
    if (collection === "") {
      toast.error("Please give your collection a name");
      return;
    }
    const { error } = insertCollection(
      session.session.user.id,
      collection
    ).then((res) =>
      getFullCollections(session.session.user.id).then((res) =>
        setCollections(res)
      )
    );

    //setCollections(res)
    if (error) {
      toast.error(`Error:${error}`);
    } else {
      toast.success(`Collection ${collection} added!`);
      setCollection("");
    }
  };

  const createPostCollection = async (e) => {
    e.preventDefault();
    if (postCollection === "") {
      toast.error("Please give your collection a name");
      return;
    }
    const { error } = insertPostCollection(
      session.session.user.id,
      postCollection
    ).then((res) =>
      getFullPostCollections(session.session.user.id).then((res) =>
        setPostCollections(res)
      )
    );

    //setCollections(res)
    if (error) {
      toast.error(`Error:${error}`);
    } else {
      toast.success(`Collection ${collection} added!`);
      setCollection("");
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

  const Focus = () => {
    setShowDropdown(true);
  };

  const dropdownEl3 = useRef();
  const [showDropdown2, setShowDropdown2] = useState(false);
  // Dropdown function
  const handleClickOutside2 = useCallback(
    (e) => {
      if (e === "override") {
        setShowDropdown(false);
        return;
      }

      if (
        showDropdown2 &&
        e.target.closest(".dropdown-holder3") !== dropdownEl3.current
      ) {
        setShowDropdown2(false);
      }
    },
    [showDropdown2, setShowDropdown2, dropdownEl3]
  );
  useEffect(() => {
    document.addEventListener("click", handleClickOutside2);

    return () => {
      document.removeEventListener("click", handleClickOutside2);
    };
  }, [handleClickOutside2]);

  const Focus2 = () => {
    setShowDropdown2(true);
  };

  const deleteNotificationFunctional = (id) => {
    deleteNotification(id);

    setNotifications((prev) => {
      return [...prev.filter((notification) => notification.id !== id)];
    });
  };

  return (
    <Cont colors={COLORS} className="content">
      <Toaster />

      <div className="center-inline mar-bottom-one"></div>

      {session.session === null ? (
        <>
          <div className="shallow-cont ssm-spacer">
            <h3>Have an Account?</h3>

            <p className="mar-bottom-one">Login or sign up below</p>
            <div className="mar-bottom-16 sign-up">
              <Link href={{ pathname: "/signup" }}>
                <DefaultBtn text="Sign Up" />
              </Link>
            </div>
            <div>
              <Link href={{ pathname: "/login" }}>
                {" "}
                <AntiDefaultBtn text="Sign In" />
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="sign-out mar-bottom-one flex flex-wrap flex-end">
            {loading && (
              <div className="center-fixed">
                <div className="lds-circle">
                  <div></div>
                </div>
              </div>
            )}
            {user?.role == "admin" && (
              <Link href={{ pathname: "/adminPanel" }}>
                <div className="save-cont mar-bottom-8 ">
                  <FontAwesomeIcon
                    icon={faGear}
                    className="dark-blue mar-right-8 icon-ssm"
                  />
                  <h6>Admin Panel</h6>
                </div>
              </Link>
            )}

            <Link href={{ pathname: "/editAccount" }}>
              <div className="save-cont mar-left-16 mar-bottom-8">
                <h6>Edit Profile</h6>
              </div>
            </Link>
            <div onClick={signOut} className="mar-left-16 mar-bottom-8">
              <RedBtn text="Sign Out" />
            </div>
          </div>
          <div className="user-profile md-spacer">
            <div className="flex justify-center mar-bottom-one user-title">
              <div className="box-light box-fancy">
                <h3>{session?.session?.user.user_metadata.username}</h3>
              </div>
              <div className="image-cont mar-left-32">
                {user?.avatar_url === "anon" ? (
                  <Image
                    src={"/anon.jpg"}
                    style={{ objectFit: "cover" }}
                    fill
                    size="100%"
                    alt="profile"
                  />
                ) : (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_AVATAR_BASE_URL}${user?.avatar_url}`}
                    style={{ objectFit: "cover" }}
                    fill
                    size="100%"
                    alt="profile"
                  />
                )}
              </div>
            </div>
            <div className="stats-grid">
              <div className="stats-section">
                <h3 className="text-shadow mar-bottom-one">Stats</h3>
                <div
                  style={{ textAlign: "right" }}
                  className="box-light stat-box"
                >
                  <h5 className="black">
                    Posts:{" "}
                    <span className="contrast set-mobile-visible">
                      {user?.post?.length}
                    </span>
                  </h5>
                  <h5 className="black">
                    Collections:{" "}
                    <span className="set-mobile-visible contrast">
                      {user?.articleCollection?.length}
                    </span>
                  </h5>
                  <h5 className="black">
                    Saved Articles:{" "}
                    <span className="set-mobile-visible contrast">
                      {user?.savedArticle?.length}
                    </span>
                  </h5>

                  <h5 className="black">
                    Comments:{" "}
                    <span className="set-mobile-visible contrast">
                      {user?.comments?.length}
                    </span>
                  </h5>
                  <h5 className="black">
                    Article Likes:{" "}
                    <span className="set-mobile-visible contrast">
                      {user?.articleLikes?.length}
                    </span>
                  </h5>

                  <h5 className="black">
                    Created At:{" "}
                    <span className="set-mobile-visible contrast">
                      {user && fetchDaysDiff(session?.session?.user.created_at)}{" "}
                    </span>
                  </h5>
                </div>
                <div className="box-light-inverse stat-box set-mobile-invisible">
                  <h5 className="contrast">{user?.post?.length}</h5>
                  <h5 className="contrast">
                    {user?.articleCollection?.length}
                  </h5>
                  <h5 className="contrast">{user?.savedArticle?.length}</h5>

                  <h5 className="contrast">{user?.comments?.length}</h5>
                  <h5 className="contrast">{user?.articleLikes?.length}</h5>

                  <h5 className="contrast">
                    {user && fetchDaysDiff(session?.session?.user.created_at)}{" "}
                  </h5>
                </div>
              </div>

              <div className="stats-section">
                <h3 className="text-shadow mar-bottom-one">My Posts</h3>
                <Posts posts={user?.post || []} />
              </div>
              <div className="stats-section">
                <div className="flex justify-center mar-bottom-one notification-title">
                  <h3 className="text-shadow mar-right-8 notification-title-text ">
                    Notifications
                  </h3>
                  <div className="hover-circle-sm">
                    <h5 className="red text-shadow-red">
                      {notifications.length}
                    </h5>
                  </div>
                </div>

                <Notifications
                  notifications={notifications}
                  deleteNotificationFunctional={deleteNotificationFunctional}
                />
              </div>
            </div>
          </div>
          <section>
            <div className="center-inline ssm-spacer ">
              <h2 className="text-shadow text-wrap">Saved Articles</h2>
            </div>
            <div>
              <div className="grid ssm-spacer">
                <ArticleCollection
                  collections={collections}
                  deleteCollectionFunctional={deleteCollectionFunctional}
                  removeFromCollectionFunctional={
                    removeFromCollectionFunctional
                  }
                />
              </div>
            </div>

            <div
              className="plus-cont sm-spacer dropdown-holder2"
              ref={dropdownEl2}
              id="dropdown"
              onClick={Focus}
            >
              {showDropdown && (
                <div className="save-popup">
                  <p>Create new collection</p>
                  <form onSubmit={createCollection}>
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
              )}
              <PlusIcon className="icon-misc" />
            </div>
          </section>
          <section>
            <div className="center-inline ssm-spacer ">
              <h2 className="text-shadow text-wrap">Saved Posts</h2>
            </div>
            <div>
              <div className="grid ssm-spacer">
                <PostCollection
                  collections={postCollections}
                  deletePostCollectionFunctional={
                    deletePostCollectionFunctional
                  }
                  removeFromPostCollectionFunctional={
                    removeFromPostCollectionFunctional
                  }
                />
              </div>
            </div>

            <div
              className="plus-cont sm-spacer dropdown-holder3"
              ref={dropdownEl3}
              id="dropdown"
              onClick={Focus2}
            >
              {showDropdown2 && (
                <div className="save-popup">
                  <p>Create new collection</p>
                  <form onSubmit={createPostCollection}>
                    <input
                      style={{ width: "100%", height: "40px" }}
                      type="text"
                      name="collection"
                      id="collection"
                      className="mar-bottom-8"
                      value={postCollection}
                      onChange={(e) => setPostCollection(e.target.value)}
                    />
                    <div className="flex-right">
                      <button className="small-button">
                        <p className="small">Create</p>
                      </button>
                    </div>
                  </form>
                </div>
              )}
              <PlusIcon className="icon-misc" />
            </div>
          </section>
        </>
      )}
    </Cont>
  );
};

export default Account;
