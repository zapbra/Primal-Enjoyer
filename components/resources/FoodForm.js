import styled from "styled-components";
import { useState, useRef } from "react";
import emailjs, { init } from "@emailjs/browser";

const Container = styled.div`
  width: 100%;
  background-color: ${(props) => props.colors.ultraLightBlue};
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  border-radius: 0.5rem;

  h3 {
    text-align: center;
  }
  span {
    font-weight: 500;
  }
  textarea {
    border: 1px solid #fff;
    resize: none;
    width: 100%;
    height: 100px;
    border: 1px solid black;
    font-size: 20px;
  }
  input {
    width: 300px;
    height: 48px;
    font-size: 20px;
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

    justify-content: space-around;
    gap: 1rem;
    & > div {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
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
  const form = useRef();
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    farm: "",
    email: "",

    description: "",
  });
  function submitFood(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3hso67w",
        "template_4o9p0rn",
        form.current,
        "VuMtr83gozV6G7IIc"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    clearForm();
  }
  function clearForm() {
    init("VuMtr83gozV6G7IIc");

    setFormData((prevForm) => {
      return {
        country: "",
        state: "",
        city: "",
        farm: "",
        email: "",

        description: "",
      };
    });
  }
  function updateForm(e) {
    const value = e.currentTarget.value;
    const name = e.currentTarget.name;

    setFormData((prevForm) => {
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
          <h3 className="red">
            Share places near you to find high quality food. No matter where you
            are located and I'll add it to the food finder.
          </h3>
        </div>
        <form onSubmit={submitFood} ref={form}>
          <div className="content-line">
            <div>
              <h3>Country</h3>
              <input
                type="text"
                name="country"
                value={formData.country}
                placeholder="country"
                onChange={updateForm}
                required
              />
            </div>

            <div>
              <h3>State/Province</h3>
              <input
                name="state"
                value={formData.state}
                required
                type="text"
                placeholder="State/Province"
                onChange={updateForm}
              />
            </div>

            <div>
              <h3>City</h3>
              <input
                name="city"
                value={formData.vity}
                required
                type="text"
                placeholder="city"
                onChange={updateForm}
              />
            </div>
          </div>
          <div className="content-line">
            <div>
              <h3>Farm/Store/Business Name</h3>
              <input
                name="farm"
                value={formData.farm}
                required
                type="text"
                placeholder="Name"
                onChange={updateForm}
              />
            </div>
          </div>{" "}
          <div className="content-line">
            <div>
              <h3>Email</h3>
              <input
                name="email"
                value={formData.email}
                type="email"
                placeholder="Email"
                onChange={updateForm}
              />
            </div>
          </div>
          <div className="description">
            <h3>Description</h3>
            <h5 className="align-center">What products do they sell?</h5>

            <textarea
              name="description"
              value={formData.description}
              placeholder="Describe the farm"
              onChange={updateForm}
            ></textarea>
          </div>
          <button className="submit-btn" type="submit">
            <h3>Submit</h3>
          </button>
        </form>
      </ContentHolder>
    </Container>
  );
};

export default FoodForm;
