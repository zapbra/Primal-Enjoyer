import styled from "styled-components";
import {
  removeFromPostCollection,
  saveToPostCollection,
} from "../../utils/supabaseFunction";
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

const PostCollection = ({ posts, title, link, user_id }) => {
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
      let { data, error } = saveToPostCollection(title, link, id, user_id).then(
        (res) =>
          res
            ? alertValid(res, `Added to ${title}`)
            : alertValid(res, `Error, contact admin on contact page`)
      ); // if not checked
    } else {
      //remove from collection and error test
      let { data, error } = removeFromPostCollection(id, title, user_id).then(
        (res) =>
          res
            ? alertValid(res, `Removed from ${title}`)
            : alertValid(res, `Error, contact admin on contact page`)
      );
    }
  };
  const postElems = posts.map((post, index) => {
    const checked = post.savedPost.some((innerPost) => {
      return innerPost.title === title;
    });
    return (
      <CheckLine
        checked={checked}
        toggleCheckbox={toggleCheckbox}
        article_id={post.id}
        title={title}
        articleTitle={post.title}
        key={index}
      />
    );
  });
  return <Cont>{postElems}</Cont>;
};

export default PostCollection;
