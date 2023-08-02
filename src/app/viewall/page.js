import supabase from "../../../utils/supabaseClient";
import Render from "./Render";

export const fetchData = async (pageContext) => {
  const { data, error } = await supabase
    .from("alphabet")
    .select("*, post(title, created_at, tags(title))");
  const sortedPosts = data.sort((a, b) => (a.title > b.title ? 1 : -1));
  const { data: data2, error2 } = await supabase
    .from("post")
    .select("title, tags(title)");
  const onlyTitles = data2; //.map((title) => title.title);
  const { data: data3, error3 } = await supabase.from("tags").select("title");
  const tagsSort = data3.sort((a, b) => (a.title > b.title ? 1 : -1));
  const tagsText = data3.map((item) => item.title);
  const tagsUnique = tagsSort.filter((item, pos) => {
    return tagsText.indexOf(item.title) == pos;
  });

  return {
    props: {
      sortedPosts,
      onlyTitles,
      tagsSort,
      tagsUnique,
    },
  };
};

const Page = async () => {
  const data = await fetchData();
  const { sortedPosts, onlyTitles, tagsSort, tagsUnique } = data.props;

  return (
    <div>
      <Render
        sortedPosts={sortedPosts}
        onlyTitles={onlyTitles}
        tagsSort={tagsSort}
        tagsUnique={tagsUnique}
      />
    </div>
  );
};

export default Page;
