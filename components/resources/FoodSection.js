import styled from "styled-components";
import COLORS from "../../Data/colors";
import FoodItem from "./FoodItem";

const SectionHeader = styled.div`
  display: flex;
  border-top: 2px solid black;
  border-bottom: 2px solid black;
  .flex-one {
    &:nth-of-type(1) {
      border-right: 1px solid black;
    }
    &:nth-of-type(2) {
      background-color: ${(props) => props.colors.ultraLightBlue};
      border-left: 1px solid black;
    }
  }
`;

const WhiteBg = styled.div`
  padding-top: 2rem;
  border-top: 2px solid black;
  background-color: #fff;
`;

const FoodSection = (props) => {
  const foodItems = props.locations.map((location) => {
    return (
      <FoodItem
        colors={COLORS}
        title={location.title}
        address={location.address}
        website={location.website}
        description={location.description}
        hours={location.hours}
        sublocations={location.subLocations}
      />
    );
  });
  return (
    <WhiteBg>
      <SectionHeader colors={COLORS}>
        <div className="flex-one">
          <h2 className="text-center">{props.city}</h2>
        </div>
        <div className="flex-one"></div>
      </SectionHeader>
      {foodItems}
    </WhiteBg>
  );
};

export default FoodSection;
