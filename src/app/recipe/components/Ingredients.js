import styled from "styled-components";
import COLORS from "../../../../data/colors";
import Popup from "../../../../components/Utility/Popup";

const Cont = styled.div`
  margin-bottom: 16px;
  li {
    margin-left: 16px;
  }
`;

const Ingredients = ({ food_instances }) => {
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
        {food_instances.map((food_instance, index) => {
          return (
            <li key={index}>
              {food_instance.food_id.name} <i>({food_instance.quantity})</i>
            </li>
          );
        })}
      </ul>
    </Cont>
  );
};

export default Ingredients;
