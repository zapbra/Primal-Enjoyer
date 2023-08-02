import supabase from "../../../utils/supabaseClient";
import styled from "styled-components";
import React from "react";

import PageDisplay from "./pageDisplay";

export async function getServerSideProps() {
  return {
    props: {
      posts: "lolasdlaslsldl",
    },
  };
}

const Page = async ({ posts }) => {
  const data = await getServerSideProps();

  return (
    <div className="k">
      <PageDisplay posts={data.props.posts} />
    </div>
  );
};

export default Page;
