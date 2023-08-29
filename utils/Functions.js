import toast from "react-hot-toast";
import confetti from "canvas-confetti";

export const shootFireworks = () => {
  const duration = 15 * 300;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.2, 0.4), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.6, 0.8), y: Math.random() - 0.2 },
      })
    );
  }, 250);
};

const insertCollection = (title) => {
  if (typeof window != "undefined") {
    const collection = JSON.parse(localStorage.getItem("collection"));
    if (collection == null) {
      localStorage.setItem(
        "collection",
        JSON.stringify({ [title]: { articles: [] } })
      );
    } else {
      if (typeof collection[title] == "undefined") {
        collection[title] = { articles: [] };
        localStorage.setItem("collection", JSON.stringify(collection));
      } else {
        toast.error("Other collection with same name. Change name please.");
      }
    }
  }
};

export default insertCollection;

export const deleteCollection = (title) => {
  if (typeof window != "undefined") {
    const collection = JSON.parse(localStorage.getItem("collection"));
    delete collection[title];
    localStorage.setItem("collection", JSON.stringify(collection));
  }
};

export const getBookmarkedRecipes = () => {
  // check if window open
  if (typeof window != "undefined") {
    // get recipes
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    // if null set recipes to empty object
    if (recipes == null) {
      localStorage.setItem("recipes", JSON.stringify([]));
      recipes = [];
    }
    return recipes;
  }
  return [];
};
export const bookmarkRecipe = (name) => {
  // check if window is open
  if (typeof window != "undefined") {
    // get recipes
    const recipes = JSON.parse(localStorage.getItem("recipes"));
    //check if recipes null, if null create empty array
    if (recipes == null) {
      localStorage.setItem("recipes", JSON.stringify([]));
    } else {
      recipes.push(name);
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
  }
};

// returns true if bookmarked, else returns false
export const checkBookmarked = (name) => {
  // check if window is open
  let returnState = false;
  if (typeof window != "undefined") {
    // get recipes from local storage
    const recipes = JSON.parse(localStorage.getItem("recipes"));
    if (recipes == null) {
      localStorage.setItem("recipes", JSON.stringify([]));
    } else {
      // check if recipes includes name
      if (recipes.includes(name)) {
        returnState = true;
      }
    }
  }
  return returnState;
};

export const removeRecipeBookmark = (name) => {
  // check if window is open
  if (typeof window != "undefined") {
    // get recipes
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    //check if recipes null, if null create empty array
    if (recipes == null) {
      localStorage.setItem("recipes", JSON.stringify([]));
    } else {
      // remove recipe that matches name and set local storage recipes
      recipes = recipes.filter((recipe) => recipe != name);
      localStorage.setItem("recipes", JSON.stringify(recipes));
    }
  }
};

export const insertArticle = (title, articleTitle) => {
  if (typeof window != "undefined") {
    const collection = JSON.parse(localStorage.getItem("collection"));
    collection[title].articles.push({
      title: articleTitle,
      link: `/article/${articleTitle}`,
    });
    localStorage.setItem("collection", JSON.stringify(collection));
  }
};

export const deleteArticle = (title, articleTitle) => {
  if (typeof window != "undefined") {
    const collection = JSON.parse(localStorage.getItem("collection"));
    collection[title].articles = collection[title].articles.filter(
      (article) => article.title != articleTitle
    );
    localStorage.setItem("collection", JSON.stringify(collection));
  }
};

export const secondsToHms = (seconds) => {
  if (!seconds) return "00m 00s";

  let duration = seconds;
  let hours = duration / 3600;
  duration = duration % 3600;

  let min = parseInt(duration / 60);
  duration = duration % 60;

  let sec = parseInt(duration);

  if (sec < 10) {
    sec = `0${sec}`;
  }

  if (min < 10) {
    min = `0${min}`;
  }

  if (parseInt(hours, 10) > 0) {
    return `${parseInt(hours, 10)}h ${min}m ${sec}s`;
  } else if (min == 0) {
    return `00m ${sec}s`;
  } else {
    return `${min}m ${sec}s`;
  }
};

export const GetRelatedArticles = (data, preTags) => {
  const curTags = [];
  const articles = data;
  const related = [];
  const tags = preTags.map((tag) => tag.text);

  tags.forEach((tag) => {
    curTags.push(tag);
    const matching = articles.filter((article) => {
      return curTags.every((tag) => {
        return article.tags.some((tagz) => {
          return tag == tagz.text;
        });
      });
    });

    related.push(matching);
  });
  if (related.some((rel) => rel.length > 3)) {
    const sortRelated = related.sort((a, b) => {
      return a.length - b.length;
    });

    const finalRelated = sortRelated.filter((related) => {
      return related.length > 3;
    });

    return finalRelated[0].slice(0, 4);
  } else {
    const finalRelated = related[0];
    return finalRelated;
  }
};

const FakeFunction = () => {
  console.log("Im Fake! f5as fuckd ffcflfdsffdodddldddddsc3d4dffdf");
};

export const UpperCase = (text) => {
  let split = text.split("");
  split[0] = split[0].toUpperCase();
  return split;
};

export const UpperCaseWhole = (text) => {
  let split = text.split(" ");
  split = split.map((str) => {
    return str.substring(0, 1).toUpperCase() + str.substring(1);
  });
  return split.join(" ");
};

export const ReturnPreview = (text) => {
  const length = text.children.length;

  const middle = Math.floor(length / 2);
  let res = "";
  let state = false;
  let counter = 0;
  if (length <= 4) {
    text.children.map((child) => {
      res += child.children[0].text;
    });

    return res;
  }

  while (res.length <= 50 && counter + middle <= length) {
    if (text.children[middle + counter] !== undefined) {
      res += text.children[middle + counter].children[0].text;
    }
    counter++;
  }

  return res;
};

export const getLocalStorage = () => {
  if (typeof window === "undefined") {
    return [];
  } else if (localStorage.getItem("favorites") === null) {
    return [];
  }
  return JSON.parse(localStorage.getItem("favorites"));
};

export const getUpvotesAndDownvotes = () => {
  if (typeof window === "undefined") {
    return [{}, {}];
  } else if (localStorage.getItem("upvotes") === null) {
    return [{}, {}];
  } else if (localStorage.getItem("downvotes") !== null) {
    return [
      [JSON.parse(localStorage.getItem("upvotes"))],
      [JSON.parse(localStorage.getItem("downvotes"))],
    ];
  }

  return [
    [JSON.parse(localStorage.getItem("upvotes"))],
    [JSON.parse(localStorage.getItem("downvotes"))],
  ];
};

export const checkFavorite = (title) => {
  if (typeof window === "undefined") {
    return false;
  }
  const favorites = JSON.parse(localStorage.getItem("favorites"));
  return favorites.some((favorite) => {
    return favorite.title == title;
  });
};

export const checkLocalStorageValid = () => {
  if (typeof window === "undefined") {
    return false;
  } else if (!Array.isArray(JSON.parse(localStorage.getItem("favorites")))) {
    return false;
  }
  return true;
};

export const fetchDaysDiff = (dateProp) => {
  const userDate = new Date(dateProp);
  const nowDate = new Date();
  const microSecondsDiff = nowDate.getTime() - userDate.getTime();
  const daysDiff = Math.round(microSecondsDiff / (1000 * 60 * 60 * 24));
  // if longer than an hour
  if (Math.round(microSecondsDiff / (1000 * 60)) > 59) {
    //if longer than a day
    if (Math.round(microSecondsDiff / (1000 * 60 * 60)) > 24) {
      return `${Math.round(microSecondsDiff / (1000 * 60 * 60 * 24))}d`;
    } else {
      // less than a day
      return `${Math.round(microSecondsDiff / (1000 * 60 * 60))}h`;
    }
  } else {
    // if less than a minute ago
    if (Math.round(microSecondsDiff / 1000) < 59) {
      return "JUST NOW";
    }
    // less than an hour
    return `${Math.round(microSecondsDiff / (1000 * 60))}m`;
  }
};

export const returnRandom = (arr) => {
  const rand = Math.floor(Math.random() * (arr.length - 1));

  return arr[rand];
};
