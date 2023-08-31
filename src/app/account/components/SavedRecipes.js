import { useEffect, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import COLORS from "../../../../data/colors";
import { getBookmarkedRecipes } from "../../../../utils/Functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faBookmark } from "@fortawesome/free-solid-svg-icons";

const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.darkBlue};
  max-width: 400px;
  .space-between {
    justify-content: space-between !important;
  }
  .header {
    padding: 16px;
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};
  }
  .recipe-holder {
    background-color: #fff;
  }
  .line {
    padding: 8px;
    border-bottom: 1px solid ${(props) => props.colors.grey};
    justify-content: space-between;
    cursor: pointer;
    transition: background-color 0.25s ease;
    &:hover {
      background-color: ${(props) => props.colors.lightGrey};
    }
  }
`;

const SavedRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(getBookmarkedRecipes());
  }, []);
  console.log("recipes");
  console.log(recipes);

  const recipeLines = recipes.map((recipe, index) => {
    return (
      <Link href={`/recipe/${recipe}`} key={index}>
        <div className="line space-between flex align-center ">
          <div className="flex align-center">
            <p className="small contrast mar-right-8">({index + 1})</p>
            <p>{recipe}</p>
          </div>
          <FontAwesomeIcon icon={faArrowRight} className="icon-sm contrast" />
        </div>
      </Link>
    );
  });
  return (
    <Cont colors={COLORS} className="roundedS-shadow">
      <div className="header flex space-between">
        <h5>Saved recipes</h5>
        <FontAwesomeIcon icon={faBookmark} className="dark-blue icon-sm" />
      </div>
      <div className="recipe-holder">{recipeLines}</div>
    </Cont>
  );
};

export default SavedRecipes;
