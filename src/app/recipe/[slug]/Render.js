import Link from "next/link";
import Ingredients from "../components/Ingredients";
import Instructions from "../components/Instructions";
import {IoIosArrowBack} from "react-icons/io";
// import {IoBookmark, IoBookmarkOutline} from "react-icons/io5";

const Render = ({recipe}) => {


    // const recipeElems = recipe_joins.map((recipe, index) => {
    //     return (
    //         <Link key={index} href={`/recipe/${recipe.sub_recipe_id.name}`}>
    //             <p className="link--secondary">
    //                 {recipe.sub_recipe_id.name}
    //             </p>
    //         </Link>
    //     );
    // });

    const iconElems =
        recipe.food_instances.map((food_instance, index) => {
            return (

                <img
                    key={index}
                    src={`/icons${food_instance.food_id.icon}`}
                    width='48'
                    height='48'
                />
            );
        });

    return (
        <div>
            <div className="mx-auto max-w-2xl py-8">
                {/** Back to recipes link */}
                <Link href={'/recipes'} className=' res-text-base cursor-pointer'>

                    <div className="inline-flex items-center hover:text-blue-500 mb-4">
                        <IoIosArrowBack
                            className='text-xl'
                        />
                        <p className='link'>
                            Back to
                            recipes
                        </p>
                    </div>
                </Link>
                {/** End of back to recipes link */}


                <div className="bg-white border border-slate-300 px-4 py-2 rounded">
                    <div className="recipe-holder mar-bottom-64 padding-16 rounded-shadow">
                        {/** Title */}
                        <div className="flex flex-wrap items-center justify-between mb-4">
                            <h1 className="mb-4 res-heading-base">{recipe.name}</h1>
                        </div>
                        {/** End of title */}

                        <div className="grey-line mar-bottom-8"></div>
                        {/** Image */}
                        <img
                            src={
                                recipe.url != null ? recipe.url : "/No_image_available.svg.png"
                            }
                            className='rounded mb-4'
                        />
                        {/** End of image */}

                        {/** Icons */}
                        <div className="flex flex-wrap gap-4 items-center justify-around mb-4">
                            {iconElems}
                        </div>
                        {/** End of icons */}

                        <Ingredients
                            servings={recipe.servings}
                            food_instances={recipe.food_instances}
                        />

                        <Instructions instructions={recipe.instructions}/>
                        {/*<h5 className="mb-2 font-bold">Included Recipes</h5>*/}
                        {/*<div className="grey-line mar-bottom-16"></div>*/}
                        {/*<div className="flex flex-wrap">{recipeElems}</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Render;
