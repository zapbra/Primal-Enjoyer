import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../data/colors";
import Testimonial from "./Testimonial";
import Pagination from "../Functional/Pagination";

const Cont = styled.div`
  max-width: 1000px;
  margin: 0 auto;
`;

const TestimonialHolder = ({
  testimonials,
  user,
  sortNew,
  sortOld,
  sortRandom,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    document.getElementById("title").scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
  }, [page]);
  const [testimonialElems, setTestimonialElems] = useState(
    testimonials.map((testimonial, index) => {
      let photoCopy = testimonial.photos;
      return (
        <Testimonial
          user={user}
          key={index}
          user_id={testimonial.user_id}
          title={testimonial.title}
          name={testimonial.name}
          age={testimonial.age}
          created_at={testimonial.created_at}
          gender={testimonial.gender}
          start_date={testimonial.start_date}
          content={testimonial.content}
          photos={photoCopy}
          testimonial={testimonial}
        />
      );
    })
  );

  useEffect(() => {
    console.log("cahnged!");
    setTestimonialElems((prev) => {
      return testimonials.map((testimonial, index) => {
        let photoCopy = testimonial.photos;
        console.log(testimonial);
        return (
          <Testimonial
            user={user}
            key={index}
            testimonial_id={testimonial.id}
            user_id={testimonial.user_id}
            title={testimonial.title}
            name={testimonial.name}
            age={testimonial.age}
            created_at={testimonial.created_at}
            gender={testimonial.gender}
            start_date={testimonial.start_date}
            content={testimonial.content}
            photos={photoCopy}
            testimonial={testimonial}
          />
        );
      });
    });
  }, [user, testimonials]);

  return (
    <Cont colors={COLORS}>
      <div>{testimonialElems[page - 1]}</div>
      <div className="mar-bottom-32"></div>
      <Pagination
        pages={testimonials.length}
        page={page}
        setPage={setPage}
        sortNew={sortNew}
        sortOld={sortOld}
        sortRandom={sortRandom}
      />
    </Cont>
  );
};

export default TestimonialHolder;
