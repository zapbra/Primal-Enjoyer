import {useState} from "react";
import Link from "next/link";
import SavedRecipes from "./SavedRecipes";
import {
    faBowlRice,
    faCarrot,
    faCheese,
    faCookie,
    faDrumstickBite,
    faGlassWater,
    faHandSparkles,
    faPepperHot,
    faSort,
    faWater,
} from "@fortawesome/free-solid-svg-icons";


const Guest = () => {
    const [categories, setCategories] = useState([
        {name: "all", icon: faSort, selected: true},
        {name: "meat meals", icon: faDrumstickBite, selected: false},
        {name: "milkshakes", icon: faGlassWater, selected: false},
        {name: "vegetable juice", icon: faCarrot, selected: false},
        {name: "sauces", icon: faPepperHot, selected: false},
        {name: "soups", icon: faBowlRice, selected: false},
        {name: "deserts", icon: faCookie, selected: false},
        {name: "hygiene", icon: faHandSparkles, selected: false},
        {name: "cheese", icon: faCheese, selected: false},
    ]);


    return (
        <div>
            <div className="shallow-cont ssm-spacer">
                <h3>Have an Account?</h3>

                <p className="mar-bottom-one">Login or sign up below</p>
                <div className="mar-bottom-16 sign-up">
                    <Link href={{pathname: "/signup"}}>
                        {/*<DefaultBtn text="Sign Up"/>*/}
                    </Link>
                </div>
                <div>
                    <Link href={{pathname: "/login"}}>
                        {" "}
                        {/*<AntiDefaultBtn text="Sign In"/>*/}
                    </Link>
                </div>
            </div>
            <SavedRecipes
                categories={categories}
                selectCategory={selectCategory}
                recipes={recipes}
                recipesRender={recipesRender}
            />
            <div className="mar-bottom-32"></div>
        </div>
    );
};

export default Guest;
