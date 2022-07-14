const GetRelatedArticles = (data, preTags) => {
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
  console.log("Im Fake! as fuck fflsddolds3d4dffdf");
};

export default GetRelatedArticles;
