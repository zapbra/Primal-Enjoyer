"use client";

import React, {useState, useEffect, use} from "react";

import Results from "./components/Results";
import {
    faDrumstickBite,
    faGlassWater,
    faCarrot,
    faCookie,
    faCheese,
    faHandSparkles,
    faBowlFood,
    faPepperHot,
    faFilter,
} from "@fortawesome/free-solid-svg-icons";
import {IoIosSearch} from "react-icons/io";


const Render = ({recipesFetch, firstRecipes, recipesCache, allRecipes}) => {
    const [firstRender, setFirstRender] = useState(true);

    const [categories, setCategories] = useState([
        {name: "all", icon: faFilter, selected: false},
        {name: "meat meals", icon: faDrumstickBite, selected: false},
        {name: "milkshakes", icon: faGlassWater, selected: false},
        {name: "vegetable juice", icon: faCarrot, selected: false},
        {name: "sauces", icon: faPepperHot, selected: false},
        {name: "soups", icon: faBowlFood, selected: false},
        {name: "deserts", icon: faCookie, selected: false},
        {name: "hygiene", icon: faHandSparkles, selected: false},
        {name: "cheese", icon: faCheese, selected: false},
    ]);
    // text for articles bar
    const [text, setText] = useState("");

    const [recipes, setRecipes] = useState(recipesFetch);
    const [recipesRender, setRecipesRender] = useState(firstRecipes);

    const updateText = () => {
        let textLower = text.toLowerCase();
        let textArr = textLower.split(" ");

        let recipeList;
        let category = categories.find((category) => category.selected == true);

        // check to see which categories need to be filtered or if all do
        if (category != undefined) {
            // set recipesList to all of category if text is empty
            recipeList = recipesFetch.find(
                (recipeObj) => recipeObj.name == category.name
            ).aaj_recipes;
        } else {
            // set to all recipes if text and category is empty
            recipeList = allRecipes;
        }

        // iterates over each title and ingredient to see if it contain any of the articles terms
        // it is more likely to find the more articles terms. This might need to be the reverse..l.
        setRecipesRender((prev) => {
            const newRecipes = recipeList.filter((recipe) => {
                let returnState = false;
                // check if title contains any of the articles terms
                if (textArr.some((text) => recipe.name.toLowerCase().includes(text))) {
                    return true;

                    // check if ingredients contain any of the articles terms
                } else if (
                    recipe.food_instances.some((instance) => {
                        return textArr.some((text) =>
                            instance.food_id.name.toLowerCase().includes(text)
                        );
                    })
                ) {
                    returnState = true;
                }
                return returnState;
            });
            return newRecipes;
        });
    };

    useEffect(() => {
        if (!firstRender) {
            const delayType = setTimeout(() => {
                updateText();
            }, 500);
            return () => clearTimeout(delayType);
        } else {
            setFirstRender(false);
        }
    }, [text]);

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

    const [selectedCategory, setSelectedCategory] = useState("");

    const [unselectedCategories, setUnselectedCategories] = useState([
        "weight gain",
        "weight loss",
        "red meat",
        "white meat",
    ]);

    // once a category is selected, re-render recipes based on that
    const selectCategory = (name) => {
        setCategories((prev) => {
            return prev.map((category) => {
                if (category.name == name) {
                    // if selected category, check to see if already selected and unselect and set name to all to render all
                    if (category.selected) {
                        category.selected = false;
                        name = "all";
                    } else {
                        category.selected = true;
                    }
                } else {
                    category.selected = false;
                }
                return category;
            });
        });
        let recipesFilter;
        if (name == "all") {
            const recipesMatch = recipes.map((recipe) => {
                return recipe.aaj_recipes;
            });
            recipesFilter = [...recipesMatch.flat(1)];
        } else {
            const recipesMatch = recipes.find((recipe) => {
                return recipe.name == name;
            });
            recipesFilter = recipesMatch.aaj_recipes;
        }
        // set recipes render based on articles text
        if (text.length == 0) {
            // if text is empty
            setRecipesRender(recipesFilter);
        } else {
            let textLower = text.toLowerCase();
            let textArr = textLower.split(" ");
            // filter by articles terms
            setRecipesRender((prev) => {
                const newRecipes = recipesFilter.filter((recipe) => {
                    let returnState = false;
                    // check if title contains any of the articles terms
                    if (
                        textArr.some((text) => recipe.name.toLowerCase().includes(text))
                    ) {
                        return true;

                        // check if ingredients contain any of the articles terms
                    } else if (
                        recipe.food_instances.some((instance) => {
                            return textArr.some((text) =>
                                instance.food_id.name.toLowerCase().includes(text)
                            );
                        })
                    ) {
                        returnState = true;
                    }
                    return returnState;
                });
                return newRecipes;
            });
        }
    };

    const removeTag = (name) => {
        setSelectedTags((prev) => {
            prev = prev.filter((tag) => tag != name);
            return prev;
        });

        setUnselectedTags((prev) => {
            return [...prev, name];
        });
    };

    return (
        <div className='py-16'>
            <div className='max-w-7xl mx-auto'>
                <h1 className="res-heading-xl text-center mb-2">
                    Recipes
                </h1>
                <h5 className="res-heading-base text-center mb-6">
                    Search for your favorite primal recipes
                </h5>
                {/** Search bar */}
                <label className="input input-bordered flex items-center gap-2 py-8 px-4 max-w-96 mx-auto mb-4">

                    <input value={text} onChange={(e) => setText(e.target.value)} type="text" className="grow min-w-5"
                           placeholder="beef... egg... cream"/>
                    <button
                        className="transition bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        <IoIosSearch
                            className='text-2xl'
                        />
                    </button>
                </label>
                {/** End of search bar */}

                <Results
                    recipesRender={recipesRender}
                    categories={categories}
                    setCategories={setCategories}
                    selectCategory={selectCategory}
                    text={text}
                />

            </div>

        </div>
    );
};

export default Render;
