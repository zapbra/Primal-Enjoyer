import styled from 'styled-components';

const ExploreContainer = styled.div`
  .main-title {
    width: 90%;
    margin: 0 auto 3rem;
    text-align: center;
    border-bottom: 2px solid ${(props) => props.colors.darkBlue};
  }
`;

const Explore = (props) => {
  return (
    <ExploreContainer colors = {props.colors}>
      <div className = 'main-title'>
        <h1>EXPLORE</h1>
      </div>
    </ExploreContainer>
  )
}

export default Explore