import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import { useForm } from "react-hook-form";
import emailjs, { init } from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";
import LinkBtn from "../Buttons/LinkBtn";
import { usePathname } from "next/navigation";

const Cont = styled.form`
  background-color: #fff;
  border: 1px solid ${(props) => props.colors.grey};
  padding: 16px;
  border-radius: 8px;
  margin: 0 auto;
`;

const Feedback = () => {
  const pathname = usePathname();

  const {
    handleSubmit,
    register,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm();

  const submitForm = handleSubmit(async (formData) => {
    formData.page = pathname;

    emailjs
      .send(
        "service_3hso67w",
        "template_cxvs4sn",
        formData,
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
    toast.success("Thank you for your submission!");
    clearForm();
  });

  const clearForm = () => {
    setValue("email", "");
    setValue("suggestion", "");
  };

  return (
    <Cont colors={COLORS} onSubmit={submitForm}>
      <Toaster />
      <div className="field">
        <h4>
          Email <span className="light">(optional)</span>
        </h4>
        <input
          type="email"
          name="email"
          placeholder="Email"
          {...register("email", {
            required: false,
          })}
        />
      </div>
      <div className="mar-bottom-32"></div>
      <div className="field line">
        <h4>What Is Your Suggestion or Feedback? *</h4>
        <textarea
          required
          name="suggestion"
          {...register("suggestion", {
            required: true,
          })}
        ></textarea>
        <div className="mar-bottom-8"></div>
        {errors.suggestion?.type === "required" && (
          <p className="error">*Message is required</p>
        )}
      </div>
      <LinkBtn type="submit"></LinkBtn>
    </Cont>
  );
};

export default Feedback;
