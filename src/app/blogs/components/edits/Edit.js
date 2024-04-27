import styled from "styled-components";
import Link from "next/link";
import COLORS from "../../../../../data/colors";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faFloppyDisk,
  faCodeCompare,
} from "@fortawesome/free-solid-svg-icons";
import { fetchDaysDiff } from "../../../../../utils/Functions";

const Cont = styled.div`
  margin-bottom: 32px;
  border-bottom: 1px solid ${(props) => props.colors.grey};
  padding-bottom: 32px;
  .title-spec {
    margin-bottom: 8px;
    padding-left: 16px;
    h5 {
      display: inline-block;
    }
  }
  .text-content {
    border: 1px solid ${(props) => props.colors.grey};
    border-radius: 32px;
    padding: 8px 16px;
    max-height: 400px;
    overflow: auto;
    ::-webkit-scrollbar {
      width: 0.5rem;
    }
  }
  .buttons {
    display: flex;
    justify-content: flex-end;
    @media only screen and (max-width: 520px) {
      flex-direction: column;
      align-items: flex-end;
      .btn-red {
        margin-top: 0px !important;
      }
      .base-btn-flex {
        margin-top: 16px;
      }
    }
  }
  .base-btn-flex {
    margin-left: 16px;
    @media only screen and (max-width: 600px) {
      margin-left: 8px;
    }
  }
`;
const Edit = ({
  username,
  content,
  created_at,
  index,
  id,
  deletePostEditFunctional,
  user_id,
  post_user_id,
  overwriteEdit,
}) => {
  return (
    <Cont colors={COLORS}>
      <div className="title-spec">
        <h5 className=" black mar-right-16">{index + 1}.</h5>
        <h5 className="contrast light mar-right-8">
          {fetchDaysDiff(created_at)}
        </h5>
        <h5 className="green light">u/{username}</h5>
      </div>
      <div className="text-content mar-bottom-16">{content}</div>
      {user_id === post_user_id && (
        <div className="buttons ">
          <div
            onClick={() => deletePostEditFunctional(id)}
            className="base-btn-flex btn-red"
          >
            <h5 className="text-shadow mar-right-8">Delete</h5>
            <FontAwesomeIcon icon={faXmark} className="icon-ssm white" />
          </div>
          <Link
            href={{
              pathname: `/compare/${id}`,
              query: { field: "introduction" },
            }}
          >
            <div className="base-btn-flex btn-blue">
              <h5 className="text-shadow mar-right-8">Compare</h5>
              <FontAwesomeIcon
                icon={faCodeCompare}
                className="icon-ssm white"
              />
            </div>
          </Link>
          <div
            onClick={() => overwriteEdit(content, username, user_id, id)}
            className="base-btn-flex btn-green "
          >
            <h5 className="text-shadow mar-right-8">Overwrite</h5>
            <FontAwesomeIcon icon={faFloppyDisk} className="icon-ssm white" />
          </div>
        </div>
      )}
    </Cont>
  );
};

export default Edit;
