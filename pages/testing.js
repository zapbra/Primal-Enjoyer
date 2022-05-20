import RelatedArticles from "../Functions/index";
import Audio from "../components/Audio";
import { useState, useRef } from "react";

const Testing = () => {
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef();

  const onChange = (e) => {
    setPercentage(e.target.value);
  };

  const play = () => {
    const audio = audioRef.current;
    audio.volume = 0.1;

    if (!isPlaying) {
      setIsPlaying(true);
      audio.play();
    }

    if (isPlaying) {
      setIsPlaying(false);
      audio.pause();
    }
  };

  return (
    <>
      <Audio onChange={onChange} percentage={percentage} />
      <audio ref={audioRef} src="/Ionizers.mp3" controls></audio>
      <button onClick={play}>Play</button>
    </>
  );
};

export default Testing;
