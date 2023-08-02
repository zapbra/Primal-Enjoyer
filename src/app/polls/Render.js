"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";
import Food from "./components/Food";
import Results from "./components/Results";
import {
  createFoodUpvote,
  createUserFoodUpvote,
  createUserFoodDownvote,
  createFoodDownvote,
  fetchFoods,
} from "../../../utils/supabaseFunction";
import { getUpvotesAndDownvotes } from "../../../utils/Functions";
import toast, { Toaster } from "react-hot-toast";
import supabase from "../../../utils/supabaseClient";

const Cont = styled.div`
  min-height: 100vh;
  background-color: #fff;
  padding: 104px 16px;
  @media only screen and (max-width: 400px) {
    padding: 80px 8px 80px 8px;
  }
  .food-holder {
    margin: 0 auto;
    max-width: 1000px;
    @media only screen and (max-width: 300px) {
      flex-direction: column;
    }
  }
`;

const Render = ({ foodsFetch, votesTodayFetch, allVotesFetch }) => {
  const [votesToday, setVotesToday] = useState(votesTodayFetch[0].count);
  const [allVotes, setAllVotes] = useState(allVotesFetch[0].count);
  const [userVotes, setUserVotes] = useState({ all: 0, today: 0 });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState(
    foodsFetch.sort((a, b) => {
      let aUpvotes = a.foodUpvotes[0].count;
      let aDownvotes = a.foodDownvotes[0].count;
      let bUpvotes = b.foodUpvotes[0].count;
      let bDownvotes = b.foodDownvotes[0].count;
      let aRatio = Math.ceil((aUpvotes / (aUpvotes + aDownvotes)) * 100);
      let bRatio = Math.ceil((bUpvotes / (bUpvotes + bDownvotes)) * 100);
      if (isNaN(aRatio)) aRatio = 0;
      if (isNaN(bRatio)) bRatio = 0;
      return aRatio > bRatio ? -1 : aRatio < bRatio ? 1 : 0;
    })
  );
  const fetchUserVotes = async (user_id) => {};

  const [upvotes, setUpvotes] = useState({});
  const [downvotes, setDownvotes] = useState({});
  useEffect(() => {
    const updateSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      setUser(data?.session?.user);
      if (data?.session?.user == null) {
        const [upvotesRes, downvotesRes] = getUpvotesAndDownvotes();
        setUpvotes(upvotesRes[0] || {});
        setDownvotes(downvotesRes[0] || {});
      } else {
        fetchUserVotes(data.session.user.id);
        const allUserVotesFetch = await fetchUserVotes(data.session.user.id);

        /*  setUserVotes((prev) => {
          return {
            all: allUserVotesFetch,
            today: votesUserTodayFetch,
          };
        }); */
      }
    };
    updateSession();
  }, []);

  const reFetchFoods = async () => {
    const foodsFetch = await fetchFoods();
    setFoods(
      foodsFetch.sort((a, b) => {
        let aUpvotes = a.foodUpvotes[0].count;
        let aDownvotes = a.foodDownvotes[0].count;
        let bUpvotes = b.foodUpvotes[0].count;
        let bDownvotes = b.foodDownvotes[0].count;
        let aRatio = Math.ceil((aUpvotes / (aUpvotes + aDownvotes)) * 100);
        let bRatio = Math.ceil((bUpvotes / (bUpvotes + bDownvotes)) * 100);
        if (isNaN(aRatio)) aRatio = 0;
        if (isNaN(bRatio)) bRatio = 0;
        return aRatio > bRatio ? -1 : aRatio < bRatio ? 1 : 0;
      })
    );
  };
  const getRandomNumberUnique = (compareNum) => {
    let num;
    do {
      num = Math.floor(Math.random() * foodsFetch.length);
    } while (num == compareNum);
    return num;
  };
  const [foodOneIndex, setFoodOneIndex] = useState();
  const [foodTwoIndex, setFoodTwoIndex] = useState();

  const regeneratePoll = () => {
    let num1, num2;
    do {
      num1 = getRandomNumberUnique(foodOneIndex);
    } while (num1 == foodTwoIndex);
    do {
      num2 = getRandomNumberUnique(foodTwoIndex);
    } while (num2 == num1 || num2 == foodOneIndex);
    setFoodOneIndex(num1);
    setFoodTwoIndex(num2);
  };

  useEffect(() => {
    let foodOneVal = Math.floor(Math.random() * foodsFetch.length);
    setFoodOneIndex(foodOneVal);
    setFoodTwoIndex(getRandomNumberUnique(foodOneVal));
  }, [foods]);

  const submitPoll = async (index) => {
    const notIndex = foodOneIndex == index ? foodTwoIndex : foodOneIndex;
    setLoading(true);
    if (user !== undefined) {
      createUserFoodUpvote(foods[index].id, user.id);
      createUserFoodDownvote(foods[notIndex].id, user.id);
    } else {
      let upvoteRes = createFoodUpvote(foods[index].id);
      let upvoteResX = await upvoteRes;
      let foodName = upvoteResX.food_id.name;

      let downvoteRes = createFoodDownvote(foods[notIndex].id);
      let downvoteResX = await downvoteRes;

      let downVoteFoodName = downvoteResX.food_id.name;

      if (!upvotes.hasOwnProperty(foodName)) {
        setUpvotes((prev) => {
          return {
            ...prev,
            [foodName]: [upvoteResX],
          };
        });
      } else {
        setUpvotes((prev) => {
          return {
            ...prev,
            [foodName]: [...prev[foodName], upvoteResX],
          };
        });
      }

      if (!downvotes.hasOwnProperty(downVoteFoodName)) {
        setDownvotes((prev) => {
          return {
            ...prev,
            [downVoteFoodName]: [downvoteResX],
          };
        });
      } else {
        setDownvotes((prev) => {
          return {
            ...prev,
            [downVoteFoodName]: [...prev[downVoteFoodName], downvoteResX],
          };
        });
      }
    }

    setTimeout(() => {
      toast.success(`You voted ${foods[index].name} > ${foods[notIndex].name}`);
      regeneratePoll();

      setLoading(false);
    }, 500);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (Object.keys(upvotes).length > 1) {
        localStorage.setItem("upvotes", JSON.stringify(upvotes));
      }
    }
  }, [upvotes]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (Object.keys(downvotes).length > 1) {
        localStorage.setItem("downvotes", JSON.stringify(downvotes));
      }
    }
  }, [downvotes]);
  return (
    <Cont colors={COLORS}>
      <Toaster />
      <div className="center-inline mar-bottom-16">
        <h1>Primal Poll</h1>
        <h4 className="contrast">Which one wins?</h4>
      </div>
      <div className="flex flex-end">
        <div className="box-light inline flex flex-column">
          <div className="flex space-between">
            <p className=" contrast mar-right-8">All votes:</p>
            <p className="">{allVotes}</p>
          </div>
          <div className="flex space-between">
            <p className=" contrast mar-right-8">Votes today:</p>
            <p className="">{votesToday}</p>
          </div>
        </div>
      </div>
      <div className="ssm-spacer"></div>
      <div className="flex space-around food-holder">
        <Food
          url={foods[foodOneIndex]?.url}
          name={foods[foodOneIndex]?.name}
          tags={foods[foodOneIndex]?.foodTagHolder}
          index={foodOneIndex}
          submitPoll={submitPoll}
          loading={loading}
        />

        <Food
          url={foods[foodTwoIndex]?.url}
          name={foods[foodTwoIndex]?.name}
          tags={foods[foodTwoIndex]?.foodTagHolder}
          index={foodTwoIndex}
          submitPoll={submitPoll}
          loading={loading}
        />
      </div>
      <div className="ssm-spacer"></div>

      <Results foods={foods} reFetchFoods={reFetchFoods} />
    </Cont>
  );
};

export default Render;
