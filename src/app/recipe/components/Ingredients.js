import styled from "styled-components";
import COLORS from "../../../../data/colors";
import Popup from "../../../../components/Utility/Popup";

const Cont = styled.div`
  margin-bottom: 16px;
`;

const Ingredients = ({ ingredients }) => {
  return (
    <Cont colors={COLORS}>
      <h5 className="mar-bottom-4">
        Ingredients{" "}
        <span>
          <p className="contrast">servings (4)</p>
        </span>
      </h5>
      <div className="grey-line mar-bottom-16"></div>
      <ul className="mar-left-8">
        {ingredients.map((ingredient, index) => {
          return <li key={index}>{ingredient.name} </li>;
        })}
      </ul>
    </Cont>
  );
};

export default Ingredients;
