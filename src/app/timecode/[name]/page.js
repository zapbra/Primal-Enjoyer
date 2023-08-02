import supabase from "../../../../utils/supabaseClient";
import Render from "./Render";

export async function generateStaticParams() {
  const { data, error } = await supabase.from("timecodes").select("name");

  return data.map((timecode) => {
    return { name: timecode.name };
  });
}

export async function getStaticProps(name) {
  const { data: timecode, error } = await supabase
    .from("timecodes")
    .select("name, content, article_titles")
    .eq("name", name)
    .single();
  return {
    props: {
      timecode: error,
    },
  };
}

const Page = async ({ params }) => {
  const { data: timecode, error } = await supabase
    .from("timecodes")
    .select("name, content, article_titles")
    .eq("name", params.name.replaceAll("%20", " "))
    .maybeSingle();

  return (
    <div>
      <Render timecode={timecode} />
    </div>
  );
};

export default Page;
