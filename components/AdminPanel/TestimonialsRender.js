import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import TestimonialLine from "./TestimonialLine";
const Cont = styled.div`
  border: 1px solid ${(props) => props.colors.grey};
  max-width: 1000px;
  margin: 0 auto;
  max-height: 600px;
  .title-spec {
    padding: 8px;
    border-bottom: 1px solid ${(props) => props.colors.grey};
  }
  .testimonials {
    overflow-y: auto;
  }
`;

const TestimonialsRender = ({ testimonials, setIndex, activeIndex }) => {
  const testimonialLines = testimonials.map((testimonial, index) => {
    console.log(testimonial);
    return (
      <TestimonialLine
        setIndex={setIndex}
        activeIndex={activeIndex}
        key={index}
        index={index}
        title={testimonial.title}
        id={testimonial.id}
        name={testimonial.name}
        created_at={testimonial.created_at}
      />
    );
  });
  return (
    <Cont colors={COLORS}>
      <div className="title-spec">
        <h5>Recent Guest Testimonials</h5>
      </div>
      <div className="testimonials">{testimonialLines}</div>
    </Cont>
  );
};

export default TestimonialsRender;
