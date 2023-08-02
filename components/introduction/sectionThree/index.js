import React from "react";
import styled from "styled-components";
import Line from "./line";
import { nanoid } from "nanoid";
import COLORS from "../../../data/colors";

const Container = styled.div`
  padding: 0 3rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Index = ({ data }) => {
  const items = [
    {
      title: "Cooking Destroys Nutrients",
      index: 1,
      image: "/introduction/fire.jpg",
      paragraphs: [
        "The logic behind it is when you cook foods the enzymes, proteins, fats, and nutrients are damaged or destroyed.",
        "Advanced glycation end products are formed in the cooking process, which lead to rapid aging of the body. Additionally, a high carbohydrate diet of fruit or especially grains leads to a buildup of AGES (advanced glycation end-products) in the process of using sugar for energy. ",
      ],
    },
    {
      title: "Beneficial Bacteria",
      index: 2,
      image: "/introduction/bacteria.jpg",
      paragraphs: [
        "Raw uncooked meats, dairy, and eggs are also much higher in beneficial bacteria to help your cells function and feed the bacteria in your body. An extra benefit of this “good” bacteria is that it will make you feel much happier because you are feeding your body what it needs. ",
      ],
    },
    {
      title: "Natural Human Diet",
      index: 3,
      image: "/introduction/tribes.jpg",
      paragraphs: [
        "Humans originated on raw meat many “hundreds of thouands” of years ago and no other animal eats cooked foods except humans. No tribes living on their natural diet experience chronic illness whatsoever, even tribes who eat cooked meat live without serious disease. They may get a little arthritis or muscle degeneration in old age and not function as well, but they do not experience severe disease seen in modern society. ",
        "1/2 males and 1/3 women will get cancer in their lifetime, do you want to take those chances on the standard american diet?",
      ],
    },
    {
      title: "Macronutrients",
      index: 4,
      image: "/introduction/macronutrients.jpg",
      paragraphs: [
        "By eating proteins, and fats in their raw state, you can preserve the nutrients. By eating a diet of 15-20% protein, 75-80%fat, an 5% carbohydrates you will reduce the production of advanced glycation end products. The body can handle 12% carbohydates without forming advanced glycation end products.",
        "Raw protein from meats to build the body, raw fats to detox the poisons and to use as energy, and sugars from fruit/honey/milk to help use the fat for fuel, aid in detox and help digest the proteins.",
      ],
    },
  ];
  const lines = items.map((item) => {
    return (
      <Line
        title={item.title}
        index={item.index}
        image={item.image}
        paragraphs={item.paragraphs}
        key={nanoid()}
      />
    );
  });

  return <Container>{lines}</Container>;
};

export default Index;
