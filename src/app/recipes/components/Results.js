import FilterBar from "./FilterBar";
import Recipe from "./Recipe";


const Results = ({
                     recipesRender,
                     categories,
                     setCategories,
                     selectCategory,
                     text,
                 }) => {
    const recipeElems = recipesRender.map((recipe, index) => {
        return (
            <Recipe
                key={index}
                text={text}
                name={recipe.name}
                briefDescription={recipe.briefDescription}
                ingredients={recipe.food_instances}
                category={recipe.aaj_recipe_category.name}
                url={recipe.url}
            />
        );
    });

    return (
        <div className=''>
            <div className="mx-auto max-w-7xl">

                <FilterBar
                    selectCategory={selectCategory}
                    categories={categories}
                    setCategories={setCategories}
                />
                <div className="mar-bottom-32"></div>
                <div className="flex flex-wrap gap-4 justify-around ">{recipeElems}</div>
                {recipeElems.length == 0 && (
                    <div className="padding-16">
                        <p>No results... try another search.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Results;
