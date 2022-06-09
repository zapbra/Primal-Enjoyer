import React, { useState } from "react";
import styled from "styled-components";
import COLORS from "../Data/colors";
const Cont = styled.div`
  display: flex;
  background-color: #fff;
  h3,
  h4,
  p {
    color: #00132e;
  }
`;

const TextField = styled.div`
  flex: 1;
`;

const FormElem = styled.form`
  flex: 1;
  .field {
    .input {
      background-color: red !important;
    }
  }
`;

const contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    feedback: "",
    images: [],
  });

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
    <div className="container">
      <Cont>
        <div className="flex-one">
          <TextField>
            <h3>How would you improve this website?</h3>
            <p>
              Use the form to send me any suggestions for the website or if you
              need to contact me in any way (questions)
            </p>
          </TextField>
        </div>
        <div className="flex-one">
          <FormElem colors={COLORS}>
            <div className="form-line line">
              <div className="field">
                <h4>Name</h4>
                <input
                  type="text"
                  name="name"
                  onChange={updateForm}
                  value={form.name}
                  placeholder="Name"
                />
              </div>
              <div className="field">
                <h4>Email</h4>
                <input
                  type="email"
                  name="email"
                  onChange={updateForm}
                  value={form.email}
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="field">
              <h4>What Is Your Suggestion or Feedback? *</h4>
              <textarea
                name="feedback"
                onChange={updateForm}
                value={form.feedback}
              ></textarea>
            </div>
          </FormElem>
        </div>
      </Cont>
    </div>
  );
};

export default contact;
