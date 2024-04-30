import Render from "./home/Render";
import Head from "next/head";
import supabase from "../../utils/supabaseClient";

const YOUTUBE_PLAYLIST_ITEMS_API =
    "https://www.googleapis.com/youtube/v3/playlistItems";

export async function fetchData() {
    const res = await fetch(
        `${YOUTUBE_PLAYLIST_ITEMS_API}?part=snippet&playlistId=PLA4-m0Jyxx3mHBv5fxOwmyWYton1z_4qk&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`
    );
    const data = await res.json();


    return {
        props: {
            data,
        },
    };
}


const Page = async () => {
    const data = await fetchData();
    let ytData = data.props.data;

    return (

        <Render data={ytData}></Render>
    );
};

export default Page;
