import { useState } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { PencilIcon } from "@heroicons/react/solid";
import COLORS from "../../../../data/colors";
import ViewEdits from "./edits/ViewEdits";
import { overwritePostFieldWithEdit } from "../../../../utils/supabaseFunction";

const Cont = styled.div`
  margin-bottom: 32px;

  h3 {
    margin-right: 16px;
  }
  .flex {
    border-bottom: 1px solid ${(props) => props.colors.darkBlue};

    margin-bottom: 16px;
    padding-bottom: 4px;
    align-items: center;
  }
  .plus-cont-sm {
    margin: 32px 0 0 0;

    padding: 6px;
  }
  .edit-holder {
    display: flex;
    justify-content: flex-start;
  }
  .markdown {
    img {
      width: ${(props) => props.width}%;
    }
    @media only screen and (max-width: 500px) {
      img {
        width: 100%;
      }
    }
  }
`;

const ContentLine = ({
  title,
  content,
  addField,
  icon,
  editField,
  user,
  post_id,
  edits,
  deletePostEditFunctional,
  origPoster,
  width,
}) => {
  const [showEdits, setShowEdits] = useState(false);
  const toggleEdits = () => {
    setShowEdits(!showEdits);
  };
  const overwriteEdit = (content, username, user_id, edit_id) => {
    const finishOverwrite = () => {
      reFetch();
      toast("Post has been overwritten.", {
        duration: 5000,
        position: "top-center",

        // Styling
        style: {},
        className: "",

        // Custom Icon
        icon: "✔️",

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
      });
    };
    overwritePostFieldWithEdit(post_id, editField, content).then(
      (res) =>
        res &&
        createContributor(username, post_id, user_id).then(
          (res) =>
            res &&
            createEditAcceptedNotification(
              user_id,
              user?.id,
              post_id,
              `/encyclopedia/${post.title}`
            ).then(
              (res) =>
                res &&
                deletePostEdit(edit_id).then((res) => res && finishOverwrite())
            )
        )
    );
  };
  return (
    <Cont colors={COLORS} width={width}>
      <div className="flex">
        <h3 className="light ">{title}</h3>
        {icon !== null && (
          <FontAwesomeIcon icon={icon} className="icon-blue icon-med" />
        )}
      </div>
      <ReactMarkdown className="markdown">{content}</ReactMarkdown>
      {user && (
        <div className="edit-holder">
          <div
            className="plus-cont-sm"
            onClick={() => editField(title, content)}
          >
            <PencilIcon className="icon-misc" />
          </div>
        </div>
      )}
      {origPoster && (
        <>
          <div
            onClick={toggleEdits}
            className="mar-bottom-16 reg-cont-flex mar-top-32"
          >
            <div className="flex-center mar-right-16">
              <p className="mar-right-4">
                {showEdits ? "Hide Edits" : "Show Edits"}
              </p>
              <p className="blue">({edits.length}) </p>
            </div>
            <FontAwesomeIcon icon={faEye} className="icon-blue icon-ssm" />
          </div>
          {showEdits && (
            <ViewEdits
              user_id={user?.id}
              post_user_id={post_id}
              edits={edits}
              deletePostEditFunctional={deletePostEditFunctional}
              overwriteEdit={overwriteEdit}
            />
          )}
        </>
      )}
    </Cont>
  );
};

export default ContentLine;
