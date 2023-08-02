import { useState, useEffect } from "react";
import styled from "styled-components";
import toast, { Toaster } from "react-hot-toast";
import { XIcon } from "@heroicons/react/solid";
import Editor from "../../../../components/Editor";
import NoLinkSubmit from "../../../../components/Buttons/NoLinkSubmit";
import { shootFireworks } from "../../../../utils/Functions";
import supabase from "../../../../utils/supabaseClient";
import COLORS from "../../../../data/colors";
import {
  createEditNotification,
  createPostEdit,
  checkPostEditCreated,
  editPostEdit,
} from "../../../../utils/supabaseFunction";

const Cont = styled.div`
  padding: 16px;
  background-color: ${(props) => props.colors.ultraLightBlue};
  position: relative;

  left: 50%;
  transform: translateX(-50%);

  z-index: 2;
  .editor,
  .pane {
    width: 100% !important;
  }
  button {
    padding: 8px;
  }
  form {
    max-width: 100%;
  }
  .title-spec {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap-reverse;
    word-break: break-all;
    @media only screen and (max-width: 270px) {
      justify-content: flex-end;
    }
  }
  .hero-icon-med {
    cursor: pointer;
    flex-shrink: 0;
    &:hover {
      background-color: ${(props) => props.colors.grey};
    }
    &:active {
      background-color: ${(props) => props.colors.offGrey};
    }
  }
`;

const EditPost = ({
  postId,
  postUserId,
  userId,
  field,
  fieldValue,
  editPostField,
  reFetch,
  closeEditor,
}) => {
  const [value, setValue] = useState(fieldValue);
  useEffect(() => {
    document.querySelector("#editor textarea").focus();
  }, []);
  const [lastSaveValue, setLastSaveValue] = useState(value);
  const [editValue, setEditValue] = useState(fieldValue);
  const [disabledState, setDisabledState] = useState(true);
  const editValueFunc = (value) => {
    if (value === lastSaveValue) {
      setDisabledState(true);
    } else {
      if (setDisabledState) {
        setDisabledState(false);
      }
    }
    setValue(value);
  };
  useEffect(() => {
    if (lastSaveValue === value) {
      setDisabledState(true);
    }
  }, [lastSaveValue]);
  const submitForm = async (e) => {
    e.preventDefault();
    setLastSaveValue(value);
    if (postUserId === userId) {
      /*
      const { data, error } = await supabase
        .from("post")
        .update({ title: "helllo" })
        .eq("id", postId); */
      // fetch data based on userid matching post userid
      const { data, error } = await supabase
        .from("post")
        .select()
        .eq("user_id", postUserId)
        .eq("id", postId);
      // user created post
      if (data !== null) {
        //update post field

        const { data, error } = await supabase
          .from("post")
          .update({ [field.toLowerCase()]: value })
          .eq("id", postId);

        toast.success("Your post has been updated!");
        closeEditor();
        reFetch();
      } else {
        toast.success("This has been sent to original poster for approval");
      }
    } else {
      createEditNotification(
        postUserId,
        userId,
        postId,
        window.location.pathname
      );

      checkPostEditCreated(field.toLowerCase(), postId, userId).then((res) =>
        res
          ? editPostEdit(value, field.toLowerCase(), postId, userId, postUserId)
          : createPostEdit(
              value,
              field.toLowerCase(),
              postId,
              userId,
              postUserId
            )
      );

      // post isn't created by this user
      toast(
        "This isn't your post, so it will be sent to original poster for approval",
        {
          duration: 7000,
          position: "top-center",

          // Styling
          style: {},
          className: "",

          // Custom Icon
          icon: "👍",

          // Change colors of success/error/loading icon
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },

          // Aria
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        }
      );
    }
  };
  return (
    <Cont colors={COLORS} className="box-shadow">
      <form onSubmit={submitForm}>
        <div className="title-spec mar-bottom-16">
          <h3>{field}</h3>
          <XIcon className="hero-icon-med" onClick={closeEditor} />
        </div>
        <div id="editor">
          <Editor section={value} updateSection={editValueFunc} />
        </div>
        <div className="mar-bottom-one"></div>
        <NoLinkSubmit disabled={disabledState} text="Submit" />
      </form>
    </Cont>
  );
};

export default EditPost;
