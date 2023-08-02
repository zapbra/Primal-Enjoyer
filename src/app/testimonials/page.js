import Render from "./render";
import supabase from "../../../utils/supabaseClient";

export async function fetchData() {
  const { data: data2, error: error2 } = await supabase
    .from("testimonials")
    .select("*")
    .eq("verified", true);

  return {
    props: {
      data2,
    },
  };
}

const Page = async () => {
  const data2 = await fetchData();

  return (
    <div>
      <Render data2={data2.props.data2} />
    </div>
  );
};

export default Page;
