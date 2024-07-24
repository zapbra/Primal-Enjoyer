"use client"
import dynamic from "next/dynamic";

const ReactJkMusicPlayer = dynamic(() => import('react-jinke-music-player'), {
    ssr: false,
})
const MusicPlayer = ({article}) => {
    return (
        <ReactJkMusicPlayer defaultPosition={{right: 32, bottom: 32}} autoPlay={false}
                            audio
                            audioLists={[{musicSrc: article.audio.url}]}/>
    )
};

export default MusicPlayer;