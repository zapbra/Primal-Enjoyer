import styled from "styled-components";
import Link from "next/link";
import COLORS from "../../../../data/colors";

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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ArticleElem = styled.div`
  background-color: #fff;
  border: 1px solid ${(props) => props.colors.grey};

  width: 236px;

  h6 {
    color: #000;
  }

  align-items: center;
  padding: 8px;

  overflow: hidden;
  @media only screen and (max-width: 630px) {
    width: 100%;
    .lrg-icon {
      width: 32px;
      height: 32px;
    }
    .icon-cont {
      width: 32px !important;
      height: 32px !important;
    }
  }
  @media only screen and (max-width: 400px) {
    h5 {
      font-size: 18px;
    }
  }
  &:hover {
    h5,
    h6 {
      text-decoration: underline;
    }
    .icon-cont {
      background-color: ${(props) => props.colors.darkBlue};
    }
    .lrg-icon {
      color: ${(props) => props.colors.green};
    }
  }
  .icon-cont {
    transition: background-color 0.25s ease;
    background-color: ${(props) => props.colors.green};
    width: 40px;
    height: 40px;
    flex-shrink: 0;
    border-radius: 46px;
    .lrg-icon {
      transition: color 0.25s ease;
    }
    margin-left: 8px;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const Icon = styled.div`
  margin-right: 16px;
  border: 1px solid ${(props) => props.colors.darkBlue};
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Article = ({ article, allArticles, index }) => {
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
      className="visit-link"
    >
      <Flex>
        <div className="flex align-center">
          {" "}
          <p className="contrast small mar-right-8">#{index + 1} </p>
          <Icon colors={COLORS}>
            {article.aajonusCatagory && (
              <FontAwesomeIcon
                icon={catagories[article.aajonusCatagory.title]}
                className="icon-blue"
                size="lg"
              />
            )}
          </Icon>
        </div>
        <ArticleElem colors={COLORS}>
          <h6 className="inline">{article.title}</h6>
          <p className="contrast light small">
            {article.year !== null && `(${article.year})`}
          </p>
        </ArticleElem>
      </Flex>
    </Link>
  );
};

export default Article;
