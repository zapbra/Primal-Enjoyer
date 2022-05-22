import styled from 'styled-components';
import RelatedArticles from "../Functions/index";
import Slider from "../components/audio/Slider";
import { useState, useRef } from "react";
import ControlPanel from "../components/audio/ControlPanel";

const 
const Testing = () => {
  const [percentage, setPercentage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef();

  const onChange = (e) => {
    const audio = audioRef.current;
    audio.currentTime = (audio.duration / 100) * e.target.value;
    setPercentage(e.target.value);
  };

  const getCurrDuration = (e) => {
    const percent = (
      (e.currentTarget.currentTime / e.currentTarget.duration) *
      100
    ).toFixed(2);
    const time = e.currentTarget.currentTime;

    setPercentage(+percent);
    setCurrentTime(time.toFixed(2));
  };

  const play = () => {
    const audio = audioRef.current;

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
    <SliderCont>
      <Slider onChange={onChange} percentage={percentage} />
      <audio
        ref={audioRef}
        src="/Ionizers.mp3"
        onLoadedData={(e) => {}}
        onTimeUpdate={getCurrDuration}
      ></audio>

      <ControlPanel
        play={play}
        isPlaying={isPlaying}
        duration={duration}
        currentTime={currentTime}
      />
    </SliderCont>
  );
};

export default Testing;
