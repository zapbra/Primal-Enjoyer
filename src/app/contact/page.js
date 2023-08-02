"use client";

import React from "react";
import styled from "styled-components";
import LinkBtn from "../../../components/Buttons/LinkBtn";
import COLORS from "../../../data/colors";
import emailjs, { init } from "@emailjs/browser";
import Head from "next/head";
import DonationButton from "../../../components/Buttons/DonationButtonSmall";

const Cont = styled.div`
  display: flex;
  background-color: #fff;
  & > div:nth-of-type(1) {
    padding-right: 16px;
  }
  & > div:nth-of-type(2) {
    padding-left: 16px;
  }
  @media only screen and (max-width: 960px) {
    flex-direction: column;
    .form-line {
      flex-direction: column;
      gap: 1rem;
      align-items: center;
    }
  }
  h2,
  h4,
  p {
    color: #00132e;
  }
  h2 {
    margin-bottom: 1rem;
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const TextField = styled.div`
  width: 496px;
  text-align: center;
  @media only screen and (max-width: 960px) {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid #002b67;
  }
  p {
    font-size: 20px;
  }
`;

const FormElem = styled.form`
  .field {
    .input {
      background-color: red !important;
    }
  }
`;

const Contact = () => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    suggestion: "",
    images: [],
  });
  const form = React.useRef();

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
  function submitSuggestion(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3hso67w",
        "template_cxvs4sn",
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
    alert("Thank you for your submission!");
  }
  function clearForm() {
    init("VuMtr83gozV6G7IIc");

    setFormData((prevForm) => {
      return {
        name: "",
        email: "",
        suggestion: "",
        images: [],
      };
    });
  }

  const meta = {
    title: "Contact Page",
    description:
      "Primal Enjoyer contact page. Contact for Aajonus Vonderplanitz, health and nutrition or other related questions.",
    link: "https://www.primalenjoyer.com/contact",
    type: "website",
    date: "2022-10-11 15:00:00.000",
    image: "/seo/contact.PNG",
  };
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Primal Enjoyer" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta property="article:published_time" content={meta.date} />
        <link rel="canonical" href={meta.image} />
        <meta property="og:url" content={meta.link} />
      </Head>
      <div className="container">
        <Cont>
          <Flex className="flex-one">
            <TextField>
              <DonationButton />

              <h2>How would you improve this website?</h2>
              <p>Use the form to send me any suggestions</p>
              <p>or feel free to ask me a question!</p>
            </TextField>
          </Flex>
          <Flex className="flex-one">
            <FormElem ref={form} onSubmit={submitSuggestion} colors={COLORS}>
              <div className="form-line line">
                <div className="field">
                  <h4>
                    Name <span className="light">(optional)</span>
                  </h4>
                  <input
                    type="text"
                    name="name"
                    onChange={updateForm}
                    value={formData.name}
                    placeholder="Name"
                  />
                </div>
                <div className="field">
                  <h4>
                    Email <span className="light">(optional)</span>
                  </h4>
                  <input
                    type="email"
                    name="email"
                    onChange={updateForm}
                    value={formData.email}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field line">
                <h4>What Is Your Suggestion or Feedback? *</h4>
                <textarea
                  required
                  name="suggestion"
                  onChange={updateForm}
                  value={formData.suggestion}
                ></textarea>
              </div>
              <LinkBtn type="submit"></LinkBtn>
            </FormElem>
          </Flex>
        </Cont>
        <div className="center-inline"></div>
      </div>
    </>
  );
};

export default Contact;
