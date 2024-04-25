"use client";
import Head from "next/head";
import React, {useState, useEffect} from "react";
import Image from 'next/image';
import styled from "styled-components";
import COLORS from "../../../data/colors";
import supabase from "../../../utils/supabaseClient";
import Introduction from "../../../components/introduction";
import bg from '../../../public/images/homepage/homepage_hero_image_nature_1920.jpg';
import zIndex from "@mui/material/styles/zIndex";
import Explore from '../../../components/introduction/Explore/index.js';
import About from "../../../components/About";

const YOUTUBE_PLAYLIST_ITEMS_API =
    "https://www.googleapis.com/youtube/v3/playlistItems";


export default function Home({data, recipesFetch}) {
    const [user, setUser] = useState(null);

    const fileNames = [
        "OMAHA 22.08.2011 t",
        "SAN DIEGO 02.01.2011 t",
        "SAN DIEGO 02.05.2004 t",
        "San Diego 07.05.2006 t",
        "SAN DIEGO 08.07.2001 t",
    ];


    useEffect(() => {
        const getSession = async () => {
            const {data, error} = await supabase.auth.getSession();

            setUser(data.session);
        };
        getSession();
    }, []);


    return (
        <div>

            <main style={{backgroundImage: `url(${bg.src})`, width: "100%", height: "90vh"}}
                  className=' md:p-8 px-2 py-4 relative bg-cover bg-no-repeat'>
                <div style={{zIndex: "1"}} className={'relative mx-auto max-w-4xl '}>
                    <h1 className="res-heading-2xl mb-8">Primal Enjoyer.com</h1>

                    <h3 className="res-heading-base mb-4">Discover the truth of a healthy diet by eating natural raw
                        foods</h3>

                    <h3 className="res-heading-base mb-8"><b>Feel</b> your best, <b>look</b> your best
                        and <b>age</b> your
                        best
                    </h3>

                    <label className="input input-bordered flex items-center gap-2 py-8 px-4">
                        <input type="text" className="grow min-w-5" placeholder="Search the Aajonus database..."/>
                        <button
                            className="transition bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search
                        </button>
                    </label>
                </div>
                <div className="absolute opacity-50 bg-light h-full w-full left-0 top-0" style={{zIndex: "0"}}></div>

            </main>
            <Explore/>

            <About
            />

        </div>

    );
}
