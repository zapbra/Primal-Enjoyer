import styled from "styled-components";
import { useState } from "react";
const Title = styled.div`
  padding: 5px 20px;
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  background-color: ${(props) => props.colors.ultraLightBlue};
  margin-bottom: 2rem;
  display: inline-block;
  width: 100%;
`;

const Section = styled.div`
  max-width: 500px;
  margin-bottom: 3rem;
  padding-bottom: 2rem;
  border-bottom: 2px solid black;
  table,
  th,
  td {
    border: 1px solid black;
  }
  td {
    padding-left: 5px;
  }
  table {
    width: 100%;
  }
  th {
    background-color: ${(props) => props.colors.ultraLightBlue};
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const Aajonus = (props) => {
  const [form, setForm] = useState({
    name: "",
    link: "",
  });

  function submitForm(e) {
    e.preventDefault();
    console.log("form submitted");
  }
  function updateForm(e) {
    const value = e.currentTarget.value;
    const field = e.currentTarget.name;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [field]: value,
      };
    });
  }

  return (
    <Section colors={props.colors}>
      <Title colors={props.colors}>
        <h1>Aajonus Resources</h1>
      </Title>
      <table>
        <thead>
          <tr>
            <th>
              <p className="semi-lg-bold">Content</p>
            </th>
            <th>
              <p className="semi-lg-bold">Link</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p className="md-bold">Google Drive With All Content</p>
            </td>
            <td>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://drive.google.com/drive/u/0/folders/16I7xn0PZTofRf_mNyn3qtfI81WgbM1eB"
              >
                <p>Google Drive</p>
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <p className="md-bold">Mantysalo YT for Q&A</p>
            </td>
            <td>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/channel/UCdHSzt83x7LjGcdNTJu2LSA"
              >
                <p> Youtube</p>
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <p className="md-bold">School of Life on Youtube</p>
            </td>
            <td>
              <a
                target="_blank"
                rel="noreferrer"
                href="https://www.youtube.com/watch?v=ZJbgJmXIxAo&list=PLA4-m0Jyxx3mHBv5fxOwmyWYton1z_4qk"
              >
                <p>Youtube</p>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <form onSubmit={submitForm} className="input-form">
        <div className="sub-title">
          <h3>Submit a Resource</h3>
        </div>
        <label>
          <p className="md-bold"> Name:</p>
          <input
            onChange={updateForm}
            type="text"
            name="name"
            value={form.name}
            placeholder="name"
            required
            maxLength="30"
          />
        </label>
        <label>
          <p className="md-bold"> Link</p>
          <input
            onChange={updateForm}
            type="text"
            name="link"
            value={form.link}
            placeholder="link"
            maxLength="100"
            required
          />
          <button type="submit" className="submit-btn">
            Submit
          </button>
        </label>
      </form>
    </Section>
  );
};

export default Aajonus;
