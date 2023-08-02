import styled from "styled-components";
import { removeFromCollection } from "../../utils/supabaseFunction";
import { saveToCollection } from "../../utils/supabaseFunction";
import { useState } from "react";
import CheckLine from "./CheckLine";
import toast from "react-hot-toast";
const Cont = styled.div`
  background: #fff;
  max-height: 400px;
  overflow-y: scroll;
  input[type="checkbox"] {
    width: 20px;
    cursor: pointer;
  }
  p {
    margin-left: 16px;
  }
`;

const ArticleCollection = ({ articles, title, link, user_id }) => {
  const toggleCheckbox = (e, id, title) => {
    const bool = e.target.checked;
    const alertValid = (bool, message) => {
      if (bool) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    };
    // if checked
    if (bool) {
      // save to collection and error test
      let { data, error } = saveToCollection(title, link, id, user_id).then(
        (res) =>
          res
            ? alertValid(res, `Added to ${title}`)
            : alertValid(res, `Error, contact admin on contact page`)
      ); // if not checked
    } else {
      //remove from collection and error test
      let { data, error } = removeFromCollection(id, title, user_id).then(
        (res) =>
          res
            ? alertValid(res, `Removed from ${title}`)
            : alertValid(res, `Error, contact admin on contact page`)
      );
    }
  };
  const articleElems = articles.map((article, index) => {
    const checked = article.savedArticle.some((innerArticle) => {
      return innerArticle.title === title;
    });

    return (
      <CheckLine
        checked={checked}
        toggleCheckbox={toggleCheckbox}
        article_id={article.id}
        title={title}
        articleTitle={article.title}
        key={index}
      />
    );
  });
  return <Cont>{articleElems}</Cont>;
};

export default ArticleCollection;
