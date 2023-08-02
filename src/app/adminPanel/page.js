"use client";

import { useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import supabase from "../../../utils/supabaseClient";
import {
  approveTestimonial,
  deleteTestimonial,
  fetchGuestTestimonials,
  fetchTextFiles,
} from "../../../utils/supabaseFunction";
import TestimonialsRender from "../../../components/AdminPanel/TestimonialsRender";
import Testimonial from "../../../components/testimonials/Testimonial";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import toast, { Toaster } from "react-hot-toast";
import FilesRender from "../../../components/AdminPanel/filesRender";
const Cont = styled.div`
  background: #fff;
  min-height: 100vh;
  .testimonial-wrapper,
  .btn-holder {
    max-width: 1000px;
    margin: 0 auto;
  }
  .btn-holder {
    border: 1px solid ${(props) => props.colors.grey};
    padding: 16px;
  }
`;

export async function getServerSideProps() {
  const testimonialsFetch = await fetchGuestTestimonials();
  const textFilesFetch = await fetchTextFiles();
  return {
    props: {
      testimonialsFetch,
      textFilesFetch,
    },
  };
}

const AdminPanel = ({ testimonialsFetch, textFilesFetch }) => {
  const [testimonials, setTestimonials] = useState(testimonialsFetch);
  const [index, setIndex] = useState(0);
  const [fileIndex, setFileIndex] = useState(0);

  const deleteTestimonialFunctional = async () => {
    const res = deleteTestimonial(testimonials[index].id);
    if (res) {
      toast.success("Deleted.");
      setTestimonials((prev) => {
        let copy = [...prev];
        copy.splice(index, 1);
        return copy;
      });
      if (index > 0) {
        setIndex(index - 1);
      }
    } else {
      toast.error("Error deleting.");
    }
  };

  const approveTestimonialFunctional = async () => {
    const res = await approveTestimonial(testimonials[index].id);
    if (res) {
      toast.success("Approved!");

      setTestimonials((prev) => {
        let copy = [...prev];
        copy.splice(index, 1);
        return copy;
      });
      if (index > 0) {
        setIndex(index - 1);
      }
    } else {
      toast.error("Error approving.");
    }
  };

  return (
    <Cont colors={COLORS} className="content">
      <Toaster />
      <TestimonialsRender
        testimonials={testimonials}
        setIndex={setIndex}
        activeIndex={index}
      />
      <div className="ssm-spacer"></div>
      <div className="flex flex-end btn-holder">
        <div className="red-bg-btn mar-right-32 flex align-center">
          <h5 className="mar-right-8" onClick={deleteTestimonialFunctional}>
            Delete
          </h5>
          <FontAwesomeIcon icon={faTrash} className="icon-ssm white" />
        </div>
        <div className="green-btn flex" onClick={approveTestimonialFunctional}>
          <h5 className="mar-right-8">Approve</h5>
          <FontAwesomeIcon icon={faCheck} className="icon-ssm white" />
        </div>
      </div>
      <div className="mar-bottom-32"></div>
      <div className="testimonial-wrapper">
        {testimonials.length > 0 && (
          <Testimonial
            title={testimonialsFetch[index]?.title}
            name={testimonialsFetch[index]?.name}
            age={testimonialsFetch[index]?.age}
            created_at={testimonialsFetch[index]?.created_at}
            start_date={testimonialsFetch[index]?.gender}
            content={testimonialsFetch[index]?.content}
            photos={testimonialsFetch[index]?.photos}
          />
        )}
      </div>
      <FilesRender
        files={textFilesFetch}
        fileIndex={fileIndex}
        setFileIndex={setFileIndex}
      />
    </Cont>
  );
};

export default AdminPanel;
