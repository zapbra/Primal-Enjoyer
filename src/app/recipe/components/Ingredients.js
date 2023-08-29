import styled from "styled-components";
import COLORS from "../../../../data/colors";
import Popup from "../../../../components/Utility/Popup";

const Cont = styled.div`
  margin-bottom: 16px;
  li {
    margin-left: 16px;
  }

  .ingredients {
    background-color: #fff;
  }
  .ingredient {
    padding: 8px;
    p:first-of-type {
    }
    border-bottom: 1px solid ${(props) => props.colors.grey};
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
      <div className="mar-left-16 ingredients">
        {food_instances.map((food_instance, index) => {
          return (
            <div className="ingredient flex  align-center" key={index}>
              <div className="flex align-center mar-right-16">
                <p className="light-grey2 small mar-right-8">({index + 1})</p>
                <p className="">{food_instance.food_id.name}</p>
              </div>
              <p className="grey small">({food_instance.quantity})</p>
            </div>
          );
        })}
      </div>
    </Cont>
  );
};

export default Ingredients;
