"use client";
import Image from "next/image";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGear, faHeart} from "@fortawesome/free-solid-svg-icons";
import {PlusIcon} from "@heroicons/react/solid";
import SavedCollection from "../../../components/account/SavedCollection";
import {useEffect, useRef, useCallback, useState, useContext} from "react";
/* import { AppContext } from "../layout"; */
import {
    checkLocalStorageValid,
    fetchDaysDiff,
} from "../../../utils/Functions";
import supabase from "../../../utils/supabaseClient";
import toast, {Toaster} from "react-hot-toast";
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
import Guest from "./components/Guest";

const Account = () => {


    return (
        <div className="content">

            {/*<Toaster/>*/}

            {/*<div className="center-inline mar-bottom-one"></div>*/}
            {/*/!** If user is not signed in *!/*/}
            {/*{session.session === null ? (*/}
            {/*    <>*/}
            {/*        <Guest/>*/}
            {/*    </>*/}
            {/*) : (*/}
            {/*    <>*/}
            {/*        <div className="sign-out mar-bottom-one flex flex-wrap flex-end">*/}
            {/*            {loading && (*/}
            {/*                <div className="center-fixed">*/}
            {/*                    <div className="lds-circle">*/}
            {/*                        <div></div>*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            )}*/}
            {/*            {user?.role == "admin" && (*/}
            {/*                <Link href={{pathname: "/adminPanel"}}>*/}
            {/*                    <div className="save-cont mar-bottom-8 ">*/}
            {/*                        <FontAwesomeIcon*/}
            {/*                            icon={faGear}*/}
            {/*                            className="dark-blue mar-right-8 icon-ssm"*/}
            {/*                        />*/}
            {/*                        <h6>Admin Panel</h6>*/}
            {/*                    </div>*/}
            {/*                </Link>*/}
            {/*            )}*/}

            {/*            <Link href={{pathname: "/editAccount"}}>*/}
            {/*                <div className="save-cont mar-left-16 mar-bottom-8">*/}
            {/*                    <h6>Edit Profile</h6>*/}
            {/*                </div>*/}
            {/*            </Link>*/}
            {/*            <div onClick={signOut} className="mar-left-16 mar-bottom-8">*/}
            {/*                <RedBtn text="Sign Out"/>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <div className="user-profile md-spacer">*/}
            {/*            <div className="flex justify-center mar-bottom-one user-title">*/}
            {/*                <div className="box-light box-fancy">*/}
            {/*                    <h3>{session?.session?.user.user_metadata.username}</h3>*/}
            {/*                </div>*/}
            {/*                <div className="image-cont mar-left-32">*/}
            {/*                    {user?.avatar_url === "anon" ? (*/}
            {/*                        <Image*/}
            {/*                            src={"/anon.jpg"}*/}
            {/*                            style={{objectFit: "cover"}}*/}
            {/*                            fill*/}
            {/*                            size="100%"*/}
            {/*                            alt="profile"*/}
            {/*                        />*/}
            {/*                    ) : (*/}
            {/*                        <Image*/}
            {/*                            src={`${process.env.NEXT_PUBLIC_AVATAR_BASE_URL}${user?.avatar_url}`}*/}
            {/*                            style={{objectFit: "cover"}}*/}
            {/*                            fill*/}
            {/*                            size="100%"*/}
            {/*                            alt="profile"*/}
            {/*                        />*/}
            {/*                    )}*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*            <div className="stats-grid">*/}
            {/*                <div className="stats-section">*/}
            {/*                    <h3 className="text-shadow mar-bottom-one">Stats</h3>*/}
            {/*                    <div*/}
            {/*                        style={{textAlign: "right"}}*/}
            {/*                        className="box-light stat-box"*/}
            {/*                    >*/}
            {/*                        <h5 className="black">*/}
            {/*                            Posts:{" "}*/}
            {/*                            <span className="contrast set-mobile-visible">*/}
            {/*          {user?.post?.length}*/}
            {/*        </span>*/}
            {/*                        </h5>*/}
            {/*                        <h5 className="black">*/}
            {/*                            Collections:{" "}*/}
            {/*                            <span className="set-mobile-visible contrast">*/}
            {/*          {user?.articleCollection?.length}*/}
            {/*        </span>*/}
            {/*                        </h5>*/}
            {/*                        <h5 className="black">*/}
            {/*                            Saved Articles:{" "}*/}
            {/*                            <span className="set-mobile-visible contrast">*/}
            {/*          {user?.savedArticle?.length}*/}
            {/*        </span>*/}
            {/*                        </h5>*/}

            {/*                        <h5 className="black">*/}
            {/*                            Comments:{" "}*/}
            {/*                            <span className="set-mobile-visible contrast">*/}
            {/*          {user?.comments?.length}*/}
            {/*        </span>*/}
            {/*                        </h5>*/}
            {/*                        <h5 className="black">*/}
            {/*                            Article Likes:{" "}*/}
            {/*                            <span className="set-mobile-visible contrast">*/}
            {/*          {user?.articleLikes?.length}*/}
            {/*        </span>*/}
            {/*                        </h5>*/}

            {/*                        <h5 className="black">*/}
            {/*                            Created At:{" "}*/}
            {/*                            <span className="set-mobile-visible contrast">*/}
            {/*          {user && fetchDaysDiff(session?.session?.user.created_at)}{" "}*/}
            {/*        </span>*/}
            {/*                        </h5>*/}
            {/*                    </div>*/}
            {/*                    <div className="box-light-inverse stat-box set-mobile-invisible">*/}
            {/*                        <h5 className="contrast">{user?.post?.length}</h5>*/}
            {/*                        <h5 className="contrast">*/}
            {/*                            {user?.articleCollection?.length}*/}
            {/*                        </h5>*/}
            {/*                        <h5 className="contrast">{user?.savedArticle?.length}</h5>*/}

            {/*                        <h5 className="contrast">{user?.comments?.length}</h5>*/}
            {/*                        <h5 className="contrast">{user?.articleLikes?.length}</h5>*/}

            {/*                        <h5 className="contrast">*/}
            {/*                            {user && fetchDaysDiff(session?.session?.user.created_at)}{" "}*/}
            {/*                        </h5>*/}
            {/*                    </div>*/}
            {/*                </div>*/}

            {/*                <div className="stats-section">*/}
            {/*                    <h3 className="text-shadow mar-bottom-one">My Posts</h3>*/}
            {/*                    <Posts posts={user?.post || []}/>*/}
            {/*                </div>*/}
            {/*                <div className="stats-section">*/}
            {/*                    <div className="flex justify-center mar-bottom-one notification-title">*/}
            {/*                        <h3 className="text-shadow mar-right-8 notification-title-text ">*/}
            {/*                            Notifications*/}
            {/*                        </h3>*/}
            {/*                        <div className="hover-circle-sm">*/}
            {/*                            <h5 className="red text-shadow-red">*/}
            {/*                                {notifications.length}*/}
            {/*                            </h5>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}

            {/*                    <Notifications*/}
            {/*                        notifications={notifications}*/}
            {/*                        deleteNotificationFunctional={deleteNotificationFunctional}*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <section>*/}
            {/*            <div className="center-inline ssm-spacer ">*/}
            {/*                <h2 className="text-shadow text-wrap">Saved Articles</h2>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <div className="grid ssm-spacer">*/}
            {/*                    <ArticleCollection*/}
            {/*                        collections={collections}*/}
            {/*                        deleteCollectionFunctional={deleteCollectionFunctional}*/}
            {/*                        removeFromCollectionFunctional={*/}
            {/*                            removeFromCollectionFunctional*/}
            {/*                        }*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div*/}
            {/*                className="plus-cont sm-spacer dropdown-holder2"*/}
            {/*                ref={dropdownEl2}*/}
            {/*                id="dropdown"*/}
            {/*                onClick={Focus}*/}
            {/*            >*/}
            {/*                {showDropdown && (*/}
            {/*                    <div className="save-popup">*/}
            {/*                        <p>Create new collection</p>*/}
            {/*                        <form onSubmit={createCollection}>*/}
            {/*                            <input*/}
            {/*                                style={{width: "100%", height: "40px"}}*/}
            {/*                                type="text"*/}
            {/*                                name="collection"*/}
            {/*                                id="collection"*/}
            {/*                                className="mar-bottom-8"*/}
            {/*                                value={collection}*/}
            {/*                                onChange={(e) => setCollection(e.target.value)}*/}
            {/*                            />*/}
            {/*                            <div className="flex-right">*/}
            {/*                                <button className="small-button">*/}
            {/*                                    <p className="small">Create</p>*/}
            {/*                                </button>*/}
            {/*                            </div>*/}
            {/*                        </form>*/}
            {/*                    </div>*/}
            {/*                )}*/}
            {/*                <PlusIcon className="icon-misc"/>*/}
            {/*            </div>*/}
            {/*        </section>*/}
            {/*        <section>*/}
            {/*            <div className="center-inline ssm-spacer ">*/}
            {/*                <h2 className="text-shadow text-wrap">Saved Posts</h2>*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <div className="grid ssm-spacer">*/}
            {/*                    <PostCollection*/}
            {/*                        collections={postCollections}*/}
            {/*                        deletePostCollectionFunctional={*/}
            {/*                            deletePostCollectionFunctional*/}
            {/*                        }*/}
            {/*                        removeFromPostCollectionFunctional={*/}
            {/*                            removeFromPostCollectionFunctional*/}
            {/*                        }*/}
            {/*                    />*/}
            {/*                </div>*/}
            {/*            </div>*/}

            {/*            <div*/}
            {/*                className="plus-cont sm-spacer dropdown-holder3"*/}
            {/*                ref={dropdownEl3}*/}
            {/*                id="dropdown"*/}
            {/*                onClick={Focus2}*/}
            {/*            >*/}
            {/*                {showDropdown2 && (*/}
            {/*                    <div className="save-popup">*/}
            {/*                        <p>Create new collection</p>*/}
            {/*                        <form onSubmit={createPostCollection}>*/}
            {/*                            <input*/}
            {/*                                style={{width: "100%", height: "40px"}}*/}
            {/*                                type="text"*/}
            {/*                                name="collection"*/}
            {/*                                id="collection"*/}
            {/*                                className="mar-bottom-8"*/}
            {/*                                value={postCollection}*/}
            {/*                                onChange={(e) => setPostCollection(e.target.value)}*/}
            {/*                            />*/}
            {/*                            <div className="flex-right">*/}
            {/*                                <button className="small-button">*/}
            {/*                                    <p className="small">Create</p>*/}
            {/*                                </button>*/}
            {/*                            </div>*/}
            {/*                        </form>*/}
            {/*                    </div>*/}
            {/*                )}*/}
            {/*                <PlusIcon className="icon-misc"/>*/}
            {/*            </div>*/}
            {/*        </section>*/}
            {/*    </>*/}
            {/*)}*/}
        </div>
    );
};

export default Account;
