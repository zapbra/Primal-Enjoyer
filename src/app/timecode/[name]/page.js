import supabase from "../../../../utils/supabaseClient";
import Render from "./Render";
import Testing from "../Testing";

export async function generateStaticParams() {
  const { data, error } = await supabase.from("timecodes").select("name");

  return data.map((timecode) => {
    return { name: timecode.name };
  });
}

const Page = async ({ params }) => {
  const { data: timecode, error } = await supabase
    .from("timecodes")
    .select("name, content, article_titles")
    .eq("name", decodeURI(params.name).replaceAll("%26", "&"))
    .maybeSingle();

  return (
    <div>
      <Render timecode={timecode} />
    </div>
  );
};

export default Page;
