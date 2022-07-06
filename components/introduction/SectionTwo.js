import React from "react";
import COLORS from "../../Data/colors";
import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.colors.ultraLightBlue};

  .flex-cont {
    display: flex;
    gap: 2rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
    h2 {
      color: black;
    }
  }
  .flex-one {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image {
    max-width: 600px;

    img {
      width: 100%;
    }
  }
  .text {
    max-width: 600px;
    h2 {
      margin-bottom: 2rem;
    }
  }
`;
const SectionTwo = () => {
  return (
    <Container colors={COLORS}>
      <div className="flex-cont">
        <div className="flex-one">
          <div className="text">
            <h2>What Is The Primal Diet?</h2>
            <p>
              It is a diet completely consisting of raw meat (beef, chicken,
              pork), raw dairy, eggs and vegetable juices.{" "}
            </p>
          </div>
        </div>
        <div className="flex-one">
          <div className="image">
            <img src="/introduction/tartar.jpg" alt="Steak Tartar" />
          </div>
        </div>
      </div>
      {/*End of flex cont */}
    </Container>
  );
};

export default SectionTwo;
