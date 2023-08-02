import useSWR from "swr";
import supabase from "../utils/supabaseClient";
import { useEffect } from "react";

const PageViews = ({ view_data }) => {
  console.log("view_data");
  console.log(view_data);

  return <>{view_data?.view_count ? `${view_data.view_count}` : `–––`}</>;
};

export default PageViews;
