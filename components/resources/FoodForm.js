import styled from "styled-components";
import { useState } from "react";
const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.colors.ultraLightBlue};
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  border-radius: 0.5rem;

  span {
    font-weight: 500;
  }
  textarea {
    border: 1px solid #fff;
    resize: none;
    width: 100%;
    height: 100px;
    border: 1px solid black;
  }
  input {
    width: 175px;
  }
  .title-unique {
    border-bottom: 2px solid black;
    text-align: center;
    h2 {
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
  & form > div {
    margin-bottom: 1rem;
  }
`;

const FoodForm = (props) => {
  const [form, setForm] = useState({
    name: "",
    country: "",
    state: "",
    city: "",
    farm: "",
    email: "",
    phone: "",
    description: "",
  });
  function submitFood(e) {
    e.preventDefault();
    clearForm();
  }
  function clearForm() {
    setForm((prevForm) => {
      return {
        name: "",
        country: "",
        state: "",
        city: "",
        farm: "",
        email: "",
        phone: "",
        description: "",
      };
    });
  }
  function updateForm(e) {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [name]: value,
      };
    });
  }
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
        <form onSubmit={submitFood}>
          <div className="content-line">
            <div>
              <p className="md-bold">Your Name or Instagram (optional)</p>
              <input
                name="name"
                value={form.name}
                type="text"
                placeholder="Name or Instagram"
                onChange={updateForm}
              />
            </div>
          </div>
          <div className="content-line">
            <div>
              <p className="md-bold">Country</p>
              <input
                type="text"
                name="country"
                value={form.country}
                placeholder="country"
                onChange={updateForm}
                required
              />
            </div>

            <div>
              <p className="md-bold">State/Province</p>
              <input
                name="state"
                value={form.state}
                required
                type="text"
                placeholder="State/Province"
                onChange={updateForm}
              />
            </div>

            <div>
              <p className="md-bold">City</p>
              <input
                name="city"
                value={form.vity}
                required
                type="text"
                placeholder="city"
                onChange={updateForm}
              />
            </div>
          </div>
          <div className="content-line">
            <div>
              <p className="md-bold">Farm/Store/Business Name </p>
              <input
                name="farm"
                value={form.farm}
                required
                type="text"
                placeholder="Name"
                onChange={updateForm}
              />
            </div>
          </div>{" "}
          <p className="md-bold mar-bottom-one">
            Farm/Store Contact Info(optional)
          </p>
          <div className="content-line">
            <div>
              <p className="md-bold">Email</p>
              <input
                name="email"
                value={form.email}
                type="email"
                placeholder="Email"
                onChange={updateForm}
              />
            </div>
            <div>
              <p className="md-bold">Phone</p>
              <input
                name="phone"
                value={form.phone}
                type="number"
                placeholder="Phone #"
                onChange={updateForm}
              />
            </div>
          </div>
          <div className="description">
            <p className="md-bold">
              Description -{" "}
              <span>What do they sell? Organic/grass fed, cheap?</span>
            </p>
            <textarea
              name="description"
              value={form.description}
              placeholder="Describe the farm"
              onChange={updateForm}
            ></textarea>
          </div>
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </form>
      </ContentHolder>
    </Container>
  );
};

export default FoodForm;
