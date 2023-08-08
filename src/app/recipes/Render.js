"use client";

import { useState, useEffect } from "react";
import COLORS from "../../../data/colors";
import styled from "styled-components";
import SearchBar from "./components/SearchBar";
import Tags from "./components/Tags";
import Categories from "./components/Categories";
import Recipe from "./components/Recipe";

const Cont = styled.div`
  min-height: 100vh;
  background-color: #fff;
  padding-top: 120px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Render = () => {
  const [text, setText] = useState("");

  // update text on change
  const updateText = (e) => {
    setText(e.target.value);
  };

  const [tags, setTags] = useState([
    "cilantro",
    "butter",
    "milk",
    "eggs",
    "chicken",
    "honey",
    "celery",
    "avocado",
    "cream",
    "fish",
    "cheese",
    "beef",
  ]);

  const [selectedTags, setSelectedTags] = useState(["beef"]);
  const [unselectedTags, setUnselectedTags] = useState([
    "cilantro",
    "butter",
    "milk",
    "eggs",
    "chicken",
    "honey",
    "celery",
    "avocado",
    "cream",
    "fish",
    "cheese",
  ]);

  const [categories, setCategories] = useState([
    "hydration",
    "weight gain",
    "weight loss",
    "red meat",
    "white meat",
  ]);

  const [selectedCategories, setSelectedCategories] = useState(["hydration"]);

  const [unselectedCategories, setUnselectedCategories] = useState([
    "weight gain",
    "weight loss",
    "red meat",
    "white meat",
  ]);
  const removeTag = (name) => {
    setSelectedTags((prev) => {
      prev = prev.filter((tag) => tag != name);
      return prev;
    });

    setUnselectedTags((prev) => {
      return [...prev, name];
    });
  };

  const removeCategory = (name) => {};
  return (
    <Cont colors={COLORS}>
      <Categories
        unselectedCategories={unselectedCategories}
        selectedCategories={selectedCategories}
        removeCategory={removeCategory}
      />
      <div className="padding-16">
        <SearchBar text={text} updateText={updateText} />
        <Recipe
          name="Cheesecake"
          categories={["hydration", "weight gain"]}
          ingredients={["butter", "cheese", "honey", "pecans", "strawberries"]}
          briefDescription={
            "This recipe is a desert tha can be made very quickly and is calorie dense."
          }
        />
      </div>
      <Tags
        removeTag={removeTag}
        selectedTags={selectedTags}
        unselectedTags={unselectedTags}
      />
    </Cont>
  );
};

export default Render;
