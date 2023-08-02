"use client";
import supabase from "../../../utils/supabaseClient";

import React from "react";
import COLORS from "../../../data/colors";

const PageDisplay = ({ posts }) => {
  console.log("posts...");
  console.log(posts);

  return (
    <div className="boxer">
      <p>Click me</p>
    </div>
  );
};

export default PageDisplay;
