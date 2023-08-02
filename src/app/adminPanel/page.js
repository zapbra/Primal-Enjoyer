import React from "react";

import {
  fetchGuestTestimonials,
  fetchTextFiles,
} from "../../../utils/supabaseFunction";
import Render from "../encyclopedia/Render";

export async function fetchData() {
  const testimonialsFetch = await fetchGuestTestimonials();
  const textFilesFetch = await fetchTextFiles();
  return {
    props: {
      testimonialsFetch,
      textFilesFetch,
    },
  };
}

const Page = async () => {
  const data = await fetchData();
  const testimonialsFetch = data.props.testimonialsFetch;
  const textFilesFetch = data.props.textFilesFetch;
  return (
    <div>
      {/*  <Render
        testimonialsFetch={testimonialsFetch}
        textFilesFetch={textFilesFetch}
      /> */}
    </div>
  );
};

export default Page;
