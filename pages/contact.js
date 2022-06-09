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

const FormElem = styled.div`
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

  function updateForm(e) {}
  return (
    <div className="container">
      <Cont>
        <TextField>
          <h3>How would you improve this website?</h3>
          <p>
            Use the form to send me any suggestions for the website or if you
            need to contact me in any way (questions)
          </p>
        </TextField>
        <FormElem colors={COLORS}>
          <div className="field">
            <h4>Name</h4>
            <input
              type="text"
              name="name"
              value={form.name}
              placeholder="Name"
            />
          </div>
          <div className="field">
            <h4>Email</h4>
            <input
              type="text"
              name="name"
              value={form.email}
              placeholder="Email"
            />
          </div>
          <div className="field">
            <h4>What Is Your Suggestion or Feedback?</h4>
            <textarea name="feedback" value={form.feedback}></textarea>
          </div>
        </FormElem>
      </Cont>
    </div>
  );
};

export default contact;
