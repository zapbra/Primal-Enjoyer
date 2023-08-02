"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import styled from "styled-components";
import SubmitBtn from "../../../components/Buttons/SubmitBtn";
import RedirectBlueLg from "../../../components/Buttons/RedirectBlueLg";
import RecentPosts from "./components/RecentPosts/index.js";
import COLORS from "../../../data/colors";
import DefaultBtn from "../../../components/Buttons/AntiDefaultBtn";
import AntiDefaultBtn from "../../../components/Buttons/AntiDefaultBtn";
import Sidebar from "./components/Sidebar";

const Cont = styled.div`
  min-height: 100vh;
  background: #fff;
  padding-top: 70px;
  position: relative;

  .post {
    position: relative;

    background: #fff;
    padding-top: 32px;
    transition: left 0.5s ease;
  }
`;

const Render = ({ sortedPosts }) => {
  const [session, setSession] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    const getSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        setSession(data.session);
      } catch (error) {}
    };
    getSession();
  }, []);

  return (
    <Cont colors={COLORS}>
      <Sidebar sidebarVisible={sidebarVisible} toggleSidebar={toggleSidebar} />
      <div className="post">
        <div className="">
          <div className="center-inline">
            <h1 className="ssm-spacer text-shadow">View and Post Articles</h1>
            {session === null ? (
              <>
                <RedirectBlueLg link="/viewall" text="View all posts" />
                <div className="mar-bottom-one"></div>
                <h3 className="black light mar-bottom-16">
                  Sign in to post an article!
                </h3>
                <Link href={{ pathname: "/login" }}>
                  <DefaultBtn text="Sign In" />
                </Link>
                <div className="mar-bottom-one"></div>
                <h3 className="black light mar-bottom-16">
                  Don't have an account?
                </h3>
                <p className="mar-bottom-16">
                  Sign up securely with third party authentication
                </p>
                <Link href={{ pathname: "/signup" }}>
                  <AntiDefaultBtn text="Sign Up" />
                </Link>
              </>
            ) : (
              <>
                <RedirectBlueLg link="/viewall" text="View all posts" />
                <div className="mar-bottom-one"></div>
                <SubmitBtn text="Create Post" link="/createPost" />
              </>
            )}
            <div className="ssm-spacer"></div>
            <div className="line-span ssm-spacer"></div>
          </div>
        </div>
      </div>
      <div className="center-inline mar-bottom-32">
        <h2 className="text-shadow">Recent Posts</h2>
      </div>
      <RecentPosts posts={sortedPosts} />
    </Cont>
  );
};

export default Render;
