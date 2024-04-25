"use client";

import Link from "next/link";
import {useState, useEffect} from "react";
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

const Render = ({sortedPosts}) => {
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
                const {data, error} = await supabase.auth.getSession();
                if (error) throw error;
                setSession(data.session);
            } catch (error) {
            }
        };
        getSession();
    }, []);

    console.log("posts");
    console.log(sortedPosts);

    return (
        <div className='bg-white py-16'>
            <div className='mx-auto max-w-7xl px-4' colors={COLORS}>
                <h1 className="res-heading-2xl font-bold mb-8">
                    BLOG
                </h1>
                <RecentPosts posts={sortedPosts}/>
            </div>
        </div>
    );
};

export default Render;
