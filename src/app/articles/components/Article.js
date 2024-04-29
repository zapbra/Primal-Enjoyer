import Link from "next/link";

import {
    faTooth,
    faCannabis,
    faStomach,
    faBacteria,
    faFaceGrinStars,
    faCarrot,
    faBrain,
    faComputer,
    faEye,
    faFaceSadCry,
    faBoxTissue,
    faLungs,
    faBacon,
    faMeat,
    faBed,
    faVirus,
    faCalendar,
    faPeanut,
    faRadiation,
    faDrumstickBite,
    faPlugCircleBolt,
    faWeightScale,
    faMercury,
    faFish,
    faSyringe,
    faDisease,
    faCar,
    faSun,
    faBath,
    faUserInjured,
    faApple,
    faAppleWhole,
    faVial,
    faEgg,
    faHandSparkles,
    faDumbbell,
    faUserDoctor,
    faPersonPregnant,
    faBookSkull,
    faTimeline,
    faBook,
    faShirt,
    faOilCan,
    faBottleDroplet,
    faBone,
    faPills,
    faHouse,
    faBookMedical,
    faGlassWater,
    faCow,
    faSmoking,
    faVials,
    faGem,
    faMartiniGlassEmpty,
    faSeedling,
    faBreadSlice,
    faEarDeaf,
    faDog,
    faPlane,
    faJar,
    faPersonWalking,
    faBoxOpen,
    faFire,
    faLeaf,
    faQuestion,
    faCircleExclamation,
    faUtensils,
    faCookie,
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


const Article = ({article, allArticles, index}) => {
    const catagories = {
        Teeth: faTooth,
        Drugs: faCannabis,
        Digestion: faUtensils,
        Bacteria: faBacteria,
        Skin: faFaceGrinStars,
        "Vegetable Juice": faCarrot,
        Brain: faBrain,
        EMF: faComputer,
        Eyes: faEye,
        Pain: faFaceSadCry,
        Nose: faBoxTissue,
        Liver: faLungs,
        Pork: faBacon,
        Meat: faDrumstickBite,
        Sleep: faBed,
        Virus: faVirus,
        "Eating Schedule": faCalendar,
        "Nuts and Seeds": faSeedling,
        Radiation: faRadiation,
        "High Meat": faDrumstickBite,
        Energy: faPlugCircleBolt,
        "Weight Gain": faWeightScale,
        mercury: faMercury,
        Vaccines: faSyringe,
        Omegas: faFish,
        Parasites: faDisease,
        Utility: faCar,
        Sun: faSun,
        "Hot Baths": faBath,
        "Coconut Cream": faCookie,
        injury: faUserInjured,
        Fruit: faAppleWhole,
        "Organs and Glands": faLungs,
        "Physical Therapy": faUserInjured,
        Urine: faVial,
        Eggs: faEgg,
        Hygiene: faHandSparkles,
        muscle: faDumbbell,
        Surgery: faUserDoctor,
        Pregnancy: faPersonPregnant,
        Corruption: faBookSkull,
        Future: faTimeline,
        fish: faFish,
        Research: faBook,
        Clothing: faShirt,
        "Vegetable Oil": faOilCan,
        Hydration: faBottleDroplet,
        Hormones: faSyringe,
        Joints: faBone,
        Supplements: faPills,
        Household: faHouse,
        detox: faBookMedical,
        "Heavy Metals": faGem,
        Water: faGlassWater,
        "Lymphatic System": faLungs,
        Milk: faCow,
        Childbirth: faPersonPregnant,
        environment: faSeedling,
        Vegetarianism: faCarrot,
        Cancer: faDisease,
        medical: faUserDoctor,
        herbs: faLeaf,
        "Plant Medicine": faLeaf,
        Clay: faGem,
        "cooked food": faFire,
        Preservation: faBoxOpen,
        "Yeasts & Molds": faBacteria,
        Exercise: faPersonWalking,
        Honey: faJar,
        travelling: faPlane,
        grains: faBreadSlice,
        Miscellaneous: faQuestion,
        Aajonus: faCircleExclamation,
        pets: faDog,
        Tribes: faFire,
        "Healthy Lifestyle": faLeaf,
        Livestock: faCow,
        hearing: faEarDeaf,
        holistic: faLeaf,
        lungs: faLungs,
        blood: faVials,
        minerals: faGem,
        fasting: faMartiniGlassEmpty,
    };
    return (
        <Link
            href={{
                pathname: `/article/${article?.title}`,
            }}
            className="visit-link w-60  border-slate-100 border-b-2"
        >
            <div className='h-full flex transition p-2 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-50'>
                {/** Number and icon */}
                <div className="flex align-center mr-4">
                    {" "}
                    <p className=" mr-2">#{index + 1} </p>
                    <div>
                        {article.aajonusCatagory && (
                            <FontAwesomeIcon
                                icon={catagories[article.aajonusCatagory.title]}
                                className=""
                                size="lg"
                            />
                        )}
                    </div>
                </div>
                {/** End of number and icon */}

                {/** Title and year */}
                <div>
                    <h6 className="">{article.title}</h6>
                    <p className="contrast light small">
                        {article.year !== null && `(${article.year})`}
                    </p>
                </div>
                {/** End of title and year */}
            </div>
        </Link>
    );
};

export default Article;
