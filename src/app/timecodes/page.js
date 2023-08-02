import Render from "./Render";
import supabase from "../../../utils/supabaseClient";

export async function getStaticProps() {
  const { data, error } = await supabase.from("timecodes").select("name");
  return {
    props: {
      data,
    },
  };
}

const Page = async () => {
  const data = await getStaticProps();
  const previewData = data.props.data;

  return (
    <div>
      <Render previewData={previewData}></Render>
    </div>
  );
};

export default Page;
