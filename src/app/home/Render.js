"use client";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import supabase from "../../../utils/supabaseClient";
import Introduction from "../../../components/introduction";

const Container = styled.div`
  display: grid;
  grid-template-areas: "left left left right";
  gap: 2rem;
  margin-left: 5%;
  margin-right: -5%;
  width: 100%;
  @media only screen and (max-width: 1199px) {
    grid-template-areas:
      "right right right right"
      "left left left left";
    margin: 2%;
  }
  @media only screen and (max-width: 991x) {
    margin: 0;
  }
`;
const Left = styled.div`
  grid-area: left;
`;

const Right = styled.div`
  grid-area: right;
`;

const YOUTUBE_PLAYLIST_ITEMS_API =
  "https://www.googleapis.com/youtube/v3/playlistItems";

export default function Home({ data }) {
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
      const { data, error } = await supabase.auth.getSession();

      setUser(data.session);
    };
    getSession();
  }, []);

  return (
    <main>
      <Introduction
        data={data}
        colors={COLORS}
        files={fileNames.map((file) => {
          return {
            name: file,
            files: [],
          };
        })}
        user={user}
      />
    </main>
  );
}
