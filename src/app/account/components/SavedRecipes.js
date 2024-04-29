import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faBookmark} from "@fortawesome/free-solid-svg-icons";
import Popup from "../../../../components/Utility/Popup";


const SavedRecipes = ({
                          selectCategory,
                          categories,
                          recipes,
                          recipesRender,
                      }) => {
    const filterElems = categories.map((category, index) => {
        return (
            <Popup key={index} title={category.name}>
                <div
                    className={
                        category.selected
                            ? "filter-tag filter-tag-selected"
                            : "filter-tag rounded-shadow"
                    }
                    onClick={() => selectCategory(category.name)}
                >
                    <FontAwesomeIcon
                        icon={category.icon}
                        className="dark-blue icon-ssm "
                    />
                </div>
            </Popup>
        );
    });

    const recipeLines = recipesRender.map((recipe, index) => {
        return (
            <Link href={`/recipe/${recipe.name}`} key={index}>
                <div className="line space-between flex align-center ">
                    <div className="flex align-center">
                        <p className="small light-grey mar-right-8">({index + 1})</p>
                        <p>{recipe.name}</p>
                    </div>
                    <FontAwesomeIcon icon={faArrowRight} className="icon-sm light-grey"/>
                </div>
            </Link>
        );
    });

    return (
        <div>
            <div className="header flex space-between">
                <h5>Saved recipes</h5>
                <FontAwesomeIcon icon={faBookmark} className="dark-blue icon-sm"/>
            </div>
            <div className="flex flex-wrap justify-start filter-holder">
                {filterElems}
            </div>
            <div className="black-line"></div>
            <h5 className="padding-8">Results</h5>
            <div className="black-line"></div>
            <div className="recipe-holder">
                {recipeLines}
                {recipeLines.length == 0 && "Nothing saved here..."}
            </div>
        </div>
    );
};

export default SavedRecipes;
