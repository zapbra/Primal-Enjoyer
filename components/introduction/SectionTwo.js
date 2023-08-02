import Image from "next/image";
import React from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";

const Container = styled.div`
  background-color: ${(props) => props.colors.ultraLightBlue};
  padding: 3rem;
  .flex-cont {
    display: flex;
    gap: 2rem;
    padding-top: 4rem;
    padding-bottom: 4rem;
    h2 {
      color: black;
    }
    @media only screen and (max-width: 800px) {
      flex-direction: column;
    }
  }
  .flex-one {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .image {
    max-width: 600px;
    width: 100%;
    height: 100%;
    position: relative;
    min-height: 200px;
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
    <Container colors={COLORS} className="section">
      <div className="flex-cont">
        <div className="flex-one">
          <div className="text">
            <h2>What Is The Primal Diet?</h2>
            <p className="contrast">
              It is a diet completely consisting of raw meat (beef, chicken,
              pork, fish, lamb; any animal you can imagine), raw dairy, eggs and
              vegetable juices.{" "}
            </p>
          </div>
        </div>
        <div className="flex-one">
          <div className="image">
            <Image
              src="/introduction/tartar.jpg"
              alt="Steak Tartare"
              fill
              style={{ objectFit: "cover" }}
              quality="100"
            />
          </div>
        </div>
      </div>
      {/*End of flex cont */}
    </Container>
  );
};

export default SectionTwo;
