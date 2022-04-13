import styled from "styled-components";
import RecentPosts from "./RecentPosts";
import { nanoid } from "nanoid";
const ExploreContainer = styled.div`
  background-color: white;
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  border-radius: 0.5rem;
  padding: 20px;
  width: 100%;
  max-width: 244px;
  @media only screen and (max-width: 1199px) {
    max-width: 100%;
  }
  .main-title {
    width: 90%;
    margin: 0 auto 1rem;
    text-align: center;
    border-bottom: 2px solid ${(props) => props.colors.darkBlue};
  }
`;

const Explore = (props) => {
  return (
    <ExploreContainer colors={props.colors}>
      <div className="main-title">
        <h1>EXPLORE</h1>
      </div>
      <RecentPosts articles={props.articles} colors={props.colors} />
    </ExploreContainer>
  );
};

export default Explore;
