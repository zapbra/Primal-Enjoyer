import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../../data/colors";
import Topic from "./Topic";

const Cont = styled.div``;

const Topics = ({ topics }) => {
  const [topicElems, setTopicElems] = useState(
    topics.map((topic, index) => {
      return (
        <Topic
          key={index}
          title={topic.title}
          content={topic.content}
          views={topic.views}
          url={topic.url}
        />
      );
    })
  );
  return <Cont colors={COLORS}>{topicElems}</Cont>;
};

export default Topics;
