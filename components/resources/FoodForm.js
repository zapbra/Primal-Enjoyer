import styled from "styled-components";

const Container = styled.div`
  background-color: ${(props) => props.colors.ultraLightBlue};
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  border-radius: 0.5rem;
  span {
    font-weight: 500;
  }
  textarea {
    background: #fff;
    border: 1px solid #fff;
  }
  input {
    width: 175px;
  }
  .title-unique {
    border-bottom: 2px solid black;
    text-align: center;
    h2 {
      margin-top: 1rem;
      line-height: 50px;
      text-shadow: 3px 3px 5px rgba(1, 1, 1, 0.5);
    }
  }

  .content-line {
    display: flex;
    flex-wrap: wrap;
    border-bottom: 1px solid black;
    padding-bottom: 0.5rem;

    justify-content: space-between;
    gap: 1rem;
  }
`;

const ContentHolder = styled.div`
  padding: 15px;
  & > div {
    margin-bottom: 1rem;
  }
`;

const FoodForm = (props) => {
  return (
    <Container colors={props.colors}>
      <div className="title-unique">
        <h2>Submit Food</h2>
      </div>
      <ContentHolder>
        <div className="text-box">
          <p>
            I can’t find all the food in the entire world. Even many states I
            have no idea where to find what. Please share some places to get
            high quality products near you or somewhere you have travelled in
            the past so people can have access to them. Feel free to link your
            name or instagram and I’ll give you credit. Or leave it anonymous
          </p>
        </div>
        <div className="content-line">
          <div>
            <p className="md-bold">Your Name or Instagram (optional)</p>
            <input type="text" placeholder="Name or Instagram" />
          </div>
        </div>

        <div className="content-line">
          <div>
            <p className="md-bold">Country</p>
            <input type="text" placeholder="country" required />
          </div>

          <div>
            <p className="md-bold">State/Province</p>
            <input required type="text" placeholder="State/Province" />
          </div>

          <div>
            <p className="md-bold">City</p>
            <input required type="text" placeholder="city" />
          </div>
        </div>
        <div className="content-line">
          <div>
            <p className="md-bold">Farm/Store/Business Name </p>
            <input required type="text" placeholder="Name" />
          </div>
        </div>
        <div className="content-line">
          <p className="md-bold">Farm/Store Contact Info(optional)</p>
          <p className="md-bold">Email</p>
          <input type="text" placeholder="Email" />
          <p className="md-bold">Phone</p>
          <input type="text" placeholder="Phone #" />
        </div>
        <div className="description">
          <p className="md-bold">
            Description -{" "}
            <span>What do they sell? Organic/grass fed, cheap?</span>
          </p>
        </div>
      </ContentHolder>
    </Container>
  );
};

export default FoodForm;
