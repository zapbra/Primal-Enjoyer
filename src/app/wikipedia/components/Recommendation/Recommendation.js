import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../../../data/colors";
import Filter from "./Filter";
import Topics from "./Topics";

const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  padding: 16px;
`;

const Recommendation = () => {
  const [tags, setTags] = useState([
    { name: "Popular", selected: true },
    { name: "Recent", selected: false },
  ]);

  const updateTag = (name) => {
    setTags((prevTags) => {
      prevTags = prevTags.map((tag) => {
        return {
          ...tag,
          selected: tag.name == name,
        };
      });
      return prevTags;
    });
  };

  const [topics, setTopics] = useState([
    {
      title: "Exercising",
      content: "lorem ipsum forum gi tet dfe geth yurit for um mm yeah",
      views: 372,
      url: "/filler_images/1.jpg",
    },
    {
      title: "Exercising",
      content: "lorem ipsum forum gi tet dfe geth yurit for um mm yeah",
      views: 372,
      url: "/filler_images/1.jpg",
    },
    {
      title: "Exercising",
      content: "lorem ipsum forum gi tet dfe geth yurit for um mm yeah",
      views: 372,
      url: "/filler_images/1.jpg",
    },
  ]);
  return (
    <Cont colors={COLORS}>
      <h5 className="mar-bottom-4">Recommended</h5>
      <div className="lt-grey-line mar-bottom-16"></div>
      <Filter tags={tags} setTags={setTags} updateTag={updateTag} />
      <div className="mar-bottom-32"></div>
      <Topics topics={topics} />
    </Cont>
  );
};

export default Recommendation;
