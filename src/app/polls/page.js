import { fetchFoods, fetchVotes } from "../../../utils/supabaseFunction";
import Render from "./Render";

export async function getServerSideProps() {
  const foodsFetch = await fetchFoods();
  const { votesTodayFetch, allVotesFetch } = await fetchVotes();
  return {
    props: {
      foodsFetch,
      votesTodayFetch,
      allVotesFetch,
    },
  };
}

const Page = async () => {
  const data = await getServerSideProps();

  const { foodsFetch, votesTodayFetch, allVotesFetch } = data.props;

  return (
    <div>
      <Render
        foodsFetch={foodsFetch}
        votesTodayFetch={votesTodayFetch}
        allVotesFetch={allVotesFetch}
      />
      <div>hello</div>
    </div>
  );
};

export default Page;
