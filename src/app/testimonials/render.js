"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import COLORS from "../../../data/colors";
import CreateTestimonial from "../../../components/testimonials/CreateTestimonials";
import InputForm from "../../../components/testimonials/InputForm";
import TestimonialHolder from "../../../components/testimonials/TestimonialHolder";
import supabase from "../../../utils/supabaseClient";

const Cont = styled.div`
  min-height: 100vh;
  padding: 108px 16px;
  background-color: #fff;
  @media only screen and (max-width: 600px) {
    padding: 8px;
  }
  .header {
    word-wrap: break-word;
    background-color: ${(props) => props.colors.darkBlue};
    padding: 16px;
    h1 {
      color: #fff;
    }
  }
`;

const Testimonials = ({ data2 }) => {
  const [testimonials, setTestimonials] = useState(data2);
  const [user, setUser] = useState(null);

  const updateSession = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (session != null) {
      setUser(session.user);
    }
  };
  useEffect(() => {
    updateSession();
  }, []);

  const sortNew = () => {
    setTestimonials(data2);
  };
  const sortOld = () => {
    let arrCopy = [...data2];
    arrCopy.reverse();
    setTestimonials(arrCopy);
  };

  const sortRandom = () => {
    let currentIndex = testimonials.length,
      randomIndex;
    const testimonialsCopy = [...testimonials];
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [testimonialsCopy[currentIndex], testimonialsCopy[randomIndex]] = [
        testimonialsCopy[randomIndex],
        testimonialsCopy[currentIndex],
      ];
    }

    setTestimonials(testimonialsCopy);
  };

  return (
    <Cont colors={COLORS}>
      <Toaster />
      <div className="center-inline header mar-bottom-32" id="title">
        <h1 className="text-shadow">Submit a Testimonial</h1>
      </div>
      <TestimonialHolder
        testimonials={testimonials}
        user={user}
        sortNew={sortNew}
        sortOld={sortOld}
        sortRandom={sortRandom}
      />
      <div className="mar-bottom-16"></div>

      <div className="ssm-spacer"></div>
      <CreateTestimonial />
      <div className="ssm-spacer"></div>
      <InputForm />
    </Cont>
  );
};

export default Testimonials;
